import { defineMiddleware } from 'astro:middleware';
import { getUserFromRequest } from './utils/session';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = new URL(url).pathname;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/login', '/register', '/api/auth/login', '/api/auth/logout'];

  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/admin', '/profile'];

  // Rutas que requieren rol específico
  const adminRoutes = ['/admin'];

  // Si es una ruta pública, continuar
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith('/api/public'))) {
    return next();
  }

  // Verificar autenticación para rutas protegidas
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const user = await getUserFromRequest(request);

    if (!user) {
      return Response.redirect(new URL('/login', url), 302);
    }

    // Verificar rol para rutas de admin
    if (adminRoutes.some((route) => pathname.startsWith(route)) && user.role !== 'admin') {
      return Response.redirect(new URL('/dashboard', url), 302);
    }

    // Redirigir admin a su panel si intenta acceder a dashboard normal
    if (pathname.startsWith('/dashboard') && user.role === 'admin') {
      return Response.redirect(new URL('/admin', url), 302);
    }
  }

  return next();
});