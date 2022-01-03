---
title: The lesser-known ^? comment
description: A look at a special comment character from a library called twoslash and what it does.
date: 2021-12-31
tags:
  - typescript
layout: layouts/post.njk
---

Have you ever seen the `// ^?` in some code and wondered what it does. I have started using it when sharing TypeScript Playroom snippets, so thought I would write up a quick explainer. It is a special piece of syntax introduced by the [twoslash library](https://www.npmjs.com/package/@typescript/twoslash): a library maintained by the TypeScript team to introduce special markup to the TypeScript website.

As part of my job I am often asked for help on TypeScript related issues (I am not a TypeScript expert, just the one that introduced it to our team), e.g how to improve or fix types for a specific function, and I am often sent snippets of code that are not working. TypeScript is not easy to reason about outside of an actual development environment, so I often lean on the excellent [TypeScript Playroom](https://www.typescriptlang.org/play). Recently when sharing links to code in the Playroom, I have started including `// ^?` comments.

So what does `// ^?` do. Simply put it shows the evaluated type of the statement the up arrow/caret (`^`) is pointing at inline with the comment. This doesn't particularly uncover any hidden information, as the same data can be viewed when hovering over said variable. This comment shows how other types may affect a single type without having to keep hovering. Furthermore, you can point out the exact type you are trying to fix in the Playground when sending links at a glance.

Since twoslash is an open-source library it can be used outside of the TypeScript Playground. [Orta Therox](https://orta.io/) has created an excellent set of libraries under the name [shiki twoslash](https://shikijs.github.io/twoslash/), [shiki](https://github.com/shikijs/shiki) being VSCode's syntax highlighter. Outside of the charming aesthetic shiki twoslash integrates with a bunch of tools used for turning markdown into HTML, creating code snippets that are not only highlighted and support the twoslash syntax but also shows TypeScript types on hover. I have recently set up the 11ty plugin for shiki twoslash on this very site, take a look at it in action below:

```typescript twoslash
const inferred = { data: 'value' };
//    ^?
```