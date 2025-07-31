import type { APIRoute } from 'astro';
import { db, News, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['user'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    const newsId = parseInt(formData.get('newsId')?.toString() || '0');

    if (!newsId) {
      return redirect('/dashboard/news?error=not_found');
    }

    // Eliminar la noticia
    await db.delete(News).where(eq(News.id, newsId));

    return redirect('/dashboard/news?message=deleted');
  } catch (error) {
    console.error('Error deleting news:', error);
    return redirect('/dashboard/news?error=delete_failed');
  }
};
