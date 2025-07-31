import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Button } from '../../chunks/Button_C5upKd9-.mjs';
import { $ as $$Alert } from '../../chunks/Alert_iw-dkreQ.mjs';
import { g as getUserFromRequest } from '../../chunks/session_DmsVjKaO.mjs';
import { r as requireRole, d as db, N as News } from '../../chunks/auth_CGGBIuWf.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = getUserFromRequest(Astro2.request);
  if (!user || !requireRole(user, ["user"])) {
    return Astro2.redirect("/login");
  }
  const noticias = await db.select().from(News).where(eq(News.userId, user.id));
  const urlParams = new URLSearchParams(new URL(Astro2.request.url).search);
  const message = urlParams.get("message");
  const error = urlParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Gesti\xF3n de Noticias - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white shadow"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-3xl font-bold text-gray-900">Gestión de Noticias</h1> <p class="mt-2 text-sm text-gray-600">Administra todas las noticias del sistema</p> </div> <div class="flex space-x-3"> ${renderComponent($$result2, "Button", $$Button, { "href": "/admin", "variant": "secondary" }, { "default": async ($$result3) => renderTemplate`← Volver al Panel` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/dashboard/news/create", "variant": "primary" }, { "default": async ($$result3) => renderTemplate`+ Nueva Noticia` })} </div> </div> </div> </div> <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> <div class="px-4 py-6 sm:px-0"> ${message && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "success", "class": "mb-6" }, { "default": async ($$result3) => renderTemplate`${message === "created" && "Noticia creada exitosamente"}${message === "updated" && "Noticia actualizada exitosamente"}${message === "deleted" && "Noticia eliminada exitosamente"}` })}`} ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "error", "class": "mb-6" }, { "default": async ($$result3) => renderTemplate`${error === "delete_failed" && "Error al eliminar la noticia"}${error === "not_found" && "Noticia no encontrada"}` })}`} <!-- Tabla de Noticias --> <div class="bg-white shadow overflow-hidden sm:rounded-md"> <div class="px-4 py-5 sm:px-6 border-b border-gray-200"> <h3 class="text-lg leading-6 font-medium text-gray-900">
Lista de Noticias (${noticias.length})
</h3> </div> ${noticias.length === 0 ? renderTemplate`<div class="text-center py-12"> <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900">No hay noticias</h3> <p class="mt-1 text-sm text-gray-500">Comienza creando una nueva noticia.</p> <div class="mt-6"> ${renderComponent($$result2, "Button", $$Button, { "href": "/dashboard/news/create", "variant": "primary" }, { "default": async ($$result3) => renderTemplate`
+ Crear Noticia
` })} </div> </div>` : renderTemplate`<ul class="divide-y divide-gray-200"> ${noticias.map((noticia) => renderTemplate`<li class="px-4 py-4 sm:px-6"> <div class="flex items-center justify-between"> <div class="flex-1 min-w-0"> <div class="flex items-center justify-between"> <p class="text-sm font-medium text-gray-900 truncate"> ${noticia.titulo} </p> <p class="text-sm text-gray-500"> ${new Date(noticia.fecha).toLocaleDateString()} </p> </div> <p class="mt-1 text-sm text-gray-500 truncate"> ${noticia.contenido.slice(0, 100)}...
</p> </div> <div class="flex items-center space-x-2 ml-4"> ${renderComponent($$result2, "Button", $$Button, { "href": `/dashboard/news/${noticia.id}/edit`, "variant": "outline", "size": "sm" }, { "default": async ($$result3) => renderTemplate`
Editar
` })} <form action="/dashboard/api/news/delete" method="POST" class="inline"> <input type="hidden" name="newsId"${addAttribute(noticia.id, "value")}> <button type="submit" onclick="return confirm('¿Estás seguro de eliminar esta noticia?')" class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
Eliminar
</button> </form> </div> </div> </li>`)} </ul>`} </div> </div> </main> </div> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/dashboard/news/index.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/dashboard/news/index.astro";
const $$url = "/dashboard/news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
