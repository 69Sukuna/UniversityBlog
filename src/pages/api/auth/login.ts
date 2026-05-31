import type { APIRoute } from 'astro';
import { AuthService } from '../../../utils/auth';
import { createSessionCookie } from '../../../utils/session';

// Rate limiting en memoria
const attempts = new Map<string, { count: number; time: number }>();

const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 15 * 60 * 1000; // 15 minutos

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  try {
    // Rate limiting
    const ip = clientAddress ?? 'unknown';
    const now = Date.now();
    const attempt = attempts.get(ip);

    if (attempt && attempt.count >= MAX_ATTEMPTS && now - attempt.time < BLOCK_TIME) {
      const minutesLeft = Math.ceil((BLOCK_TIME - (now - attempt.time)) / 60000);
      return redirect(`/login?error=blocked&minutes=${minutesLeft}`);
    }

    const formData = await request.formData();
    const userName = formData.get('userName')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!userName || !password) {
      return redirect('/login?error=required');
    }

    const user = await AuthService.validateUser({ userName, password });

    if (!user) {
      // Registrar intento fallido
      attempts.set(ip, {
        count: (attempt?.count ?? 0) + 1,
        time: attempt?.count ? attempt.time : now,
      });
      return redirect('/login?error=invalid');
    }

    // Login exitoso — limpiar intentos
    attempts.delete(ip);

    const sessionCookie = await createSessionCookie(user);
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