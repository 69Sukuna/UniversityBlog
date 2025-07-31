import type { APIRoute } from 'astro';
import { AuthService } from '../../../../utils/auth';
import { createSessionCookie } from '../../../../utils/session';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const userName = formData.get('userName')?.toString();
    const password = formData.get('password')?.toString();

    if (!userName || !password) {
      return redirect('/login?error=required');
    }

    const user = await AuthService.validateUser({ userName, password });

    if (!user) {
      return redirect('/login?error=invalid');
    }

    // Crear cookie de sesión
    const sessionCookie = createSessionCookie(user);

    // Redirigir según el rol
    const redirectUrl = user.role === 'admin' ? '/admin' : '/dashboard';

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
        'Set-Cookie': sessionCookie,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return redirect('/login?error=server');
  }
};
