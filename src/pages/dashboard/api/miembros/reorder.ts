import type { APIRoute } from 'astro';
import { db, Miembros, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request }) => {
  const user = await getUserFromRequest(request);

  if (!user || !requireRole(user, ['user'])) {
    return new Response('No autorizado', { status: 403 });
  }

  const body = await request.json();
  const { orden } = body as { orden: { id: number; orden: number }[] };

  if (!Array.isArray(orden)) {
    return new Response('Datos inválidos', { status: 400 });
  }

  // Actualizar el orden de cada miembro
  for (const item of orden) {
await (db.update(Miembros) as any)
  .set({ orden: item.orden })
  .where(eq(Miembros.id, item.id));
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
