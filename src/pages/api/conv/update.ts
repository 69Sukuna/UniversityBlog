import type { APIRoute } from 'astro';
import { db, Convocatorias, eq } from 'astro:db';
import { getUserFromRequest } from '../../../utils/session';
import { requireRole } from '../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  let convocatoriaId = 0;

  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['admin'])) {
      return redirect('/login');
    }

    const formData = await request.formData();

    convocatoriaId = parseInt(formData.get('convocatoriaId')?.toString() || '0');
    const titulo = formData.get('titulo')?.toString();
    const contenido = formData.get('contenido')?.toString();
    const link = formData.get('link')?.toString() || '';
    const link2 = formData.get('link2')?.toString() || '';

    if (!convocatoriaId || !titulo || !contenido) {
      return redirect(`/admin/conv/${convocatoriaId}/edit?error=validation`);
    }

    const updateData = {
      titulo,
      contenido,
      link,
      link2,
    };

    await db.update(Convocatorias).set(updateData).where(eq(Convocatorias.id, convocatoriaId));

    return redirect('/admin/conv?message=updated');
  } catch (error) {
    return redirect(`/admin/conv/${convocatoriaId}/edit?error=server`);
  }
};
