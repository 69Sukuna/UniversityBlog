import { r as requireRole, d as db, U as Usuarios, A as AuthService } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { and, or, eq, sql } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  let userId = 0;
  try {
    const user = getUserFromRequest(request);
    if (!user || !requireRole(user, ["admin"])) {
      return redirect("/login");
    }
    const formData = await request.formData();
    userId = parseInt(formData.get("userId")?.toString() || "0");
    const nombre = formData.get("nombre")?.toString();
    const userName = formData.get("userName")?.toString();
    const correo = formData.get("correo")?.toString();
    const role = formData.get("role")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    if (!userId || !nombre || !userName || !correo || !role) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }
    if (password && password !== confirmPassword) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }
    if (password && password.length < 6) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }
    const existingUsers = await db.select().from(Usuarios).where(
      and(
        or(eq(Usuarios.userName, userName), eq(Usuarios.correo, correo)),
        // Excluir el usuario actual
        sql`${Usuarios.id} != ${userId}`
      )
    );
    if (existingUsers.length > 0) {
      return redirect(`/admin/users/${userId}/edit?error=exists`);
    }
    const updateData = {
      nombre,
      userName,
      correo,
      role
    };
    if (password) {
      updateData.password = await AuthService.hashPassword(password);
    }
    await db.update(Usuarios).set(updateData).where(eq(Usuarios.id, userId));
    return redirect("/admin/users?message=updated");
  } catch (error) {
    return redirect(`/admin/users/${userId}/edit?error=server`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
