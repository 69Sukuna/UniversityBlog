import { db, Usuarios, News, Soces, Convocatorias, Miembros } from 'astro:db';
import { AuthService } from '../src/utils/auth';

export default async function () {
  const hashedAdmin = await AuthService.hashPassword('OSCE2025osce');
  const hashedUser = await AuthService.hashPassword('SOCES2025soces');

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
    { nombre: 'So.C.E. del Departamento de Matemática' }, // id: 15

  ]);

  // SEGUNDO: Insertar los usuarios (ahora que las sociedades existen)
  await db.insert(Usuarios).values([
    {
      nombre: 'Osce Admin',
      correo: 'OsceAdmin@a.com',
      userName: 'AdminOsce',
      password: hashedAdmin,
      role: 'admin',
      socesId: 1, // OSCE existe
    },
    {
      nombre: 'Soces User',
      correo: 'SocesUser@a.com', // Email diferente para evitar duplicados
      userName: 'UserSoces',
      password: hashedUser,
      role: 'user',
      socesId: 1, // So.C.E. Ing. Minas existe
    },    
    {
    nombre: 'OSCE',
    correo: 'osce@a.com',
    userName: 'OSCE',
    password: await AuthService.hashPassword('Osce1234567'),
    role: 'user',
    socesId: 1,
  },
  {
    nombre: 'Sociedad Científica de Minas',
    correo: 'minas@a.com',
    userName: 'SocMinas',
    password: await AuthService.hashPassword('SocMinas2025'),
    role: 'user',
    socesId: 2,
  },
  {
    nombre: 'Sociedad Científica de Civil',
    correo: 'civil@a.com',
    userName: 'SocCivil',
    password: await AuthService.hashPassword('Civil2025'),
    role: 'user',
    socesId: 3,
  },
  {
    nombre: 'Sociedad Científica MetMat',
    correo: 'metalurgia@a.com',
    userName: 'SocMetMat',
    password: await AuthService.hashPassword('MetMat2025'),
    role: 'user',
    socesId: 4,
  },
  {
    nombre: 'Sociedad Científica de SCEIMEM',
    correo: 'sceimem@a.com',
    userName: 'SCEIMEM',
    password: await AuthService.hashPassword('SCEIMEM2025'),
    role: 'user',
    socesId: 5,
  },
  {
    nombre: 'Sociedad Científica COM',
    correo: 'com@a.com',
    userName: 'SocCOM',
    password: await AuthService.hashPassword('COM2025'),
    role: 'user',
    socesId: 6,
  },
  {
    nombre: 'Sociedad Científica SIDDFAC',
    correo: 'sidfac@a.com',
    userName: 'SIDDFAC',
    password: await AuthService.hashPassword('SIDDFAC2025'),
    role: 'user',
    socesId: 7,
  },
  {
    nombre: 'Sociedad Científica de Electrica',
    correo: 'electrica@a.com',
    userName: 'SocElectrica',
    password: await AuthService.hashPassword('Electrica2025'),
    role: 'user',
    socesId: 8,
  },
  {
    nombre: 'Sociedad Científica de Química',
    correo: 'quimica@a.com',
    userName: 'SocQuimica',
    password:  await AuthService.hashPassword('Quimica2025'),
    role: 'user',
    socesId: 9,
  },
  {
    nombre: 'Sociedad Científica de Geología',
    correo: 'geologica@a.com',
    userName: 'SocGeo',
    password:  await AuthService.hashPassword('Geo2025'),
    role: 'user',
    socesId: 10,
  },
  {
    nombre: 'Sociedad Científica de Sistemas-Informática',
    correo: 'sistemas@a.com',
    userName: 'SocSisInf',
    password:  await AuthService.hashPassword('SisInf2025'),
    role: 'user',
    socesId: 11,
  },
  {
    nombre: 'Sociedad Científica de Industrial',
    correo: 'industrial@a.com',
    userName: 'SocInd',
    password:  await AuthService.hashPassword('Indus2025'),
    role: 'user',
    socesId: 12,
  },
  {
    nombre: 'Sociedad Científica de Física',
    correo: 'fisica@a.com',
    userName: 'SocFisica',
    password:  await AuthService.hashPassword('Fisica2025'),
    role: 'user',
    socesId: 13,
  },
    
  ]);
  
await db.insert(News).values([
  {

    userId: 4, // SocMinas
    titulo: 'I Congreso de Ingeniería de Minas 2025',
    contenido: 'La Sociedad Científica de Ingeniería de Minas se complace en anunciar la realización del Primer Congreso de Ingeniería de Minas, donde se presentarán investigaciones y avances tecnológicos del sector minero boliviano.',
    link: 'https://ejemplo.com/congreso-minas',
    link2: '',
    fecha: new Date('2025-03-15'),
    socesId: 2,
  },
  {
   
    userId: 4,
    titulo: 'Visita Técnica a la Mina Huanuni',
    contenido: 'Se realizó con éxito la visita técnica a la Mina Huanuni con la participación de 30 estudiantes de Ingeniería de Minas. Los estudiantes pudieron observar de cerca los procesos de extracción y procesamiento mineral.',
    link: 'https://ejemplo.com/visita-huanuni',
    link2: '',
    fecha: new Date('2025-04-10'),
    socesId: 2,
  },
  {
  
    userId: 5, // SocCivil
    titulo: 'Seminario de Construcción Sostenible',
    contenido: 'La Sociedad Científica de Ingeniería Civil organiza el seminario sobre construcción sostenible y uso eficiente de materiales en proyectos de infraestructura urbana.',
    link: 'https://ejemplo.com/seminario-civil',
    link2: 'https://ejemplo.com/inscripciones',
    fecha: new Date('2025-04-20'),
    socesId: 3,
  },
  {
 
    userId: 12, // SocSisInf
    titulo: 'Hackathon de Innovación Tecnológica UTO 2025',
    contenido: 'La Sociedad Científica de Sistemas e Informática convoca a todos los estudiantes de la FNI a participar en el Hackathon de Innovación Tecnológica, con premios para los tres primeros lugares.',
    link: 'https://ejemplo.com/hackathon-uto',
    link2: '',
    fecha: new Date('2025-05-05'),
    socesId: 11,
  },
  {

    userId: 12,
    titulo: 'Taller de Inteligencia Artificial Aplicada',
    contenido: 'Se llevará a cabo un taller práctico de Inteligencia Artificial aplicada al análisis de datos, dirigido a estudiantes de Ingeniería de Sistemas e Informática de la Universidad Técnica de Oruro.',
    link: 'https://ejemplo.com/taller-ia',
    link2: 'https://ejemplo.com/material-taller',
    fecha: new Date('2025-05-18'),
    socesId: 11,
  },
]);

await db.insert(Miembros).values([
  {
    socesId: 11,
    nombre: 'Juan Carlos Fernández Rojas',
    cargo: 'Presidente',
  },
  {
    socesId: 11,
    nombre: 'María Alejandra Choque Vargas',
    cargo: 'Vicepresidente',
  },
  {
    socesId: 11,
    nombre: 'Luis Fernando Quispe Mamani',
    cargo: 'Secretario General',
  },
  {
    socesId: 11,
    nombre: 'Ana Sofía Condori Flores',
    cargo: 'Secretaria de Actas',
  },
  {
    socesId: 11,
    nombre: 'Carlos Eduardo Apaza Cruz',
    cargo: 'Tesorero',
  },

]);
  // So.C.E. Ing. Minas - socesId: 2
await db.insert(Miembros).values({ socesId: 2, nombre: 'Minas Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 2, nombre: 'Minas Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 2, nombre: 'Minas Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Civil - socesId: 3
await db.insert(Miembros).values({ socesId: 3, nombre: 'Civil Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 3, nombre: 'Civil Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 3, nombre: 'Civil Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Metalurgia - socesId: 4
await db.insert(Miembros).values({ socesId: 4, nombre: 'MetMat Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 4, nombre: 'MetMat Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 4, nombre: 'MetMat Secretario', cargo: 'Secretario General' });

// So.C.E. SCEIMEM - socesId: 5
await db.insert(Miembros).values({ socesId: 5, nombre: 'SCEIMEM Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 5, nombre: 'SCEIMEM Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 5, nombre: 'SCEIMEM Secretario', cargo: 'Secretario General' });

// Sub-sociedad COM - socesId: 6
await db.insert(Miembros).values({ socesId: 6, nombre: 'COM Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 6, nombre: 'COM Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 6, nombre: 'COM Secretario', cargo: 'Secretario General' });

// Sub-sociedad SIDDFAC - socesId: 7
await db.insert(Miembros).values({ socesId: 7, nombre: 'SIDDFAC Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 7, nombre: 'SIDDFAC Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 7, nombre: 'SIDDFAC Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Eléctrica - socesId: 8
await db.insert(Miembros).values({ socesId: 8, nombre: 'Electrica Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 8, nombre: 'Electrica Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 8, nombre: 'Electrica Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Química - socesId: 9
await db.insert(Miembros).values({ socesId: 9, nombre: 'Quimica Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 9, nombre: 'Quimica Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 9, nombre: 'Quimica Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Geológica - socesId: 10
await db.insert(Miembros).values({ socesId: 10, nombre: 'Geo Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 10, nombre: 'Geo Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 10, nombre: 'Geo Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Sistemas - socesId: 11
await db.insert(Miembros).values({ socesId: 11, nombre: 'Sistemas Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 11, nombre: 'Sistemas Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 11, nombre: 'Sistemas Secretario', cargo: 'Secretario General' });

// So.C.E. Ing. Industrial - socesId: 12
await db.insert(Miembros).values({ socesId: 12, nombre: 'Industrial Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 12, nombre: 'Industrial Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 12, nombre: 'Industrial Secretario', cargo: 'Secretario General' });

// So.C.E. Física - socesId: 13
await db.insert(Miembros).values({ socesId: 13, nombre: 'Fisica Presidente', cargo: 'Presidente' });
await db.insert(Miembros).values({ socesId: 13, nombre: 'Fisica Vicepresidente', cargo: 'Vicepresidente' });
await db.insert(Miembros).values({ socesId: 13, nombre: 'Fisica Secretario', cargo: 'Secretario General' });
}

