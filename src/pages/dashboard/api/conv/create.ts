import type { APIRoute } from 'astro';
import { db, Convocatorias } from 'astro:db';

import { getUserFromRequest } from '../../../../utils/session';

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('=== API CREAR CONVOCATORIA - SOCES ID 1 ===');
  
  try {
    // 1. Verificar usuario - con manejo de errores
    let user;
    try {
      user = getUserFromRequest(request);
      console.log('Usuario obtenido:', user ? { 
        id: user.id, 
        socesId: user.socesId, 
        role: user.role || 'no role' 
      } : 'null');
    } catch (userError) {
      console.log('❌ Error obteniendo usuario:', userError);
      return redirect('/login');
    }

    if (!user) {
      console.log('❌ Usuario no encontrado');
      return redirect('/login');
    }

    // 2. Verificar que el usuario pertenezca a socesId = 1
    if (user.socesId !== 1) {
      console.log('❌ Usuario no pertenece a socesId = 1. SocesId actual:', user.socesId);
      return redirect('/dashboard?error=unauthorized');
    }

    // 3. Verificar permisos para crear convocatorias (solo admin o user)
    const allowedRoles = ['admin', 'user'];
    if (!allowedRoles.includes(user.role)) {
      console.log('❌ Usuario no autorizado para crear convocatorias. Rol actual:', user.role);
      return redirect('/dashboard/conv?error=unauthorized');
    }

    console.log('✅ Usuario autorizado para crear convocatorias');

    // 4. Obtener datos del formulario
    const formData = await request.formData();
    
    console.log('=== DATOS RECIBIDOS ===');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}"`);
    }

    // 5. Extraer campos
    const titulo = formData.get('titulo')?.toString()?.trim();
    const contenido = formData.get('contenido')?.toString()?.trim();
    const link = formData.get('link')?.toString()?.trim() || '';
    const link2 = formData.get('link2')?.toString()?.trim() || '';
    const fechaStr = formData.get('fecha')?.toString()?.trim();

    console.log('=== CAMPOS PROCESADOS ===');
    console.log(`titulo: "${titulo}"`);
    console.log(`contenido: "${contenido}"`);
    console.log(`fechaStr: "${fechaStr}"`);

    // 6. Validar campos requeridos
    if (!titulo || titulo.length === 0) {
      console.log('❌ Título faltante o vacío');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (!contenido || contenido.length === 0) {
      console.log('❌ Contenido faltante o vacío');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (!fechaStr || fechaStr.length === 0) {
      console.log('❌ Fecha faltante o vacía');
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 7. Validar longitud de campos
    if (titulo.length > 200) {
      console.log('❌ Título demasiado largo');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (contenido.length > 5000) {
      console.log('❌ Contenido demasiado largo');
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 8. Validar y procesar fecha
    let fecha: Date;
    try {
      fecha = new Date(fechaStr + 'T00:00:00.000Z');
      if (isNaN(fecha.getTime())) {
        throw new Error('Fecha inválida');
      }
    } catch (dateError) {
      console.log('❌ Error al procesar fecha:', dateError);
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 9. Validar URLs si se proporcionan
    const urlRegex = /^https?:\/\/.+/;
    if (link && !urlRegex.test(link)) {
      console.log('❌ URL principal inválida');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (link2 && !urlRegex.test(link2)) {
      console.log('❌ URL secundaria inválida');
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 10. Datos para insertar - FORZAR socesId = 1
    const convData = {
      userId: user.id,
      titulo: titulo,
      contenido: contenido,
      link: link,
      link2: link2,
      fecha: fecha,
      socesId: 1, // SIEMPRE 1 para esta sociedad específica
    };

    console.log('=== DATOS PARA DB ===');
    console.log('userId:', convData.userId);
    console.log('socesId:', convData.socesId);
    console.log('titulo:', convData.titulo);
    console.log('contenido:', convData.contenido);
    console.log('link:', convData.link);
    console.log('link2:', convData.link2);
    console.log('fecha:', convData.fecha.toISOString());

    // 11. Insertar en base de datos
    console.log('=== INSERTANDO EN DB ===');
    const result = await db.insert(Convocatorias).values(convData);

    console.log('✅ Resultado de inserción:', result);
    console.log('✅ Filas afectadas:', result.rowsAffected);
    console.log('✅ ID insertado:', result.lastInsertRowid);

    console.log('✅ Noticia creada exitosamente para socesId = 1');
    return redirect('/dashboard/conv?message=created');

  } catch (error) {
    console.error('❌ ERROR DETALLADO:', error);
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack available');
    
    if (error instanceof Error) {
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
    }

    // Si es un error de base de datos, logear más info
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('❌ Database error code:', error.code);
      console.error('❌ Database error detail:', error);
    }

    return redirect('/dashboard/conv/create?error=server');
  }
};