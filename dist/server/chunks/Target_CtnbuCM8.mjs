import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_Dm1lobmq.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$Target = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Target;
  const { name, role, email, phone, photo, facebook, linkedin } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-[300px] h-[400px] perspective cursor-pointer" data-astro-cid-3bzgo3gy> <div class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180" data-astro-cid-3bzgo3gy> <!-- Frente --> <div class="absolute w-full h-full backface-hidden bg-[#B0D9D5] rounded-xl shadow-lg p-4 flex flex-col items-center justify-center" data-astro-cid-3bzgo3gy> <img${addAttribute(photo, "src")} class="w-50 h-50 rounded-full mb-4" data-astro-cid-3bzgo3gy> <h2 class="text-xl font-bold" data-astro-cid-3bzgo3gy>${name}</h2> <p class="text-sm text-gray-500" data-astro-cid-3bzgo3gy>${role}</p> </div> <!-- Reverso --> <div class="absolute w-full h-full backface-hidden bg-[#023059] text-white rounded-xl shadow-lg p-4 transform rotate-y-180 flex flex-col justify-center items-center" data-astro-cid-3bzgo3gy> <p class="mb-2" data-astro-cid-3bzgo3gy>✉️ ${email}</p> <p class="mb-2" data-astro-cid-3bzgo3gy>📞 ${phone}</p> <div class="flex space-x-4 mt-4" data-astro-cid-3bzgo3gy> <a${addAttribute(facebook, "href")} data-astro-cid-3bzgo3gy><img src="/facebook.svg" class="w-6 h-6" data-astro-cid-3bzgo3gy></a> <a${addAttribute(linkedin, "href")} data-astro-cid-3bzgo3gy><img src="/linkedin.svg" class="w-6 h-6" data-astro-cid-3bzgo3gy></a> </div> </div> </div> </div> `;
}, "/Users/rodrigoesprella/Documents/FNI/UniversityBlog/src/components/ui/Target.astro", void 0);

export { $$Target as $ };
