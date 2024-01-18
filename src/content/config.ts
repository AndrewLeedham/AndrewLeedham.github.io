import { defineCollection, z } from "astro:content";
import { iconNames } from "../../icons";
import { readableColor } from "polished";

const colours = [
  "#000745",
  "#00144F",
  "#002459",
  "#003863",
  "#004E6D",
  "#006677",
  "#008080",
  "#22937D",
  "#44A580",
  "#66B788",
  "#88C895",
  "#AAD8AA",
  "#CDE8CC",
];

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
      const bgColor = arg.bgColor ?? colours[arg.pubDate.getMonth()];
      return {
        ...arg,
        bgColor,
        fgColor: readableColor(bgColor, "#fff", "#000"),
      };
    }),
});

export const collections = { blog };
