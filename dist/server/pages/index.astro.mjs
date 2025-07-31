import { e as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, f as createAstro, k as renderComponent } from '../chunks/astro/server_Dm1lobmq.mjs';
import { $ as $$Layout } from '../chunks/Layout_k1M6EtkV.mjs';
import { $ as $$Button } from '../chunks/Button_C5upKd9-.mjs';
import { $ as $$Target } from '../chunks/Target_CtnbuCM8.mjs';
export { renderers } from '../renderers.mjs';

const _5003923838471352061 = new Proxy({"src":"/_astro/5003923838471352061.CZMILKTo.jpg","width":1280,"height":960,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352061.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352061
}, Symbol.toStringTag, { value: 'Module' }));

const _5003923838471352063 = new Proxy({"src":"/_astro/5003923838471352063.BmFK3d2_.jpg","width":1280,"height":720,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352063.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352063
}, Symbol.toStringTag, { value: 'Module' }));

const _5003923838471352066 = new Proxy({"src":"/_astro/5003923838471352066.fELOtigM.jpg","width":1280,"height":720,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352066.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352066
}, Symbol.toStringTag, { value: 'Module' }));

const _5003923838471352067 = new Proxy({"src":"/_astro/5003923838471352067.BbkiU3mm.jpg","width":1280,"height":720,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352067.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352067
}, Symbol.toStringTag, { value: 'Module' }));

const _5003923838471352074 = new Proxy({"src":"/_astro/5003923838471352074.BGijw8eK.jpg","width":1280,"height":576,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352074.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352074
}, Symbol.toStringTag, { value: 'Module' }));

const _5003923838471352076 = new Proxy({"src":"/_astro/5003923838471352076.C-oeMfGr.jpg","width":1280,"height":960,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/Image/FilArt/5003923838471352076.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _5003923838471352076
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Carousel = createComponent(($$result, $$props, $$slots) => {
  const modules = /* #__PURE__ */ Object.assign({"../../Image/FilArt/5003923838471352061.jpg": __vite_glob_0_0,"../../Image/FilArt/5003923838471352063.jpg": __vite_glob_0_1,"../../Image/FilArt/5003923838471352066.jpg": __vite_glob_0_2,"../../Image/FilArt/5003923838471352067.jpg": __vite_glob_0_3,"../../Image/FilArt/5003923838471352074.jpg": __vite_glob_0_4,"../../Image/FilArt/5003923838471352076.jpg": __vite_glob_0_5});
  const images = Object.values(modules).map((mod) => {
    if (typeof mod === "string") return { src: mod };
    if (mod && typeof mod === "object" && "default" in mod) return mod.default;
    if (mod && typeof mod === "object" && "src" in mod) return mod;
    return null;
  }).filter(Boolean);
  return renderTemplate(_a || (_a = __template(["", '<div class="w-full max-w-[700px] overflow-hidden rounded-xl shadow-lg mx-auto bg-white"> <div id="carousel" class="flex transition-transform duration-1000 ease-in-out"> ', " </div> </div> <script>\n  document.addEventListener('DOMContentLoaded', () => {\n    const carousel = document.getElementById('carousel');\n    if (!carousel) return;\n\n    const slides = carousel.children.length;\n    let index = 0;\n\n    function showSlide(i) {\n      const slideWidth = carousel.parentElement.clientWidth;\n      carousel.style.transform = `translateX(-${i * slideWidth}px)`;\n    }\n\n    function nextSlide() {\n      index = (index + 1) % slides;\n      showSlide(index);\n    }\n\n    // Mostrar la primera slide\n    showSlide(index);\n\n    // Cambio cada 5 segundos\n    setInterval(nextSlide, 5000);\n  });\n<\/script>"], ["", '<div class="w-full max-w-[700px] overflow-hidden rounded-xl shadow-lg mx-auto bg-white"> <div id="carousel" class="flex transition-transform duration-1000 ease-in-out"> ', " </div> </div> <script>\n  document.addEventListener('DOMContentLoaded', () => {\n    const carousel = document.getElementById('carousel');\n    if (!carousel) return;\n\n    const slides = carousel.children.length;\n    let index = 0;\n\n    function showSlide(i) {\n      const slideWidth = carousel.parentElement.clientWidth;\n      carousel.style.transform = \\`translateX(-\\${i * slideWidth}px)\\`;\n    }\n\n    function nextSlide() {\n      index = (index + 1) % slides;\n      showSlide(index);\n    }\n\n    // Mostrar la primera slide\n    showSlide(index);\n\n    // Cambio cada 5 segundos\n    setInterval(nextSlide, 5000);\n  });\n<\/script>"])), maybeRenderHead(), images.map((img, i) => renderTemplate`<div class="w-full flex-shrink-0 rounded-xl p-2 box-border  "> <img${addAttribute(img.src, "src")}${addAttribute(`Imagen ${i + 1}`, "alt")} class="w-full h-[300px] object-contain rounded-xl  "> </div>`));
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Carousel.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inicio - Mi App Astro", "description": "Bienvenido a mi aplicaci\xF3n construida con Astro y las mejores pr\xE1cticas de desarrollo web" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-r from-blue-200 to-indigo-50 py-20"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <div class="flex justify-between items-center "> <!-- Logo Izquierdo --> <img src="/src/Image/FNI.png" alt="Logo izquierdo" class="w-30 h-auto"> <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
Bienvenido a las <br> <span style="color:#023059">Sociedades Científicas de la F.N.I.</span> </h1> <!-- Logo derecho --> <img src="/src/Image/OSCE.png" alt="Logo derecho" class="w-50 h-auto"> </div> <div class="flex gap-6 items-center py-5"> <div class="w-3/5 flex-none"> <p class="text-xl text-gray-600 text-justify px-4">
Las sociedades científicas contribuyen al desarrollo estudiantil y al desarrollo profesional
              forjando jóvenes con ganas de aprender y que tengan la valentía de sobresalir entre todos los demás.
<br><br>Por ello, la Facultad Nacional de Ingeniería de la Universidad Técnica de Oruro comprende con 11 
              sociedades científicas actualmente, las cuales son representadas por la Organización de Sociedades Científicas de Estudiantes de la F.N.I. (OSCE-FNI)
</p> </div> <div class="w-2/5 flex-none "> ${renderComponent($$result2, "Carousel", $$Carousel, {})} </div> </div> <div class="flex flex-col sm:flex-row gap-4 justify-center"> ${renderComponent($$result2, "Button", $$Button, { "href": "/about", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate` Conocer más ` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/blog", "variant": "secondary", "size": "lg" }, { "default": ($$result3) => renderTemplate` Ver blog ` })} </div> </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-gray-900 mb-4">Historia</h2> <p class="text-gray-600 max-w-2xl mx-auto">
Construida con tecnologías modernas y siguiendo las mejores prácticas
</p> </div> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestras Autoridades</h2> <div class="flex flex-wrap justify-center gap-6"> ${renderComponent($$result2, "FlipCard", $$Target, { "name": "M.Sc. Ing. Pedro Rom\xE1n Vallejos Mamani", "role": "Director de la Direcci\xF3n de Investigaci\xF3n Cient\xEDfica y Tecnol\xF3fica U.T.O. (DICyT)", "email": "", "phone": "+591 72462547", "photo": "src/Image/Im_Inicio/Dicyt.jpg", "facebook": "", "linkedin": "" })} ${renderComponent($$result2, "FlipCard", $$Target, { "name": "M.Sc. Ing. Ramiro Franz Aliendre Garc\xEDa", "role": "Decano de la Facultad Nacional de Ingenier\xEDa", "email": "", "phone": "", "photo": "src/Image/Im_Inicio/Decano.jpg", "facebook": "", "linkedin": "" })} ${renderComponent($$result2, "FlipCard", $$Target, { "name": "M.Sc. Ing. Miguel Alejandro Ru\xEDz", "role": "Vicedecano de la Facultad Nacional de Ingenier\xEDa", "email": "", "phone": "", "photo": "src/Image/Im_Inicio/Vicedecano.jpg", "facebook": "", "linkedin": "" })} ${renderComponent($$result2, "FlipCard", $$Target, { "name": "Ph.D. Ing. Amilkar Ernesto Ilaya Ayza", "role": "Director de Direcci\xF3n de Postgradi e Investigaci\xF3n Cient\xEDfica F.N.I. (DPIC - FNI)", "email": "", "phone": "", "photo": "src/Image/Im_Inicio/", "facebook": "", "linkedin": "" })} ${renderComponent($$result2, "FlipCard", $$Target, { "name": "Univ. Rodrigo Ledezma", "role": "Presidente de la Organizaci\xF3n de Sociedades Cient\xEDficas de la F.N.I. (O.S.C.E. - FNI)", "email": "", "phone": "+591 71857038", "photo": "src/Image/Im_Inicio/Osce.jpg", "facebook": "", "linkedin": "" })} </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center p-6"> <div class="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center"> <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-2">Rápido</h3> <p class="text-gray-600">Optimizado para rendimiento con Astro</p> </div> <div class="text-center p-6"> <div class="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center"> <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-2">Confiable</h3> <p class="text-gray-600">Construido con las mejores prácticas</p> </div> <div class="text-center p-6"> <div class="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center"> <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-2">Accesible</h3> <p class="text-gray-600">Diseñado para todos los usuarios</p> </div> </div> </div> </section> ` })}`;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/index.astro", void 0);

const $$file = "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
