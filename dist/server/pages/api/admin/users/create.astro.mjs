import { d as db, U as Usuarios } from '../../../../chunks/_astro_db_CP79s7b-.mjs';
import { r as requireRole, A as AuthService } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { or, eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["admin"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const nombre = formData.get("nombre")?.toString();
    const userName = formData.get("userName")?.toString();
    const correo = formData.get("correo")?.toString();
    const role = formData.get("role")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    if (!nombre || !userName || !correo || !role || !password || !confirmPassword) {
      return redirect("/admin/users/create?error=validation");
    }
    if (password !== confirmPassword) {
      return redirect("/admin/users/create?error=validation");
    }
    if (password.length < 6) {
      return redirect("/admin/users/create?error=validation");
    }
    const existingUsers = await db.select().from(Usuarios).where(or(eq(Usuarios.userName, userName), eq(Usuarios.correo, correo)));
    if (existingUsers.length > 0) {
      return redirect("/admin/users/create?error=exists");
    }
    const hashedPassword = await AuthService.hashPassword(password);
    await db.insert(Usuarios).values({
      nombre,
      userName,
      correo,
      role,
      password: hashedPassword
    });
    return redirect("/admin/users?message=created");
  } catch (error) {
    console.error("Error creating user:", error);
    return redirect("/admin/users/create?error=server");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
