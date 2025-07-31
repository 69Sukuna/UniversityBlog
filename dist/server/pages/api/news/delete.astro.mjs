import { d as db, N as News } from '../../../chunks/_astro_db_CP79s7b-.mjs';
import { g as getUserFromRequest } from '../../../chunks/session_DmsVjKaO.mjs';
import { r as requireRole } from '../../../chunks/auth_CGGBIuWf.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["admin"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const newsId = parseInt(formData.get("newsId")?.toString() || "0");
    if (!newsId) {
      return redirect("/admin/news?error=not_found");
    }
    await db.delete(News).where(eq(News.id, newsId));
    return redirect("/admin/news?message=deleted");
  } catch (error) {
    console.error("Error deleting news:", error);
    return redirect("/admin/news?error=delete_failed");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
