import { defineDb, defineTable, column } from 'astro:db';

const Usuarios = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    userName: column.text(),
    correo: column.text(),
    password: column.text(),
    role: column.text(),
  },
});

const News = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({ references: () => Usuarios.columns.id }),
    titulo: column.text(),
    contenido: column.text(),
    link: column.text(),
    fecha: column.date(),
  },
});

export default defineDb({
  tables: { Usuarios, News },
});
