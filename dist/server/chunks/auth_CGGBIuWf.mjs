import { normalizeDatabaseUrl, createLocalDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
import bcrypt from 'bcryptjs';

const dbUrl = normalizeDatabaseUrl("./local.db", "file:///Users/rodrigoesprella/Documents/FNI/UniversityBlog/.astro/content.db");
const db = createLocalDatabaseClient({ dbUrl, enableTransactions: false });

const Usuarios = asDrizzleTable("Usuarios", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Usuarios","primaryKey":true}},"nombre":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"nombre","collection":"Usuarios","primaryKey":false,"optional":false}},"userName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userName","collection":"Usuarios","primaryKey":false,"optional":false}},"correo":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"correo","collection":"Usuarios","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"Usuarios","primaryKey":false,"optional":false}},"role":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"role","collection":"Usuarios","primaryKey":false,"optional":false}}},"deprecated":false,"indexes":{}}, false);
const News = asDrizzleTable("News", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"News","primaryKey":true}},"userId":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"News","primaryKey":false,"optional":false,"references":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Usuarios","primaryKey":true}}}},"titulo":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"titulo","collection":"News","primaryKey":false,"optional":false}},"contenido":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"contenido","collection":"News","primaryKey":false,"optional":false}},"link":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"link","collection":"News","primaryKey":false,"optional":false}},"fecha":{"type":"date","schema":{"optional":false,"unique":false,"deprecated":false,"name":"fecha","collection":"News"}}},"deprecated":false,"indexes":{}}, false);

class AuthService {
  /**
   * Valida credenciales de login.
   * Retorna el usuario si el password es correcto.
   */
  static async validateUser(credentials) {
    try {
      const users = await db.select().from(Usuarios).where(eq(Usuarios.userName, credentials.userName));
      if (users.length === 0) {
        return null;
      }
      const user = users[0];
      const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      if (!isValidPassword) {
        return null;
      }
      return {
        id: user.id,
        nombre: user.nombre,
        userName: user.userName,
        correo: user.correo,
        role: user.role
      };
    } catch (error) {
      console.error("Error validating user:", error);
      return null;
    }
  }
  /**
   * Hashea una contraseña usando bcrypt.
   */
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
function requireRole(user, allowedRoles) {
  return user !== null && allowedRoles.includes(user.role);
}

export { AuthService as A, News as N, Usuarios as U, db as d, requireRole as r };
