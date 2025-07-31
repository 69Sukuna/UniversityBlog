import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Form, a as $$Input } from '../../../chunks/Input_Ce3rCUOG.mjs';
import { $ as $$Button } from '../../../chunks/Button_C5upKd9-.mjs';
import { $ as $$Alert } from '../../../chunks/Alert_iw-dkreQ.mjs';
import { g as getUserFromRequest } from '../../../chunks/session_DmsVjKaO.mjs';
import { r as requireRole } from '../../../chunks/auth_CGGBIuWf.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Create = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Create;
  const user = getUserFromRequest(Astro2.request);
  if (!user || !requireRole(user, ["admin"])) {
    return Astro2.redirect("/login");
  }
  const urlParams = new URLSearchParams(new URL(Astro2.request.url).search);
  const error = urlParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Crear Usuario - Admin" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <div class="bg-white shadow"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-3xl font-bold text-gray-900">Crear Nuevo Usuario</h1> <p class="mt-2 text-sm text-gray-600">Completa los datos del nuevo usuario</p> </div> ${renderComponent($$result2, "Button", $$Button, { "href": "/admin/users", "variant": "secondary" }, { "default": ($$result3) => renderTemplate` ← Volver a Usuarios ` })} </div> </div> </div> <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8"> <div class="px-4 py-6 sm:px-0"> ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "error", "class": "mb-6" }, { "default": ($$result3) => renderTemplate`${error === "validation" && "Todos los campos son obligatorios"}${error === "exists" && "Ya existe un usuario con ese nombre de usuario o correo"}${error === "server" && "Error del servidor. Intenta nuevamente"}` })}`} <div class="bg-white shadow rounded-lg"> <div class="px-6 py-6"> ${renderComponent($$result2, "Form", $$Form, { "action": "/api/admin/users/create", "method": "POST" }, { "default": ($$result3) => renderTemplate` <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result3, "Input", $$Input, { "name": "nombre", "type": "text", "label": "Nombre Completo", "placeholder": "Ej: Juan P\xE9rez", "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "userName", "type": "text", "label": "Nombre de Usuario", "placeholder": "Ej: juanperez", "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "correo", "type": "email", "label": "Correo Electr\xF3nico", "placeholder": "Ej: juan@ejemplo.com", "required": true })} <div> <label class="block text-sm font-medium text-gray-700 mb-1">
Rol <span class="text-red-500">*</span> </label> <select name="role" required class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"> <option value="">Seleccionar rol</option> <option value="user">Usuario</option> <option value="admin">Administrador</option> </select> </div> ${renderComponent($$result3, "Input", $$Input, { "name": "password", "type": "password", "label": "Contrase\xF1a", "placeholder": "M\xEDnimo 6 caracteres", "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "confirmPassword", "type": "password", "label": "Confirmar Contrase\xF1a", "placeholder": "Repetir contrase\xF1a", "required": true })} </div> <div class="mt-8 flex justify-end space-x-3"> ${renderComponent($$result3, "Button", $$Button, { "href": "/admin/users", "variant": "secondary" }, { "default": ($$result4) => renderTemplate` Cancelar ` })} ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "variant": "primary" }, { "default": ($$result4) => renderTemplate` Crear Usuario ` })} </div> ` })} </div> </div> </div> </main> </div> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/users/create.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/users/create.astro";
const $$url = "/admin/users/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Create,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
