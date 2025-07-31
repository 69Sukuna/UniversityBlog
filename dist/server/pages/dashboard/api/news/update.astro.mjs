import { r as requireRole, d as db, N as News } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  let newsId = 0;
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["user"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    newsId = parseInt(formData.get("newsId")?.toString() || "0");
    const titulo = formData.get("titulo")?.toString();
    const contenido = formData.get("contenido")?.toString();
    const link = formData.get("link")?.toString() || "";
    if (!newsId || !titulo || !contenido) {
      return redirect(`/dashboard/news/${newsId}/edit?error=validation`);
    }
    const updateData = {
      titulo,
      contenido,
      link
    };
    await db.update(News).set(updateData).where(eq(News.id, newsId));
    return redirect("/dashboard/news?message=updated");
  } catch (error) {
    return redirect(`/dashboard/news/${newsId}/edit?error=server`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
