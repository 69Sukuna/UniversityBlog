import { r as requireRole, d as db, N as News, U as Usuarios } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["admin"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const userId = parseInt(formData.get("userId")?.toString() || "0");
    if (!userId) {
      return redirect("/admin/users?error=not_found");
    }
    if (userId === user.id) {
      return redirect("/admin/users?error=delete_failed");
    }
    await db.delete(News).where(eq(News.userId, userId));
    await db.delete(Usuarios).where(eq(Usuarios.id, userId));
    return redirect("/admin/users?message=deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    return redirect("/admin/users?error=delete_failed");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
