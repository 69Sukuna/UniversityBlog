import type { APIRoute } from 'astro';
import { db, Miembros, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  const user = await getUserFromRequest(request);

  if (!user || !requireRole(user, ['user'])) {
    return redirect('/login');
  }

  const formData = await request.formData();
  const miembroId = Number(formData.get('miembroId'));

  if (!miembroId) {
    return new Response('ID inválido', { status: 400 });
  }

  // Verificar que el miembro pertenece a la sociedad del usuario
  const [miembro] = await db.select().from(Miembros).where(eq(Miembros.id, miembroId));

  if (!miembro || miembro.socesId !== user.socesId) {
    return new Response('No autorizado', { status: 403 });
  }

  await db.delete(Miembros).where(eq(Miembros.id, miembroId));

  return redirect('/dashboard/miembros');
};
