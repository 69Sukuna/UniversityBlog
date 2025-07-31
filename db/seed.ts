import { db, Usuarios, News } from 'astro:db';
import { AuthService } from '../src/utils/auth'; // Asegurate de importar bien

export default async function () {
  const hashedAdmin = await AuthService.hashPassword('1234');
  const hashedUser = await AuthService.hashPassword('1234');

  await db.insert(Usuarios).values({
    nombre: 'Jose',
    correo: 'a@a.com',
    userName: 'Admin',
    password: hashedAdmin,
    role: 'admin',
  });

  await db.insert(Usuarios).values({
    nombre: 'Maria',
    correo: 'a@a.com',
    userName: 'User',
    password: hashedUser,
    role: 'user',
  });

  await db.insert(Usuarios).values({
    nombre: 'Prueba',
    correo: 'prueba@a.com',
    userName: 'SisInf',
    password: hashedUser,
    role: 'user',
  });

  await db.insert(News).values([
    {
      userId: 2,
      titulo: 'Noticia 1',
      contenido: 'Contenido de la noticia 1',
      link: '',
      fecha: new Date('2023-01-01'),
    },
    {
      userId: 2,
      titulo: 'Noticia 2',
      contenido: 'Contenido de la noticia 2',
      link: 'https://ejemplo.com',
      fecha: new Date('2023-02-01'),
    },
  ]);
}
