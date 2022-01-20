---
title: Invariant what is it?
description: Looking at what invariant means in the context of Computer Science and why it is useful.
date: 2022-01-20
tags:
  - typescript
layout: layouts/post.njk
---
Invariant comes from the maths definition which is some property that is guaranteed to not change. The common example being the rotation of a triangle: you can say that the triangles side lengths are invariant.

In computer science invariant means the same but in a specific context. It is a condition of a program that during some period of execution is guaranteed not to change.

So why is invariant useful and how does it relate to TypeScript. There are a few libraries that essentially do the same thing:
- https://github.com/alexreardon/tiny-invariant
- https://github.com/zertosh/invariant

They either do nothing if a truthy value is passed or throw an error if a falsy value is passed. I think of it like an asset function, because invariant is not really in my common vocabularly.

TypeScript comes in to play by providing type narrowing. For example:
```typescript twoslash
import invariant from 'tiny-invariant';

function fn(argument: string | null) {
    invariant(argument);
    console.log(argument);
    //          ^?
}
```