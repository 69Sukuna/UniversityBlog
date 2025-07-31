import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, ai as renderSlot, r as renderTemplate } from './astro/server_Dm1lobmq.mjs';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    href,
    type = "button",
    variant = "primary",
    size = "md",
    class: className = "",
    disabled = false
  } = Astro2.props;
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(classes, "class")}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute(type, "type")}${addAttribute(classes, "class")}${addAttribute(disabled, "disabled")}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Button.astro", void 0);

export { $$Button as $ };
