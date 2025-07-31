import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, ag as renderScript, ah as renderHead, ai as renderSlot } from './astro/server_Dm1lobmq.mjs';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navigation;
  const pathname = Astro2.url.pathname;
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Log In", href: "/login" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="hidden md:flex space-x-8"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === item.href || item.href !== "/" && pathname.startsWith(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`, "class")}> ${item.name} </a>`)} </nav>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/layout/Navigation.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <!-- Logo --> <div class="flex-shrink-0"> <a href="/" class="flex items-center space-x-2"> <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"> <span class="text-white font-bold text-sm">FNI</span> </div> <span class="text-xl font-semibold text-gray-900">Blog FNI</span> </a> </div> <!-- Navigation --> ${renderComponent($$result, "Navigation", $$Navigation, {})} <!-- Mobile menu button --> <div class="md:hidden"> <button type="button" class="mobile-menu-button text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" aria-label="Abrir menú"> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> <!-- Mobile menu --> <div class="mobile-menu hidden md:hidden bg-white border-t border-gray-200"> <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3"> <a href="/login" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
Login
</a> </div> </div> </header> ${renderScript($$result, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/layout/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-gray-200" style="background-color: #7e84f2e8;"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="py-8"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <!-- SOCES INFO --> <div class="col-span-1 md:col-span-1"> <div class="flex items-center space-x-2 mb-4"> <div class="w-auto h-15 bg-blue-600 rounded-lg flex items-center justify-center px-2 space-x-2"> <!-- Logo pequeño --> <img src="/src/Image/OSCE.png" alt="Logo OSCE" class="h-15 w-15"> <!-- Texto --> <span class="text-white font-bold text-sm">OSCE FNI</span> </div> <span class="text-xl font-semibold text-black">Mi App</span> </div> <p class="text-black text-sm max-w-md">
Una aplicación moderna construida con el fin de informar e innovar tecnológicamente;
            siendo útil para todos nuestros usuarios, agradecemos tu visita, vuelve pronto.
</p> </div> <!-- Links OSCE --> <div> <h3 class="text-sm font-medium text-black mb-4">Enlaces de OSCE-FNI</h3> <ul class="space-y-2 text-sm"> <li> <a href="https://www.facebook.com/profile.php?id=100095466616159" class="text-black hover:text-gray-100 transition-colors">Facebook OSCE</a> </li> <li> <a href="/about" class="text-black hover:text-gray-100 transition-colors">WhatsApp</a> </li> </ul> </div> <!-- LINKS SOCES --> <div> <h3 class="text-sm font-medium text-black mb-4">Enlaces SOCES F.N.I.</h3> <ul class="space-y-2 text-sm"> <li> <a href="https://www.facebook.com/profile.php?id=100084975262112" class="text-black hover:text-gray-100 transition-colors"> So.C.E. Ing. Minas</a> </li> <li> <a href="https://www.facebook.com/profile.php?id=100064133890313" class="text-black hover:text-gray-100 transition-colors"> So.C.E. Ing. Civil</a> </li> <li> <a href="/privacy" class="text-black hover:text-gray-100 transition-colors">So.C.E. Ing. de Metalúrgia y Materiales</a> </li> <li> <a href="/terms" class="text-black hover:text-gray-100 transition-colors">So.C.E. Ing. Mecánica Electromecanica Mecatrónica</a> </li> <li> <a href="https://www.facebook.com/SCEIEIE" class="text-black hover:text-gray-100 transition-colors"> So.C.E. Ing. Eléctrica</a> </li> <li> <a href="https://www.facebook.com/profile.php?id=100063854836205" class="text-black hover:text-gray-100 transition-colors">So.C.E. Ing. Química</a> </li> </ul> </div> <div> <h3 class="text-sm font-medium text-black mb-4">Enlaces SOCES F.N.I.</h3> <ul class="space-y-2 text-sm"> <li> <a href="/privacy" class="text-black hover:text-gray-100 transition-colors">So.C.E. Ing. Geológica</a> </li> <li> <a href="https://www.facebook.com/SOCIEISII" class="text-black hover:text-gray-100 transition-colors">So.C.E. Ing. Sistemas e Ing. Informática</a> </li> <li> <a href="https://www.facebook.com/sceiifni" class="text-black hover:text-gray-100 transition-colors"> So.C.E. Ing. Industrial</a> </li> <li> <a href="https://www.facebook.com/profile.php?id=61552938491684" class="text-black hover:text-gray-100 transition-colors">So.C.E. Departamento de Física</a> </li> <li> <a href="/terms" class="text-black hover:text-gray-100 transition-colors">So.C.E. Departamento de Química</a> </li> </ul> </div> </div> <div class="mt-8 pt-8 border-t border-white/30"> <p class="text-center text-sm text-black">
© <span id="year"></span> OSCE - F.N.I. Todos los derechos reservados.
</p> </div> </div> </div> </footer>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/layout/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Mi App Astro",
    description = "Una aplicaci\xF3n moderna construida con Astro",
    image = "/og-image.jpg",
    canonicalURL = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site).toString() : Astro2.url.pathname
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gray-50 min-h-screen flex flex-col font-sans antialiased"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
