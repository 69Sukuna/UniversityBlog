import type { APIRoute } from 'astro';
import { db, Usuarios, News, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = await getUserFromRequest(request);

    if (!user || !requireRole(user, ['admin'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    const userId = parseInt(formData.get('userId')?.toString() || '0');

    if (!userId) {
      return redirect('/admin/users?error=not_found');
    }

    // No permitir que se elimine a sÃ­ mismo
    if (userId === user.id) {
      return redirect('/admin/users?error=delete_failed');
    }

    // Eliminar primero las noticias del usuario (cascada)
    await db.delete(News).where(eq(News.userId, userId));

    // Luego eliminar el usuario
    await db.delete(Usuarios).where(eq(Usuarios.id, userId));

    return redirect('/admin/users?message=deleted');
  } catch (error) {
    console.error('Error deleting user:', error);
    return redirect('/admin/users?error=delete_failed');
  }
};

