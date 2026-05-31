import type { APIRoute } from 'astro';
import { db, News } from 'astro:db';

import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('=== API LLAMADA INICIADA ===');
  
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

    // 2. Verificar roles - con manejo de errores
    let hasRole = false;
    try {
      hasRole = requireRole(user, ['user', 'admin']);
      console.log('VerificaciÃ³n de rol - hasRole:', hasRole);
    } catch (roleError) {
      console.log('âŒ Error verificando rol:', roleError);
      // Si hay error en verificaciÃ³n de rol, permitir por ahora para debugging
      hasRole = true;
    }

    if (!hasRole) {
      console.log('âŒ Usuario no autorizado - Rol actual:', user.role);
      return redirect('/login');
    }

    // 3. Obtener datos del formulario
    const formData = await request.formData();
    
    console.log('=== DATOS RECIBIDOS ===');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}"`);
    }

    // 4. Extraer campos
    const titulo = formData.get('titulo')?.toString()?.trim();
    const contenido = formData.get('contenido')?.toString()?.trim();
    const link = formData.get('link')?.toString()?.trim() || '';
    const link2 = formData.get('link2')?.toString()?.trim() || '';
    const fechaStr = formData.get('fecha')?.toString()?.trim();

    console.log('=== CAMPOS PROCESADOS ===');
    console.log(`titulo: "${titulo}"`);
    console.log(`contenido: "${contenido}"`);
    console.log(`fechaStr: "${fechaStr}"`);

    // 5. Validar campos requeridos
    if (!titulo || titulo.length === 0) {
      console.log('âŒ TÃ­tulo faltante o vacÃ­o');
      return redirect('/dashboard/news/create?error=validation');
    }

    if (!contenido || contenido.length === 0) {
      console.log('âŒ Contenido faltante o vacÃ­o');
      return redirect('/dashboard/news/create?error=validation');
    }

    if (!fechaStr || fechaStr.length === 0) {
      console.log('âŒ Fecha faltante o vacÃ­a');
      return redirect('/dashboard/news/create?error=validation');
    }

    // 6. Validar IDs del usuario con valores por defecto si faltan
    let userId = user.id;
    let socesId = user.socesId;

    if (!userId) {
      console.log('âš ï¸ Usuario sin ID, usando ID por defecto');
      userId = 1; // ID por defecto para testing
    }

    if (!socesId) {
      console.log('âš ï¸ Usuario sin socesId, usando socesId por defecto');
      socesId = 1; // socesId por defecto para testing
    }

    // 7. Validar y procesar fecha
    let fecha: Date;
    try {
      fecha = new Date(fechaStr + 'T00:00:00.000Z');
      if (isNaN(fecha.getTime())) {
        throw new Error('Fecha invÃ¡lida');
      }
    } catch (dateError) {
      console.log('âŒ Error al procesar fecha:', dateError);
      return redirect('/dashboard/news/create?error=validation');
    }

    // 8. Datos para insertar - asegurar tipos correctos
    const newsData = {
      userId: typeof userId === 'string' ? parseInt(userId) : userId,
      titulo: titulo,
      contenido: contenido,
      link: link,
      link2: link2,
      fecha: fecha,
      socesId: typeof socesId === 'string' ? parseInt(socesId) : socesId,
    };

    console.log('=== DATOS PARA DB ===');
    console.log('userId:', newsData.userId);
    console.log('socesId:', newsData.socesId);
    console.log('titulo:', newsData.titulo);
    console.log('contenido:', newsData.contenido);
    console.log('link:', newsData.link);
    console.log('link2:', newsData.link2);
    console.log('fecha:', newsData.fecha.toISOString());

    // 9. Insertar
    console.log('=== INSERTANDO EN DB ===');
    const result = await db.insert(News).values(newsData);
    console.log('âœ… Resultado de inserciÃ³n:', result);
    console.log('âœ… Filas afectadas:', result.rowsAffected);
    console.log('âœ… ID insertado:', result.lastInsertRowid);

    console.log('âœ… Noticia creada exitosamente');
    return redirect('/dashboard/news?message=created');

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
    
    return redirect('/dashboard/news/create?error=server');
  }
};

