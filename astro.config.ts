import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import { rendererRich, transformerTwoslash } from "shikiji-twoslash";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://andrewleedham.me",
  integrations: [mdx(), sitemap(), react()],
  image: {
    service: passthroughImageService()
  },
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
      transformers: [transformerTwoslash({
        renderer: rendererRich()
      })]
    }
  },
});