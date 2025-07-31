import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Form, a as $$Input } from '../chunks/Input_Ce3rCUOG.mjs';
import { $ as $$Button } from '../chunks/Button_C5upKd9-.mjs';
import { $ as $$Alert } from '../chunks/Alert_iw-dkreQ.mjs';
import { g as getUserFromRequest } from '../chunks/session_DmsVjKaO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const user = getUserFromRequest(Astro2.request);
  if (user) {
    return Astro2.redirect(user.role === "admin" ? "/admin" : "/dashboard");
  }
  const urlParams = new URLSearchParams(new URL(Astro2.request.url).search);
  const error = urlParams.get("error");
  const message = urlParams.get("message");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n - Mi App", "description": "Inicia sesi\xF3n en tu cuenta" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <div class="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center"> <span class="text-white font-bold text-lg">MA</span> </div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2> <p class="mt-2 text-center text-sm text-gray-600">Ingresa tus credenciales para acceder</p> </div> ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "error", "title": "Error" }, { "default": ($$result3) => renderTemplate`${error === "invalid" && "Usuario o contrase\xF1a incorrectos"}${error === "required" && "Todos los campos son obligatorios"}${error === "server" && "Error del servidor. Intenta nuevamente"}` })}`} ${message && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "success" }, { "default": ($$result3) => renderTemplate`${message}` })}`} ${renderComponent($$result2, "Form", $$Form, { "action": "/api/auth/login", "method": "POST", "class": "mt-8 space-y-6" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> ${renderComponent($$result3, "Input", $$Input, { "name": "userName", "type": "text", "label": "Nombre de Usuario", "placeholder": "Ingresa tu usuario", "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "password", "type": "password", "label": "Contrase\xF1a", "placeholder": "Ingresa tu contrase\xF1a", "required": true })} </div> <div> ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "variant": "primary", "class": "w-full" }, { "default": ($$result4) => renderTemplate` Iniciar Sesión ` })} </div> <div class="text-center"> <p class="text-sm text-gray-600">
¿No tienes cuenta?
<a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
Regístrate aquí
</a> </p> </div> ` })} </div> </div> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/login.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
