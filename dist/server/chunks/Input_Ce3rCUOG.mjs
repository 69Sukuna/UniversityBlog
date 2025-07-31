import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, ai as renderSlot, r as renderTemplate } from './astro/server_Dm1lobmq.mjs';

const $$Astro$1 = createAstro();
const $$Form = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Form;
  const { action, method = "POST", class: className = "", enctype } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(action, "action")}${addAttribute(method, "method")}${addAttribute(enctype, "enctype")}${addAttribute(`space-y-6 ${className}`, "class")}> ${renderSlot($$result, $$slots["default"])} </form>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Form.astro", void 0);

const $$Astro = createAstro();
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Input;
  const {
    type = "text",
    name,
    label,
    placeholder,
    value = "",
    required = false,
    disabled = false,
    error,
    class: className = "",
    id = name
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`space-y-1 ${className}`, "class")}> ${label && renderTemplate`<label${addAttribute(id, "for")} class="block text-sm font-medium text-gray-700"> ${label} ${required && renderTemplate`<span class="text-red-500 ml-1">*</span>`} </label>`} <input${addAttribute(type, "type")}${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(value, "value")}${addAttribute(placeholder, "placeholder")}${addAttribute(required, "required")}${addAttribute(disabled, "disabled")}${addAttribute(`
      block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
      focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
      ${error ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
      ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white"}
    `, "class")}> ${error && renderTemplate`<p class="text-sm text-red-600" role="alert"> ${error} </p>`} </div>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Input.astro", void 0);

export { $$Form as $, $$Input as a };
