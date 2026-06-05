import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../../utils/session';

export const POST: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login?message=Sesión cerrada correctamente',
      'Set-Cookie': clearSessionCookie(),
    },
  });
};