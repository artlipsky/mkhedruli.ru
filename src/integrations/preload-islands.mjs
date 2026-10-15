import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const EAGER_ISLAND = /<astro-island\b[^>]*\bclient="load"[^>]*>/g;
const MODULE_URL = /\b(?:component|renderer)-url="([^"]+)"/g;
const STATIC_IMPORT = /\b(?:from|import)"(\.\/[^"]+)"/g;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));
}

async function collectModules(dist, url, seen) {
  if (seen.has(url)) return;
  seen.add(url);
  const code = await readFile(join(dist, url), "utf8");
  for (const [, specifier] of code.matchAll(STATIC_IMPORT)) {
    await collectModules(dist, posix.join(posix.dirname(url), specifier), seen);
  }
}

export default function preloadIslands() {
  return {
    name: "preload-islands",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const dist = fileURLToPath(dir);
        for (const file of await htmlFiles(dist)) {
          const html = await readFile(file, "utf8");
          const modules = new Set();
          for (const island of html.match(EAGER_ISLAND) ?? []) {
            for (const [, url] of island.matchAll(MODULE_URL)) {
              await collectModules(dist, url, modules);
            }
          }
          if (modules.size === 0) continue;
          const links = [...modules].map((url) => `<link rel="modulepreload" href="${url}">`).join("");
          await writeFile(file, html.replace("</head>", `${links}</head>`));
        }
      },
    },
  };
}
