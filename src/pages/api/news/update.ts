import type { APIRoute } from 'astro';
import { db, News, eq } from 'astro:db';
import { getUserFromRequest } from '../../../utils/session';
import { requireRole } from '../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  let newsId = 0;

  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['admin'])) {
      return redirect('/login');
    }

    const formData = await request.formData();

    newsId = parseInt(formData.get('newsId')?.toString() || '0');
    const titulo = formData.get('titulo')?.toString();
    const contenido = formData.get('contenido')?.toString();
    const link = formData.get('link')?.toString() || '';

    if (!newsId || !titulo || !contenido) {
      return redirect(`/admin/news/${newsId}/edit?error=validation`);
    }

    const updateData = {
      titulo,
      contenido,
      link,
    };

    await db.update(News).set(updateData).where(eq(News.id, newsId));

    return redirect('/admin/news?message=updated');
  } catch (error) {
    return redirect(`/admin/news/${newsId}/edit?error=server`);
  }
};
