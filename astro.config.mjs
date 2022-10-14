import path, { dirname } from "path";
import { fileURLToPath } from "url";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import NetlifyCMS from "astro-netlify-cms";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // root: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // outDir: './dist',       // When running `astro build`, path to final static output
  // publicDir: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.

  site: "https://www.ranihorev.com", // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  server: {
    // port: 3000,         // The port to run the dev server on.
  },
  integrations: [
    mdx(),
    NetlifyCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "main",
        },
        collections: [
          {
            name: "posts",
            label: "Blog Posts",
            folder: "src/pages/blog",
            create: true,
            delete: true,
            fields: [
              { name: "layout", widget: "string", label: "Layout", default: "$/layouts/post.astro" },
              { name: "title", widget: "string", label: "Title" },
              { name: "description", widget: "string", label: "Description", required: false },
              { name: "date", widget: "datetime", label: "Date" },
              { name: "tags", widget: "list", label: "Tags", required: false, allow_add: true },
              { name: "body", widget: "markdown", label: "Body" },
            ],
          },
        ],
      },
    }),
    svelte(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [],
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      allowNodeBuiltins: true,
    },
  },
});
