import { db, Usuarios, eq } from 'astro:db';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  nombre: string;
  userName: string;
  correo: string;
  role: string;
  socesId: number; // Añadido para incluir socesId
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export class AuthService {
  /**
   * Valida credenciales de login.
   * Retorna el usuario si el password es correcto.
   */
  static async validateUser(credentials: LoginCredentials): Promise<User | null> {
    try {
      const users = await db
        .select()
        .from(Usuarios)
        .where(eq(Usuarios.userName, credentials.userName));

      if (users.length === 0) {
        return null;
      }

      const user = users[0];

      const isValidPassword = await bcrypt.compare(credentials.password, user.password);

      if (!isValidPassword) {
        return null;
      }

      // Retornamos solo los datos necesarios (sin la contraseña)
      return {
        id: user.id,
        nombre: user.nombre,
        userName: user.userName,
        correo: user.correo,
        role: user.role,
        socesId: user.socesId, // Aseguramos que socesId también se retorne
      };
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  /**
   * Hashea una contraseña usando bcrypt.
   */
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}

/**
 * Middleware básico para proteger rutas.
 * Si no hay sesión, redirige a /login.
 */
export function requireAuth(request: Request): {
  user: User | null;
  redirectResponse: Response | null;
} {
  const sessionCookie = request.headers.get('cookie');

  if (!sessionCookie || !sessionCookie.includes('session=')) {
    return {
      user: null,
      redirectResponse: new Response(null, {
        status: 302,
        headers: {
          Location: '/login',
        },
      }),
    };
  }

  try {
    const sessionData = sessionCookie.split('session=')[1].split(';')[0];
    const user = JSON.parse(decodeURIComponent(sessionData)) as User;

    return { user, redirectResponse: null };
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return {
      user: null,
      redirectResponse: new Response(null, {
        status: 302,
        headers: {
          Location: '/login',
        },
      }),
    };
  }
}

/**
 * Valida que el usuario tenga alguno de los roles permitidos.
 */
export function requireRole(user: User | null, allowedRoles: string[]): boolean {
  return user !== null && allowedRoles.includes(user.role);
}
