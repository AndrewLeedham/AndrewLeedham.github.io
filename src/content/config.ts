import { defineCollection, z } from "astro:content";
import { iconNames } from "../../icons";
import { readableColor } from "polished";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      icon: z.enum(iconNames).optional().default("alert-octagon"),
      bgColor: z.string().optional(),
      fgColor: z.string().optional(),
    })
    .transform((arg) => {
      const bgColor = "#41EAD4";
      return {
        ...arg,
        bgColor,
        fgColor: readableColor(bgColor, "#fff", "#000"),
      };
    }),
});

export const collections = { blog };
