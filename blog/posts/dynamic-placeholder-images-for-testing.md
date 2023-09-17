---
title: Dynamic Placeholder Images for Testing
tags:
  - javascript
  - web
  - testing
  - typescript
layout: layouts/post.njk
description: An approach for generating dynamic placeholder images for visual regression testing.
date: 2023-09-17
---

<p style="color: var(--text-subtle)">I have now released this concept as its own <a href="https://www.npmjs.com/package/placeholder-image-data-url-svg">npm package</a>.</p>

Placeholder images are crucial when building out design systems. Whether it is a card, a hero or just an image component you will need actual images to use while developing. I have typically seen 2 approaches for this in the wild: a folder full of images of various sizes that are referenced directly, or using a service like https://placehold.co/ where you can just pass an arbitrary size. The former soon bubbles out of control, having various similar aspect ratios and having a mix of colours and fonts depending on who created them. The latter is better as you can manage the images where they are used, and it does not balloon the size of your repo, and all of them are styled the same. However, placeholder services aren't perfect as for one they can be paid services or like placeholder.com might be bought out, and additionally they require a network request, which for visual regression specifically is one more thing to wait for before a screenshot can be taken.

So, is there a better way. I came up with a solution that somewhat mimics the placeholder services but dynamically generates the image locally. You may be thinking this is akin to hosting a placeholder service in a local docker image, but it is much simpler than that. It uses the `data:` format which can be used inline in an images src in both HTML and CSS. So, how does it work? Well it is a simple case of generating an SVG and inlining it with `image/svg+xml`. We can do a bit of optimisation to stop the length getting out of control. Before we get into the implementation it is worth noting that this is written in JavaScript, meaning you would need to be using a component library of some-sort that renders your components HTML via JavaScript, and similarly CSS-in-JS or a pre-processor for CSS.

Below is a simplified implementation with inline comments, you can [see a live demo of it in use here](https://stackblitz.com/edit/stackblitz-starters-bjrx9u?file=src%2FplaceholderImage.ts).

```typescript twoslash
/**
 * Generates a placholder image as an inline image data string.
 *
 * @param width - Width of the placeholder image.
 * @param height - Height of the placeholder image.
 * @param colour - The background colour of the image.
 * @returns Image data string.
 */
export function placeholderImage(
  width: number,
  height: number,
  colour: string
): string {
  // Generate the viewbox size, this is an aspect ratio where the larger
  // dimension is 100.
  const viewboxWidth = Math.min(100, (width / height) * 100);
  const viewboxHeight = Math.min(100, (height / width) * 100);
  // You could use something like https://polished.js.org/docs/#readablecolor here
  // to generate an appropriate colour from the background colour. But for
  // simplicity we are just using black.
  const textColor = "#000";
  // Here is the meat and potatoes, we create an appropriately sized svg with a
  // full size rectangle in the provided colour and some text centered in the
  // middle.
  let svg = `<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 ${viewboxWidth} ${viewboxHeight}"
              width="${width}"
              height="${height}">
              <style>*{font:400 16px sans-serif;}</style>
              <rect width="100%" height="100%" fill="${colour}" />
                <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="${textColor}">
              ${width}x${height}
              </text>
            </svg>`;
  // You could probably remove the spacing above, or even use a library to minify
  // the html. But you want the svg code to be a single line, so I have done a
  // very simple remapping below.
  svg = svg
    .split("\n")
    .map((line) => line.trim())
    .join(" ");
  const base64 = btoa(svg);
  const utf8 = encodeURIComponent(svg);
  // This is the extra optimisation I eluded to. Essentially we compare the full
  // text length (encoded) to the base64 representation and use the smaller
  // version.
  const unicode = !base64 || utf8.length < base64.length;
  // Finally we return the data string with the relevant encoding.
  return `data:image/svg+xml;${unicode ? "utf8," + utf8 : "base64," + base64}`;
}
```
