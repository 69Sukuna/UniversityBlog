import type { APIRoute } from 'astro';
import { db, Convocatorias, eq, and } from 'astro:db';
import { getUserFromRequest } from '../../../utils/session';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);

    // Verificar que el usuario esté autenticado y pertenezca a la sociedad ID 1
    if (!user || user.socesId !== 1) {
      return redirect('/login');
    }

    const formData = await request.formData();
    const convocatoriaId = parseInt(formData.get('convId')?.toString() || '0');

    if (!convocatoriaId) {
      return redirect('/admin/conv?error=not_found');
    }

    // Verificar que la convocatoria existe y pertenece a la sociedad correcta
    const convocatoria = await db
      .select()
      .from(Convocatorias)
      .where(
        and(
          eq(Convocatorias.id, convocatoriaId),
          eq(Convocatorias.socesId, 1)
        )
      )
      .get();

    if (!convocatoria) {
      return redirect('/admin/conv?error=not_found');
    }

    // Verificar permisos: solo el autor o administradores pueden eliminar
    const canDelete = user.role === 'admin' || convocatoria.userId === user.id;
    
    if (!canDelete) {
      return redirect('/admin/conv?error=unauthorized');
    }

    // Eliminar la convocatoria
    await db
      .delete(Convocatorias)
      .where(
        and(
          eq(Convocatorias.id, convocatoriaId),
          eq(Convocatorias.socesId, 1)
        )
      );

    return redirect('/admin/conv?message=deleted');
  } catch (error) {
    console.error('Error deleting convocatoria:', error);
    return redirect('/admin/conv?error=delete_failed');
  }
};