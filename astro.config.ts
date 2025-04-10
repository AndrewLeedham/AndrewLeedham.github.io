import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import { transformerTwoslash } from "@shikijs/twoslash";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://andrewleedham.me",
  integrations: [mdx(), sitemap(), react()],
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
      transformers: [
        transformerTwoslash({
          rendererRich: {
            jsdoc: false,
          },
          explicitTrigger: true,
        }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
