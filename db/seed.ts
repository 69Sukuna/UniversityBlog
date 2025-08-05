import { db, Usuarios, News, Soces } from 'astro:db';
import { AuthService } from '../src/utils/auth';

export default async function () {
  const hashedAdmin = await AuthService.hashPassword('1234');
  const hashedUser = await AuthService.hashPassword('1234');

  // PRIMERO: Insertar las sociedades (Soces)
  await db.insert(Soces).values([
    { nombre: 'OSCE' }, // id: 1
    { nombre: 'So.C.E. Ing. Minas' }, // id: 2
    { nombre: 'So.C.E. Ing. Civil' }, // id: 3
    { nombre: 'So.C.E. Ing. Metalurgia y Materiales' }, // id: 4
    { nombre: 'So.C.E. SCEIMEM' }, // id: 5
    { nombre: 'Sub-sociedad COM' }, // id: 6
    { nombre: 'Sub-sociedad SIDDFAC' }, // id: 7
    { nombre: 'So.C.E. Ing. Eléctrica - Ing. Electrónica' }, // id: 8
    { nombre: 'So.C.E. Ing. Química e Ing. de Alimentos' }, // id: 9
    { nombre: 'So.C.E. Ing. Geológica' }, // id: 10
    { nombre: 'So.C.E. Ing. de Sistemas e Ing. Informática' }, // id: 11
    { nombre: 'So.C.E. Ing. Industrial' }, // id: 12
    { nombre: 'So.C.E. del Departamento de Física de Ciclo Básico' }, // id: 13
    { nombre: 'So.C.E. del Departamento de Química' }, // id: 14
  ]);

  // SEGUNDO: Insertar los usuarios (ahora que las sociedades existen)
  await db.insert(Usuarios).values([
    {
      nombre: 'Jose',
      correo: 'a@a.com',
      userName: 'Admin',
      password: hashedAdmin,
      role: 'admin',
      socesId: 1, // OSCE existe
    },
    {
      nombre: 'Maria',
      correo: 'maria@a.com', // Email diferente para evitar duplicados
      userName: 'User',
      password: hashedUser,
      role: 'user',
      socesId: 2, // So.C.E. Ing. Minas existe
    },
    {
      nombre: 'Prueba',
      correo: 'prueba@a.com',
      userName: 'SisInf',
      password: hashedUser,
      role: 'user',
      socesId: 11, // So.C.E. Ing. de Sistemas e Ing. Informática existe (era 10 antes, pero no existía)
    },
  ]);

  // TERCERO: Insertar las noticias (ahora que usuarios y sociedades existen)
  await db.insert(News).values([
    {
      userId: 2, // Maria (segunda usuaria insertada)
      titulo: 'Noticia 1',
      contenido: 'Contenido de la noticia 1',
      link: '',
      linkFacebook: 'https://facebook.com/',
      fecha: new Date('2023-01-01'),
      socesId: 1, // OSCE
    },
    {
      userId: 2, // Maria
      titulo: 'Noticia 2',
      contenido: 'Contenido de la noticia 2',
      link: 'https://ejemplo.com',
      linkFacebook: 'https://facebook.com/',
      fecha: new Date('2023-02-01'),
      socesId: 2, // So.C.E. Ing. Minas
    },
  ]);
}
