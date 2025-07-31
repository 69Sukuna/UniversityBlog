import { d as defineMiddleware, s as sequence } from './chunks/index_C-66TWWN.mjs';
import { g as getUserFromRequest } from './chunks/session_DmsVjKaO.mjs';
import './chunks/astro-designed-error-pages_DHrJwGwQ.mjs';
import './chunks/astro/server_Dm1lobmq.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = new URL(url).pathname;
  const publicRoutes = ["/", "/login", "/register", "/api/auth/login", "/api/auth/logout"];
  const protectedRoutes = ["/dashboard", "/admin", "/profile"];
  const adminRoutes = ["/admin"];
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith("/api/public"))) {
    return next();
  }
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const user = getUserFromRequest(request);
    if (!user) {
      return Response.redirect(new URL("/login", url), 302);
    }
    if (adminRoutes.some((route) => pathname.startsWith(route)) && user.role !== "admin") {
      return Response.redirect(new URL("/dashboard", url), 302);
    }
    if (pathname.startsWith("/dashboard") && user.role === "admin") {
      return Response.redirect(new URL("/admin", url), 302);
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
