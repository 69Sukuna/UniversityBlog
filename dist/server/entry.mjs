import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C-hFDfdj.mjs';
import { manifest } from './manifest_CewPzElE.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/news/create.astro.mjs');
const _page3 = () => import('./pages/admin/news/_id_/edit.astro.mjs');
const _page4 = () => import('./pages/admin/news.astro.mjs');
const _page5 = () => import('./pages/admin/users/create.astro.mjs');
const _page6 = () => import('./pages/admin/users/_id_/edit.astro.mjs');
const _page7 = () => import('./pages/admin/users.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/api/admin/users/create.astro.mjs');
const _page10 = () => import('./pages/api/admin/users/delete.astro.mjs');
const _page11 = () => import('./pages/api/admin/users/update.astro.mjs');
const _page12 = () => import('./pages/api/auth/login.astro.mjs');
const _page13 = () => import('./pages/api/auth/logout.astro.mjs');
const _page14 = () => import('./pages/api/news/create.astro.mjs');
const _page15 = () => import('./pages/api/news/delete.astro.mjs');
const _page16 = () => import('./pages/api/news/update.astro.mjs');
const _page17 = () => import('./pages/api/posts.json.astro.mjs');
const _page18 = () => import('./pages/blog/_slug_.astro.mjs');
const _page19 = () => import('./pages/blog.astro.mjs');
const _page20 = () => import('./pages/blog/_---page_.astro.mjs');
const _page21 = () => import('./pages/dashboard/api/auth/login.astro.mjs');
const _page22 = () => import('./pages/dashboard/api/auth/logout.astro.mjs');
const _page23 = () => import('./pages/dashboard/api/news/create.astro.mjs');
const _page24 = () => import('./pages/dashboard/api/news/delete.astro.mjs');
const _page25 = () => import('./pages/dashboard/api/news/update.astro.mjs');
const _page26 = () => import('./pages/dashboard/api/posts.json.astro.mjs');
const _page27 = () => import('./pages/dashboard/news/create.astro.mjs');
const _page28 = () => import('./pages/dashboard/news/_id_/edit.astro.mjs');
const _page29 = () => import('./pages/dashboard/news.astro.mjs');
const _page30 = () => import('./pages/dashboard.astro.mjs');
const _page31 = () => import('./pages/login.astro.mjs');
const _page32 = () => import('./pages/sociedades/sisinf.astro.mjs');
const _page33 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.1_@types+node@22.15.29_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/news/create.astro", _page2],
    ["src/pages/admin/news/[id]/edit.astro", _page3],
    ["src/pages/admin/news/index.astro", _page4],
    ["src/pages/admin/users/create.astro", _page5],
    ["src/pages/admin/users/[id]/edit.astro", _page6],
    ["src/pages/admin/users/index.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/api/admin/users/create.ts", _page9],
    ["src/pages/api/admin/users/delete.ts", _page10],
    ["src/pages/api/admin/users/update.ts", _page11],
    ["src/pages/api/auth/login.ts", _page12],
    ["src/pages/api/auth/logout.ts", _page13],
    ["src/pages/api/news/create.ts", _page14],
    ["src/pages/api/news/delete.ts", _page15],
    ["src/pages/api/news/update.ts", _page16],
    ["src/pages/api/posts.json.ts", _page17],
    ["src/pages/blog/[slug].astro", _page18],
    ["src/pages/blog/index.astro", _page19],
    ["src/pages/blog/[...page].astro", _page20],
    ["src/pages/dashboard/api/auth/login.ts", _page21],
    ["src/pages/dashboard/api/auth/logout.ts", _page22],
    ["src/pages/dashboard/api/news/create.ts", _page23],
    ["src/pages/dashboard/api/news/delete.ts", _page24],
    ["src/pages/dashboard/api/news/update.ts", _page25],
    ["src/pages/dashboard/api/posts.json.ts", _page26],
    ["src/pages/dashboard/news/create.astro", _page27],
    ["src/pages/dashboard/news/[id]/edit.astro", _page28],
    ["src/pages/dashboard/news/index.astro", _page29],
    ["src/pages/dashboard/index.astro", _page30],
    ["src/pages/login.astro", _page31],
    ["src/pages/sociedades/SISinf.astro", _page32],
    ["src/pages/index.astro", _page33]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/rodrigoesprella/Documents/FNI/UniversityBlog/dist/client/",
    "server": "file:///Users/rodrigoesprella/Documents/FNI/UniversityBlog/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
