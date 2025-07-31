import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Form, a as $$Input } from '../../../../chunks/Input_Ce3rCUOG.mjs';
import { $ as $$Button } from '../../../../chunks/Button_C5upKd9-.mjs';
import { $ as $$Alert } from '../../../../chunks/Alert_iw-dkreQ.mjs';
import { $ as $$TextArea } from '../../../../chunks/TextArea_Cyp4thXR.mjs';
import { g as getUserFromRequest } from '../../../../chunks/session_DmsVjKaO.mjs';
import { r as requireRole, d as db, N as News } from '../../../../chunks/auth_CGGBIuWf.mjs';
import { and, eq } from '@astrojs/db/dist/runtime/virtual.js';
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
  const newsId = parseInt(id || "0");
  if (!newsId) {
    return Astro2.redirect("/admin/news?error=not_found");
  }
  const noticias = await db.select().from(News).where(and(eq(News.id, newsId)));
  if (noticias.length === 0) {
    return Astro2.redirect("/admin/news?error=not_found");
  }
  const noticiaEdit = noticias[0];
  const urlParams = new URLSearchParams(new URL(Astro2.request.url).search);
  const error = urlParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Editar Noticia: ${noticiaEdit.titulo}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto py-10"> ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "error", "class": "mb-6" }, { "default": async ($$result3) => renderTemplate`${error === "validation" && "Todos los campos obligatorios deben completarse"}${error === "server" && "Error del servidor. Intenta nuevamente"}` })}`} <div class="bg-white shadow rounded-lg px-6 py-8"> <h1 class="text-2xl font-bold mb-4">Editar Noticia</h1> ${renderComponent($$result2, "Form", $$Form, { "action": "/api/news/update", "method": "POST" }, { "default": async ($$result3) => renderTemplate` <input type="hidden" name="newsId"${addAttribute(noticiaEdit.id, "value")}> ${renderComponent($$result3, "Input", $$Input, { "name": "titulo", "type": "text", "label": "T\xEDtulo", "value": noticiaEdit.titulo, "required": true })} ${renderComponent($$result3, "Input", $$Input, { "name": "link", "type": "text", "label": "Enlace Relacionado (opcional)", "value": noticiaEdit.link || "", "required": false })} ${renderComponent($$result3, "TextArea", $$TextArea, { "name": "contenido", "label": "Contenido", "value": noticiaEdit.contenido, "required": true })} <div class="mt-6 flex justify-end space-x-3"> ${renderComponent($$result3, "Button", $$Button, { "href": "/admin/news", "variant": "secondary" }, { "default": async ($$result4) => renderTemplate`Cancelar` })} ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "variant": "primary" }, { "default": async ($$result4) => renderTemplate`Actualizar Noticia` })} </div> ` })} </div> </main> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/news/[id]/edit.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/admin/news/[id]/edit.astro";
const $$url = "/admin/news/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
