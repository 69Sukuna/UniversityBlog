import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Form, a as $$Input } from '../../../../chunks/Input_Ce3rCUOG.mjs';
import { $ as $$Button } from '../../../../chunks/Button_C5upKd9-.mjs';
import { $ as $$Alert } from '../../../../chunks/Alert_iw-dkreQ.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { r as requireRole, d as db, U as Usuarios } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const user = getUserFromRequest(Astro2.request);
  if (!user || !requireRole(user, ["admin"])) {
    return Astro2.redirect("/login");
  }
  const { id } = Astro2.params;
  const userId = parseInt(id || "0");
  if (!userId) {
    return Astro2.redirect("/admin/users?error=not_found");
  }
  const usuarios = await db.select().from(Usuarios).where(eq(Usuarios.id, userId));
  if (usuarios.length === 0) {
    return Astro2.redirect("/admin/users?error=not_found");
  }
  const usuarioEdit = usuarios[0];
  const urlParams = new URLSearchParams(new URL(Astro2.request.url).search);
  const error = urlParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Editar Usuario: ${usuarioEdit.nombre} - Admin` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <div class="bg-white shadow"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-3xl font-bold text-gray-900">Editar Usuario</h1> <p class="mt-2 text-sm text-gray-600">Modificar datos de: ${usuarioEdit.nombre}</p> </div> ${renderComponent($$result2, "Button", $$Button, { "href": "/admin/users", "variant": "secondary" }, { "default": async ($$result3) => renderTemplate` ← Volver a Usuarios ` })} </div> </div> </div> <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8"> <div class="px-4 py-6 sm:px-0"> ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "error", "class": "mb-6" }, { "default": async ($$result3) => renderTemplate`${error === "validation" && "Todos los campos son obligatorios"}${error === "exists" && "Ya existe un usuario con ese nombre de usuario o correo"}${error === "server" && "Error del servidor. Intenta nuevamente"}` })}`} <div class="bg-white shadow rounded-lg"> <div class="px-6 py-6"> ${renderComponent($$result2, "Form", $$Form, { "action": "/api/admin/users/update", "method": "POST" }, { "default": async ($$result3) => renderTemplate` <input type="hidden" name="userId"${addAttribute(usuarioEdit.id, "value")}> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result3, "Input", $$Input, { "name": "nombre", "type": "text", "label": "Nombre Completo", "value": usuarioEdit.nombre, "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "userName", "type": "text", "label": "Nombre de Usuario", "value": usuarioEdit.userName, "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "correo", "type": "email", "label": "Correo Electr\xF3nico", "value": usuarioEdit.correo, "required": true })} <div> <label class="block text-sm font-medium text-gray-700 mb-1">
Rol <span class="text-red-500">*</span> </label> <select name="role" required class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"> <option value="user"${addAttribute(usuarioEdit.role === "user", "selected")}>Usuario</option> <option value="admin"${addAttribute(usuarioEdit.role === "admin", "selected")}>Administrador</option> </select> </div> ${renderComponent($$result3, "Input", $$Input, { "name": "password", "type": "password", "label": "Nueva Contrase\xF1a", "placeholder": "Dejar vac\xEDo para mantener actual" })} ${renderComponent($$result3, "Input", $$Input, { "name": "confirmPassword", "type": "password", "label": "Confirmar Nueva Contrase\xF1a", "placeholder": "Solo si cambias la contrase\xF1a" })} </div> <div class="mt-8 flex justify-end space-x-3"> ${renderComponent($$result3, "Button", $$Button, { "href": "/admin/users", "variant": "secondary" }, { "default": async ($$result4) => renderTemplate` Cancelar ` })} ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "variant": "primary" }, { "default": async ($$result4) => renderTemplate` Actualizar Usuario ` })} </div> ` })} </div> </div> </div> </main> </div> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/users/[id]/edit.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/users/[id]/edit.astro";
const $$url = "/admin/users/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
