import { defineDb, defineTable, column } from 'astro:db';

const Soces = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
  },
});

const Usuarios = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    userName: column.text(),
    correo: column.text(),
    password: column.text(),
    role: column.text(),
    socesId: column.number({ references: () => Soces.columns.id }),
  },
});



const News = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({ references: () => Usuarios.columns.id }),
    titulo: column.text(),
    contenido: column.text(),
    link: column.text(),
    link2: column.text(),
    fecha: column.date(),
    socesId: column.number({ references: () => Soces.columns.id }),
  },
});

const Convocatorias = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({ references: () => Usuarios.columns.id }),
    titulo: column.text(),
    contenido: column.text(),
    link: column.text(),
    link2: column.text(),
    fecha: column.date(),
    socesId: column.number({ references: () => Soces.columns.id }),
  },
});

const Miembros = defineTable({
  columns: {
    id: column.number({ primaryKey: true }), 
    socesId: column.number({ references: () => Soces.columns.id }),
    nombre: column.text(),
    cargo: column.text(),
    celular: column.text({ optional: true }),
    correo: column.text({ optional: true }),
    orden: column.number({ optional: true }),
  },
});

export default defineDb({
  tables: { Usuarios, News, Soces, Convocatorias, Miembros },
});
