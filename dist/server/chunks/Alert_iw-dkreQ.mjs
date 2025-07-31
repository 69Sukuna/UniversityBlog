import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, ai as renderSlot, r as renderTemplate } from './astro/server_Dm1lobmq.mjs';

const $$Astro = createAstro();
const $$Alert = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Alert;
  const { type = "info", title, class: className = "" } = Astro2.props;
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };
  const iconPaths = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`rounded-md border p-4 ${typeStyles[type]} ${className}`, "class")}> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd"${addAttribute(iconPaths[type], "d")} clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> ${title && renderTemplate`<h3 class="text-sm font-medium">${title}</h3>`} <div${addAttribute(`text-sm ${title ? "mt-2" : ""}`, "class")}> ${renderSlot($$result, $$slots["default"])} </div> </div> </div> </div>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Alert.astro", void 0);

export { $$Alert as $ };
