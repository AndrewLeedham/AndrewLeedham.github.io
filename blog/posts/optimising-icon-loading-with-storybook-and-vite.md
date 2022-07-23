---
title: How I optimised icon loading in Storybook and Vite
description: A look into a recent project to reduce load times and optimise icon loading in Storybook using @storybook/builder-vite.
date: 2022-07-23
tags:
  - web
  - javascript
  - storybook
  - vite
layout: layouts/post.njk
---

## The Problem

The project I achieved these optimisations with is unfortunately closed source. For the purposes of this blog post it is a React based component library using Vite as the Storybook builder. The icons are each their own React components along the lines of:

<div style='display: none'>

```twoslash include main
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
// - iconbase
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
// - lightbulb
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
// - useicon
```

</div>

```tsx twoslash
// @include: main-lightbulb
```

All of the 200+ icons are then re-exported from a single index file like so:

```typescript
// @filename: index.tsx
export { default as LightBulbIcon } from "./icons/LightBulb";
// ...
```

I am aware there are better ways of doing icons in React land, this project is a little special in that React is never run on the client, but that is besided the point. The problem here is with the way React works in a dev environment, it does not do bundling on source code, it does a HTTP request for every import and runs esbuild on each file for TypeScript and JSX. This means that if we use a single icon from the index file it makes 200+ HTTP requests, which as you can imagine is a lot of overhead and very slow. So I started looking for solutions.

## Initial findings

The first place I looked was the Vite docs, as I find them to be a great example of documentation and very easy to read. I quickly came across ["Dependency Pre-Bundling"](https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling) which sounded like exactly what I need. It even speaks about the exact issue I am having <quote>Some packages ship their ES modules builds as many separate files importing one another.</quote>. So I started messing around with the `optimizeDeps` option, trying to get it to bundle my index file. This proved difficult, I could not get it to bundle the file no matter how I formatted the paths. It then occured to me that all the docs on this subject are talking about `node_modules` or linked dependencies. So I did the next logical step and setup an alias to trick Vite into thinking it was a `node_module`, this still didn't seem to work, I can only assume Vite is very aware what is source code and what isn't. So I had to come up with something else.

## A three pronged approach

After getting on with some other work, I thought about how I might solve this issue in the background. I eventually settled on a three pronged attack on icons across the board.

1. Components that consume icons as a one off can simple import the raw file, not the index. This means it will only load what it needs for each of these components.
2. For stories that have a control for the currently shown icon, we will dynamically import each of the icons, so they aren't requested until selected. This was suprisingly simple with Vite's `import.meta.glob` API and the `React.lazy` API. It looks something like this:

```tsx twoslash
// @include: main-useicon
```

This gives us a hook that returns a lazy component or undefined given an icon name. We can then use it in our stories file:

```tsx twoslash
// @include: main
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
