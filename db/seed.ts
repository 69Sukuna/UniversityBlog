import { db, Usuarios, News, Soces, Convocatorias } from 'astro:db';
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
    password: 'Osce1234567',
    role: 'user',
    socesId: 1,
  },
  {
    nombre: 'Sociedad Científica de Minas',
    correo: 'minas@a.com',
    userName: 'SocMinas',
    password: 'SocMinas2025',
    role: 'user',
    socesId: 2,
  },
  {
    nombre: 'Sociedad Científica de Civil',
    correo: 'civil@a.com',
    userName: 'SocCivil',
    password: 'Civil2025',
    role: 'user',
    socesId: 3,
  },
  {
    nombre: 'Sociedad Científica MetMat',
    correo: 'metalurgia@a.com',
    userName: 'SocMetMat',
    password: 'MetMat2025',
    role: 'user',
    socesId: 4,
  },
  {
    nombre: 'Sociedad Científica de SCEIMEM',
    correo: 'sceimem@a.com',
    userName: 'SCEIMEM',
    password: 'SCEIMEM2025',
    role: 'user',
    socesId: 5,
  },
  {
    nombre: 'Sociedad Científica COM',
    correo: 'com@a.com',
    userName: 'SocCOM',
    password: 'COM2025',
    role: 'user',
    socesId: 6,
  },
  {
    nombre: 'Sociedad Científica SIDDFAC',
    correo: 'sidfac@a.com',
    userName: 'SIDDFAC',
    password: 'SIDDFAC2025',
    role: 'user',
    socesId: 7,
  },
  {
    nombre: 'Sociedad Científica de Electrica',
    correo: 'electrica@a.com',
    userName: 'SocElectrica',
    password: 'Electrica2025',
    role: 'user',
    socesId: 8,
  },
  {
    nombre: 'Sociedad Científica de Química',
    correo: 'quimica@a.com',
    userName: 'SocQuimica',
    password: 'Quimica2025',
    role: 'user',
    socesId: 9,
  },
  {
    nombre: 'Sociedad Científica de Geología',
    correo: 'geologica@a.com',
    userName: 'SocGeo',
    password: 'Geo2025',
    role: 'user',
    socesId: 10,
  },
  {
    nombre: 'Sociedad Científica de Sistemas-Informática',
    correo: 'sistemas@a.com',
    userName: 'SocSisInf',
    password: 'SisInf2025',
    role: 'user',
    socesId: 11,
  },
  {
    nombre: 'Sociedad Científica de Industrial',
    correo: 'industrial@a.com',
    userName: 'SocInd',
    password: 'Indus2025',
    role: 'user',
    socesId: 12,
  },
  {
    nombre: 'Sociedad Científica de Física',
    correo: 'fisica@a.com',
    userName: 'SocFisica',
    password: 'Fisica2025',
    role: 'user',
    socesId: 13,
  },

    
  ]);
  
}

