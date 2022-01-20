---
title: Invariant what is it?
description: Looking at what invariant means in the context of Computer Science and why it is useful.
date: 2022-01-20
tags:
  - typescript
layout: layouts/post.njk
---
Invariant comes from mathematics which defines it as a property that is guaranteed not to change. The common example being the rotation of a triangle: you can say that the triangle's side lengths are invariant.

In computer science, invariant means the same but in a specific context. It is a condition of a program that during some period of execution is guaranteed not to change.

So why is invariant useful and how does it relate to TypeScript. There are a few libraries that essentially do the same thing:
- https://github.com/alexreardon/tiny-invariant
- https://github.com/zertosh/invariant

They do nothing if a truthy value is passed or throw an error if a falsy value is passed. I think of it like an assert function, because invariant is not in my general vocabulary.

TypeScript comes into play by providing type narrowing. For example:
```typescript twoslash
import invariant from 'tiny-invariant';

function fn(argument: string | null) {
    invariant(argument);
    console.log(argument);
    //          ^?
}
```
As you can see `argument` is of type `string` instead of `string | null`, because TypeScript knows invariant will throw if `argument` is falsy, it can rule out `null`.

A great use case for this is checking for required parameters in a context where you cannot guarantee their values, like user input. [Remix make use of tiny-invariant](https://remix.run/docs/en/v1/tutorials/blog#:~:text=npm%20add%20tiny%2Dinvariant) Remix make use of tiny-invariant in their examples for this very purpose (which is where I first learned about the concept).

To see how invariant actually works we can implement it ourselves:
```typescript twoslash
function invariant(value: any): asserts value  {
  if (value) {
    return;
  }

  throw new Error(`${value} is falsy`);
}

function fn(argument: string | null) {
    invariant(argument);
    console.log(argument);
    //          ^?
}
```
This uses a new keyword added to [TypeScript 3.7 `asserts`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) which determines that `argument` must be true if it returns. Otherwise, the function will throw an error which is what we want here!