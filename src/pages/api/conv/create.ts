import type { APIRoute } from 'astro';
import { db, Convocatorias } from 'astro:db';

import { getUserFromRequest } from '../../../utils/session';
import { requireRole } from '../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('=== API LLAMADA INICIADA ===');
  
  try {
    // 1. Verificar usuario
    const user = getUserFromRequest(request);
    console.log('Usuario:', user ? { id: user.id, socesId: user.socesId } : 'null');

    if (!user || !requireRole(user, ['admin'])) {
      console.log('Usuario no autorizado');
      return redirect('/login');
    }

    // 2. Obtener datos del formulario
    const formData = await request.formData();
    
    console.log('=== DATOS RECIBIDOS ===');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}"`);
    }

    // 3. Extraer campos
    const titulo = formData.get('titulo')?.toString()?.trim();
    const contenido = formData.get('contenido')?.toString()?.trim();
    const link = formData.get('link')?.toString()?.trim() || '';
    const link2 = formData.get('link2')?.toString()?.trim() || '';
    const fechaStr = formData.get('fecha')?.toString()?.trim();

    console.log('=== CAMPOS PROCESADOS ===');
    console.log(`titulo: "${titulo}"`);
    console.log(`contenido: "${contenido}"`);
    console.log(`fechaStr: "${fechaStr}"`);

    // 4. Validar campos requeridos
    if (!titulo || !contenido || !fechaStr) {
      console.log('❌ Campos faltantes');
      return redirect('/admin/news/create?error=validation');
    }

    if (!user.id || !user.socesId) {
      console.log('❌ Usuario sin ID o socesId');
      return redirect('/admin/news/create?error=validation');
    }

    // 5. Validar fecha
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) {
      console.log('❌ Fecha inválida');
      return redirect('/admin/news/create?error=validation');
    }

    // 6. Datos para insertar
    const convData = {
      userId: user.id,
      titulo: titulo,
      contenido: contenido,
      link: link,
      link2: link2,
      fecha: fecha,
      socesId: user.socesId,
    };

    console.log('=== DATOS PARA DB ===');
    console.log(JSON.stringify(convData, null, 2));

    // 7. Insertar
    await db.insert(Convocatorias).values(convData);
    console.log('✅ Inserción exitosa');

    return redirect('/admin/conv?message=created');

  } catch (error) {
    console.error('❌ ERROR:', error);
    return redirect('/admin/conv/create?error=server');
  }
};
