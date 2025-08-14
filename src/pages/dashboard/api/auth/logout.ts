import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  console.log('Logout ejecutado');
  
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/login?message=Logout exitoso',
      'Set-Cookie': 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  });
};

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/login?message=Logout exitoso',
      'Set-Cookie': 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  });
};