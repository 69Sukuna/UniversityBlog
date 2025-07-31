import { a as clearSessionCookie } from '../../../../chunks/session_DmsVjKaO.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ redirect }) => {
  const clearCookie = clearSessionCookie();
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login?message=Sesión cerrada correctamente",
      "Set-Cookie": clearCookie
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
