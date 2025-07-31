import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_Dm1lobmq.mjs';

const $$Astro = createAstro();
const $$TextArea = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TextArea;
  const {
    name,
    label,
    value = "",
    placeholder = "",
    required = false,
    class: className = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`mb-4 ${className}`, "class")}> <label${addAttribute(name, "for")} class="block text-sm font-medium text-gray-700 mb-1"> ${label} ${required && renderTemplate`<span class="text-red-500">*</span>`} </label> <textarea${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(placeholder, "placeholder")}${addAttribute(required, "required")} rows="6" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">${value}</textarea> </div>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/TextArea.astro", void 0);

export { $$TextArea as $ };
