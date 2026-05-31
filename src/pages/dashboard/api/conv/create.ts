import type { APIRoute } from 'astro';
import { db, Convocatorias } from 'astro:db';

import { getUserFromRequest } from '../../../../utils/session';

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('=== API CREAR CONVOCATORIA - SOCES ID 1 ===');
  
  try {
    // 1. Verificar usuario - con manejo de errores
    let user;
    try {
      user = await getUserFromRequest(request);
      console.log('Usuario obtenido:', user ? { 
        id: user.id, 
        socesId: user.socesId, 
        role: user.role || 'no role' 
      } : 'null');
    } catch (userError) {
      console.log('âŒ Error obteniendo usuario:', userError);
      return redirect('/login');
    }

    if (!user) {
      console.log('âŒ Usuario no encontrado');
      return redirect('/login');
    }

    // 2. Verificar que el usuario pertenezca a socesId = 1
    if (user.socesId !== 1) {
      console.log('âŒ Usuario no pertenece a socesId = 1. SocesId actual:', user.socesId);
      return redirect('/dashboard?error=unauthorized');
    }

    // 3. Verificar permisos para crear convocatorias (solo admin o user)
    const allowedRoles = ['admin', 'user'];
    if (!allowedRoles.includes(user.role)) {
      console.log('âŒ Usuario no autorizado para crear convocatorias. Rol actual:', user.role);
      return redirect('/dashboard/conv?error=unauthorized');
    }

    console.log('âœ… Usuario autorizado para crear convocatorias');

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
      console.log('âŒ TÃ­tulo faltante o vacÃ­o');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (!contenido || contenido.length === 0) {
      console.log('âŒ Contenido faltante o vacÃ­o');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (!fechaStr || fechaStr.length === 0) {
      console.log('âŒ Fecha faltante o vacÃ­a');
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 7. Validar longitud de campos
    if (titulo.length > 200) {
      console.log('âŒ TÃ­tulo demasiado largo');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (contenido.length > 5000) {
      console.log('âŒ Contenido demasiado largo');
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 8. Validar y procesar fecha
    let fecha: Date;
    try {
      fecha = new Date(fechaStr + 'T00:00:00.000Z');
      if (isNaN(fecha.getTime())) {
        throw new Error('Fecha invÃ¡lida');
      }
    } catch (dateError) {
      console.log('âŒ Error al procesar fecha:', dateError);
      return redirect('/dashboard/conv/create?error=validation');
    }

    // 9. Validar URLs si se proporcionan
    const urlRegex = /^https?:\/\/.+/;
    if (link && !urlRegex.test(link)) {
      console.log('âŒ URL principal invÃ¡lida');
      return redirect('/dashboard/conv/create?error=validation');
    }

    if (link2 && !urlRegex.test(link2)) {
      console.log('âŒ URL secundaria invÃ¡lida');
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
      socesId: 1, // SIEMPRE 1 para esta sociedad especÃ­fica
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

    console.log('âœ… Resultado de inserciÃ³n:', result);
    console.log('âœ… Filas afectadas:', result.rowsAffected);
    console.log('âœ… ID insertado:', result.lastInsertRowid);

    console.log('âœ… Noticia creada exitosamente para socesId = 1');
    return redirect('/dashboard/conv?message=created');

  } catch (error) {
    console.error('âŒ ERROR DETALLADO:', error);
    console.error('âŒ Stack trace:', error instanceof Error ? error.stack : 'No stack available');
    
    if (error instanceof Error) {
      console.error('âŒ Error name:', error.name);
      console.error('âŒ Error message:', error.message);
    }

    // Si es un error de base de datos, logear mÃ¡s info
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('âŒ Database error code:', error.code);
      console.error('âŒ Database error detail:', error);
    }

    return redirect('/dashboard/conv/create?error=server');
  }
};
