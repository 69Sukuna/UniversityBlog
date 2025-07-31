import type { APIRoute } from 'astro';
import { db, News } from 'astro:db';
import { AuthService, requireRole } from '../../../../utils/auth';
import { getUserFromRequest } from '../../../../utils/session';


export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['user'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    const titulo = formData.get('titulo')?.toString();
    const contenido = formData.get('contenido')?.toString();
    const link = formData.get('link')?.toString();
    const fechaStr = formData.get('fecha')?.toString();

    // Validaciones básicas
    if (!titulo || !contenido || !fechaStr) {
      return redirect('/dashboard/news/create?error=validation');
    }

    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) {
      return redirect('/dashboard/news/create?error=validation');
    }

    // Insertar en base de datos
    await db.insert(News).values({
      userId: user.id,                     // número
      titulo,                             // string
      contenido,                          // string
      link: link || '',                   // string (no null/undefined)
      fecha: new Date(fechaStr),          // ¡Esto debe ser tipo Date!
    });


    return redirect('/dashboard/news?message=created');
  } catch (error) {
    console.error('Error creando noticia:', error);
    return redirect('/dashboard/news/create?error=server');
  }
};
