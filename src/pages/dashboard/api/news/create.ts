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

    // 2. Verificar roles - con manejo de errores
    let hasRole = false;
    try {
      hasRole = requireRole(user, ['user', 'admin']);
      console.log('Verificación de rol - hasRole:', hasRole);
    } catch (roleError) {
      console.log('❌ Error verificando rol:', roleError);
      // Si hay error en verificación de rol, permitir por ahora para debugging
      hasRole = true;
    }

    if (!hasRole) {
      console.log('❌ Usuario no autorizado - Rol actual:', user.role);
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
      console.log('❌ Título faltante o vacío');
      return redirect('/dashboard/news/create?error=validation');
    }

    if (!contenido || contenido.length === 0) {
      console.log('❌ Contenido faltante o vacío');
      return redirect('/dashboard/news/create?error=validation');
    }

    if (!fechaStr || fechaStr.length === 0) {
      console.log('❌ Fecha faltante o vacía');
      return redirect('/dashboard/news/create?error=validation');
    }

    // 6. Validar IDs del usuario con valores por defecto si faltan
    let userId = user.id;
    let socesId = user.socesId;

    if (!userId) {
      console.log('⚠️ Usuario sin ID, usando ID por defecto');
      userId = 1; // ID por defecto para testing
    }

    if (!socesId) {
      console.log('⚠️ Usuario sin socesId, usando socesId por defecto');
      socesId = 1; // socesId por defecto para testing
    }

    // 7. Validar y procesar fecha
    let fecha: Date;
    try {
      fecha = new Date(fechaStr + 'T00:00:00.000Z');
      if (isNaN(fecha.getTime())) {
        throw new Error('Fecha inválida');
      }
    } catch (dateError) {
      console.log('❌ Error al procesar fecha:', dateError);
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
    console.log('✅ Resultado de inserción:', result);
    console.log('✅ Filas afectadas:', result.rowsAffected);
    console.log('✅ ID insertado:', result.lastInsertRowid);

    console.log('✅ Noticia creada exitosamente');
    return redirect('/dashboard/news?message=created');

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
    
    return redirect('/dashboard/news/create?error=server');
  }
};
