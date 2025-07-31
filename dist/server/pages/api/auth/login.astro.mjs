import { A as AuthService } from '../../../chunks/auth_CGGBIuWf.mjs';
import { c as createSessionCookie } from '../../../chunks/session_DmsVjKaO.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const userName = formData.get("userName")?.toString();
    const password = formData.get("password")?.toString();
    if (!userName || !password) {
      return redirect("/login?error=required");
    }
    const user = await AuthService.validateUser({ userName, password });
    if (!user) {
      return redirect("/login?error=invalid");
    }
    const sessionCookie = createSessionCookie(user);
    const redirectUrl = user.role === "admin" ? "/admin" : "/dashboard";
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
        "Set-Cookie": sessionCookie
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return redirect("/login?error=server");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
