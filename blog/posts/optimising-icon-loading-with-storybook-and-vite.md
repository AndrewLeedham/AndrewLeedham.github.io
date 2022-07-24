---
title: How I optimised icon loading in Storybook and Vite
description: A look into a recent project to reduce load times and optimise icon loading in Storybook using @storybook/builder-vite.
date: 2022-07-24
tags:
  - web
  - javascript
  - storybook
  - vite
  - optimisation
layout: layouts/post.njk
---

## The Problem

For the purposes of this blog post the Storybook in question is a React based component library using Vite as the Storybook builder. It is unfortunately closed source, but I will provide some working code based on it in this blog post. The icons are each their own React components along the lines of:

<div style='display: none'>

```twoslash include iconbase
// @filename: IconBase.tsx
import React from "react";
export type IconProps = Omit<JSX.IntrinsicElements["svg"], 'ref'>;

export default function IconBase(props: IconProps) {
  const { children, ...rest } = props;
  return (
    <svg viewBox="..." width=".." height=".." {...props}>
      {children}
    </svg>
  );
}
```

```twoslash include lightbulb
// @filename: IconBase.tsx
import React from "react";
export type IconProps = Omit<JSX.IntrinsicElements["svg"], 'ref'>;

export default function IconBase(props: IconProps) {
  const { children, ...rest } = props;
  return (
    <svg viewBox="..." width=".." height=".." {...props}>
      {children}
    </svg>
  );
}
// ---cut---
// @filename: icons/LightBulb.tsx
import React from "react";
import IconBase, { IconProps } from "../IconBase";

export default function LightBulbIcon(props: IconProps) {
  return (
    <IconBase>
      <path d="..."></path>
    </IconBase>
  );
}
```

```twoslash include useicon
// @filename: IconBase.tsx
import React from "react";
export type IconProps = Omit<JSX.IntrinsicElements["svg"], 'ref'>;

export default function IconBase(props: IconProps) {
  const { children, ...rest } = props;
  return (
    <svg viewBox="..." width=".." height=".." {...props}>
      {children}
    </svg>
  );
}
// @filename: useIcon.tsx
/// <reference types="vite/client" />
function getIconPathFromName(iconName: string): string {
  return iconName;
}
// ---cut---
import React from "React";
import IconBase from "./IconBase";

const icons = import.meta.glob<{ default: typeof IconBase }>("./icons/*.tsx");

export default function useIcon(
  iconName: string | undefined
): React.LazyExoticComponent<typeof IconBase> | undefined {
  if (iconName) {
    const iconPath = getIconPathFromName(iconName);
    const iconModule = icons[iconPath];
    if (iconModule) {
      return React.lazy(iconModule);
    }
  }
}

export const iconNames = Object.keys(icons);
```

</div>

```tsx twoslash
// @include: lightbulb
```

All of the 200+ icons are then re-exported from a single index file like so:

```typescript
// @filename: index.tsx
export { default as LightBulbIcon } from "./icons/LightBulb";
// ...
```

I am aware there are better ways of doing icons in React land, this project is a little special in that React is never run on the client, but that is beside the point. The problem here is with the way Vite works in a dev environment, it does not bundle source code, it does an HTTP request for every import and runs esbuild on each file to compile away TypeScript and JSX. This means that if we use a single icon from the index file it makes 200+ HTTP requests, which as you can imagine is a lot of overhead and very slow. So I started looking for solutions.

## Initial findings

The first place I looked was the Vite docs, as I find them to be a great example of documentation and very easy to read. I quickly came across ["Dependency Pre-Bundling"](https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling) which sounded like exactly what I need. It even speaks about the exact issue I am having "Some packages ship their ES modules builds as many separate files importing one another.". So I started messing around with the `optimizeDeps` option, trying to get it to bundle my index file. This proved difficult, I could not get it to bundle the file no matter how I formatted the paths. It then occurred to me that all the docs on this subject are talking about `node_modules` or linked dependencies. So I did the next logical step and set up an alias to trick Vite into thinking it was a `node_module`, this still didn't seem to work, I can only assume Vite is very aware of what is source code and what isn't. So I had to come up with something else.

## A three-pronged approach

After getting on with some other work, I thought about how I might solve this issue in the background. I eventually settled on a three-pronged attack on icons across the board.

### One: Direct imports

Components that consume icons as a one-off can simply import the raw file, not the index. This means it will only load what it needs for each of these components.

### Two: Lazy-loaded modules

For stories that have a control for the currently shown icon, we will dynamically import each of the icons, so they aren't requested until selected. This was surprisingly simple with Vite's `import.meta.glob` API and the `React.lazy` API. It looks something like this:

```tsx twoslash
// @include: useicon
```

This gives us a hook that returns a lazy component or undefined given an icon name. We can then use it in our stories file:

```tsx twoslash
// @include: useicon
// ---cut---
// @filename: Icon.stories.tsx
import React from "react";
import IconBase, { IconProps } from "./IconBase";
import useIcon, { iconNames } from "./useIcon";
import type { StoryFn, ComponentMeta } from "@storybook/react";

export default {
  title: "Icon",
  component: IconBase,
  argTypes: {
    icon: {
      options: iconNames,
      control: {
        type: "select",
      },
    },
  },
} as ComponentMeta<typeof IconBase>;

const Template: StoryFn<IconProps & { icon?: string }> = (args) => {
  const { icon, ...props } = args;
  const Icon = useIcon(icon);

  if (!Icon) {
    return <></>;
  }

  return <Icon {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  icon: "LightBulbIcon",
};
```

Now when a user selects an icon name from the icon control in the Storybook interface, React will dynamically import the appropriate icon module and render it when it is available. Meaning only the default selected icon is loaded at runtime.

### Three: All Icon Reference

For stories or documentation that show all the icons next to each other for reference, we still have the original issue. Since my previous attempts failed, I decided to go down a level of abstraction and write a plugin (at this point I just wanted things to work). Thankfully, Vite uses a plugin architecture borrowed from Rollup, which I have had a fair amount of experience writing in the past. Furthermore, we know it uses esbuild to transpile source code on the fly, so why not just do that for our index file. Below is roughly what the plugin looks like:

```typescript twoslash
import { Plugin } from "vite";
import { build } from "esbuild";
import * as path from "path";

export default function bundleIconsPlugin(): Plugin {
  let command: string;
  return {
    name: "bundle-icons",
    config(config, { command: _command }) {
      command = _command;
    },
    async load(id: string) {
      // Check we are serving, as this is a development mode optimisation.
      // Also check we are loading the index file.
      if (command === "serve" && id.endsWith("/Icon/index.tsx")) {
        const { outputFiles } = await build({
          entryPoints: [id],
          bundle: true,
          platform: "browser",
          write: false,
          jsx: "preserve",
          absWorkingDir: process.cwd(),
          format: "esm",
          // We also need a custom esbuild plugin because we want to treat everything as
          // external apart from our individual icon files.
          plugins: [
            {
              name: "externals",
              setup(build) {
                build.onResolve({ namespace: "file", filter: /.*/ }, (args) => {
                  if (args.kind === "entry-point") {
                    return null;
                  }
                  // If the file is in our icons folder use standard resolution.
                  if (args.path.startsWith("./icons/")) {
                    return null;
                  } else {
                    // Otherwise flag is external.
                    return {
                      path: path.join(args.resolveDir, args.path),
                      external: true,
                    };
                  }
                });
              },
            },
          ],
        });

        // Make sure we build something.
        if (!outputFiles || outputFiles.length !== 1) {
          return null;
        }

        // Return the bundled file contents.
        return outputFiles[0].text as string;
      }
      return null;
    },
  };
}
```

## Conclusion

And that is it. Three approaches that work in tandem to make Storybook DX so much nicer with large icon sets! I hope this blog post inspired you or solved a problem you were having, either way, thanks for reading.
