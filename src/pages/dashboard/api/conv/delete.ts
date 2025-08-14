import type { APIRoute } from 'astro';
import { db, Convocatorias, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['user'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    // Cambiado de 'ConvocatoriaId' a 'convocatoriaId' para coincidir con el formulario
    const convocatoriaId = parseInt(formData.get('convocatoriaId')?.toString() || '0');

    if (!convocatoriaId) {
      return redirect('/dashboard/conv?error=not_found');
    }

    // Verificar que la convocatoria existe antes de eliminar
    const existingConvocatoria = await db
      .select()
      .from(Convocatorias)
      .where(eq(Convocatorias.id, convocatoriaId));

    if (existingConvocatoria.length === 0) {
      return redirect('/dashboard/conv?error=not_found');
    }

    // Eliminar la convocatoria
    await db.delete(Convocatorias).where(eq(Convocatorias.id, convocatoriaId));

    return redirect('/dashboard/conv?message=deleted');
  } catch (error) {
    console.error('Error deleting convocatoria:', error);
    return redirect('/dashboard/conv?error=delete_failed');
  }
};