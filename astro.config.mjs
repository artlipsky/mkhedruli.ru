import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import preloadIslands from "./src/integrations/preload-islands.mjs";

export default defineConfig({
  site: "https://mkhedruli.ru",
  integrations: [react(), sitemap(), preloadIslands()],
  vite: {
    plugins: [tailwindcss()],
  },
});
