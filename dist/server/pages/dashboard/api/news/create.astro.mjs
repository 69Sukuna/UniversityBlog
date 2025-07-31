import { r as requireRole, d as db, N as News } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["user"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const titulo = formData.get("titulo")?.toString();
    const contenido = formData.get("contenido")?.toString();
    const link = formData.get("link")?.toString();
    const fechaStr = formData.get("fecha")?.toString();
    if (!titulo || !contenido || !fechaStr) {
      return redirect("/dashboard/news/create?error=validation");
    }
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) {
      return redirect("/dashboard/news/create?error=validation");
    }
    await db.insert(News).values({
      userId: user.id,
      // número
      titulo,
      // string
      contenido,
      // string
      link: link || "",
      // string (no null/undefined)
      fecha: new Date(fechaStr)
      // ¡Esto debe ser tipo Date!
    });
    return redirect("/dashboard/news?message=created");
  } catch (error) {
    console.error("Error creando noticia:", error);
    return redirect("/dashboard/news/create?error=server");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
