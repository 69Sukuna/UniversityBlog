import { db, Usuarios, News, Soces, Convocatorias } from 'astro:db';
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
      nombre: 'Jose Daniel',
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
    {
    nombre: 'OSCE',
    correo: 'osce@a.com',
    userName: 'OSCE',
    password: hashedUser,
    role: 'user',
    socesId: 1,
  },
  {
    nombre: 'Minas',
    correo: 'minas@a.com',
    userName: 'SisInf',
    password: hashedUser,
    role: 'user',
    socesId: 2,
  },
  {
    nombre: 'Civil',
    correo: 'civil@a.com',
    userName: 'Civil',
    password: hashedUser,
    role: 'user',
    socesId: 3,
  },
  {
    nombre: 'MetMat',
    correo: 'metalurgia@a.com',
    userName: 'Metal',
    password: hashedUser,
    role: 'user',
    socesId: 4,
  },
  {
    nombre: 'SCEIMEM',
    correo: 'sceimem@a.com',
    userName: 'SCEIMEM',
    password: hashedUser,
    role: 'user',
    socesId: 5,
  },
  {
    nombre: 'COM',
    correo: 'com@a.com',
    userName: 'COM',
    password: hashedUser,
    role: 'user',
    socesId: 6,
  },
  {
    nombre: 'SIDDFAC',
    correo: 'sidfac@a.com',
    userName: 'SIDDFAC',
    password: hashedUser,
    role: 'user',
    socesId: 7,
  },
  {
    nombre: 'Elec',
    correo: 'electrica@a.com',
    userName: 'Elec',
    password: hashedUser,
    role: 'user',
    socesId: 8,
  },
  {
    nombre: 'Quim',
    correo: 'quimica@a.com',
    userName: 'QuimAlim',
    password: hashedUser,
    role: 'user',
    socesId: 9,
  },
  {
    nombre: 'Geo',
    correo: 'geologica@a.com',
    userName: 'Geo',
    password: hashedUser,
    role: 'user',
    socesId: 10,
  },
  {
    nombre: 'SISinf',
    correo: 'sistemas@a.com',
    userName: 'SisInf',
    password: hashedUser,
    role: 'user',
    socesId: 11,
  },
  {
    nombre: 'Ind',
    correo: 'industrial@a.com',
    userName: 'Indus',
    password: hashedUser,
    role: 'user',
    socesId: 12,
  },
  {
    nombre: 'Fis',
    correo: 'fisica@a.com',
    userName: 'Fisica',
    password: hashedUser,
    role: 'user',
    socesId: 13,
  },

    
  ]);

  // TERCERO: Insertar las noticias (ahora que usuarios y sociedades existen)
  await db.insert(News).values([
    {
      userId: 1, // Maria (segunda usuaria insertada)
      titulo: 'Noticia 1',
      contenido: 'Contenido de la noticia 1',
      link: 'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/528710180_1209413087889443_2546872747654220583_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3_-ZktQA0v4Q7kNvwGNeD3G&_nc_oc=AdkUhS3WRWDuCP80qt8Ept7mijpv5EjVL57AXQ9zCYzvoxr9UwvWneXRVo2dFM4bZTY&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=mpzmVyvuIE_YmecntVUlJA&oh=00_AfUF5oPZpC4ElXGLJoF5dzqP_4CFsOlcCtIaRBijtcstkw&oe=689B2293',
      link2: 'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/528710180_1209413087889443_2546872747654220583_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3_-ZktQA0v4Q7kNvwGNeD3G&_nc_oc=AdkUhS3WRWDuCP80qt8Ept7mijpv5EjVL57AXQ9zCYzvoxr9UwvWneXRVo2dFM4bZTY&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=mpzmVyvuIE_YmecntVUlJA&oh=00_AfUF5oPZpC4ElXGLJoF5dzqP_4CFsOlcCtIaRBijtcstkw&oe=689B2293',
      fecha: new Date('2023-01-01'),
      socesId: 1, 
    },
    {
      userId: 1, // Maria
      titulo: 'Noticia 2',
      contenido: 'Contenido de la noticia 2',
      link: 'https://www.youtube.com/watch?v=hmlEPAKo0sY',
      link2: 'https://www.youtube.com/watch?v=hmlEPAKo0sY',
      fecha: new Date('2023-02-01'),
      socesId: 1, 
    },
    {
      userId: 1, // Maria
      titulo: 'Noticia 2',
      contenido: 'Contenido de la noticia 2',
      link: 'https://drive.google.com/file/d/1Ge_7lHnqxX6n9hRHFoYz40LveDCUfRxt/view?usp=drive_link',
      link2: 'https://drive.google.com/file/d/1Ge_7lHnqxX6n9hRHFoYz40LveDCUfRxt/view?usp=drive_link',
      fecha: new Date('2023-02-01'),
      socesId: 1, 
    },
    {
      userId: 3, // Prueba
      titulo: 'minas',
      contenido: 'Contenido de la noticia 3',
      link: 'https://ejemplo.com',
      link2: 'https://facebook.com/',
      fecha: new Date('2023-02-01'),
      socesId: 2, 
    },
    
  ]);

    await db.insert(Convocatorias).values([
    {
      userId: 1, // Maria (segunda usuaria insertada)
      titulo: 'CONVOCATORIA 1',
      contenido: 'Contenido de la convocatoria 1',
      link: 'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/528710180_1209413087889443_2546872747654220583_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3_-ZktQA0v4Q7kNvwGNeD3G&_nc_oc=AdkUhS3WRWDuCP80qt8Ept7mijpv5EjVL57AXQ9zCYzvoxr9UwvWneXRVo2dFM4bZTY&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=mpzmVyvuIE_YmecntVUlJA&oh=00_AfUF5oPZpC4ElXGLJoF5dzqP_4CFsOlcCtIaRBijtcstkw&oe=689B2293',
      link2: 'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/528710180_1209413087889443_2546872747654220583_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3_-ZktQA0v4Q7kNvwGNeD3G&_nc_oc=AdkUhS3WRWDuCP80qt8Ept7mijpv5EjVL57AXQ9zCYzvoxr9UwvWneXRVo2dFM4bZTY&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=mpzmVyvuIE_YmecntVUlJA&oh=00_AfUF5oPZpC4ElXGLJoF5dzqP_4CFsOlcCtIaRBijtcstkw&oe=689B2293',
      fecha: new Date('2023-01-01'),
      socesId: 1, 
    },
  ]);
}
