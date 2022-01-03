---
title: You might want Pick not Partial in TypeScript
description: When writing TypeScript you might be better using Pick instead of Partial
date: 2021-09-15
tags:
  - typescript
layout: layouts/post.njk
---

`Partial` is a TypeScript utility-type that transforms all the property value types of an object to be optional. This can be useful when writing tests that only look at certain parts of an object. However, for TypeScript to be happy with passing said semi-populated object to a function, you must use the `as` keyword to force TypeScript to see it as the full object. This is not ideal as you lose a degree of type safety in that your function thinks it has a full object but in fact does not. So, if you update your function to use other properties of the object, you may start getting runtime errors that could have been caught by TypeScript.

One solution I have been experimenting with is moving the process of scoping object parameters. So rather than using `Partial` on the caller side, we can use `Pick` — a TypeScript utility-type that reduces an object type to given properties — on the implementation side. Meaning we are telling TypeScript exactly what properties of a perhaps more complex object we intend to use.

If you have ever written Express middleware or similar, you may have come across this issue recreating req and res. So, if we are trying to test this middleware we only need to create a req and/or res object with the properties we need. Let's look at an example:

```typescript twoslash
/// <reference types="express" />
// ---cut---
// @filename: authenticate.ts
import { NextFunction, Request, Response } from "express";

const staticKey = "f9asdjb28asfdlmx";

export type AuthRequest = Pick<Request, "params" | "headers">;
export type AuthResponse = Pick<Response, "send" | "sendStatus">;

export default async function authenticate(
  req: AuthRequest,
  res: AuthResponse,
  next: NextFunction
) {
  if (req.headers.authorization?.replace("Bearer: ", "") === staticKey) {
    const { name = "user" } = req.params;
    res.send(`Hello ${name}`);
  } else {
    res.sendStatus(403);
  }
}
```

The beauty of using `Pick` above is that we can still pass it a complete req/res object for example when passing it to `app.get` or `app.use` and TypeScript won't complain. Now we can look at the advantage of this approach: we can construct objects with just the properties we need for each test:

```typescript twoslash
/// <reference types="jest" />
/// <reference types="express" />

// @filename: authenticate.ts
import { NextFunction, Request, Response } from "express";

const staticKey = "f9asdjb28asfdlmx";

export type AuthRequest = Pick<Request, "params" | "headers">;
export type AuthResponse = Pick<Response, "send" | "sendStatus">;

export default async function authenticate(
  req: AuthRequest,
  res: AuthResponse,
  next: NextFunction
) {
  if (req.headers.authorization?.replace("Bearer: ", "") === staticKey) {
    const { name = "user" } = req.params;
    res.send(`Hello ${name}`);
  } else {
    res.sendStatus(403);
  }
}
// ---cut---
// @filename: authenticate.test.ts
import authenticate, { AuthResponse } from "./authenticate";

test("unauthorized user", async () => {
  const res: AuthResponse = {
    send: jest.fn(),
    sendStatus: jest.fn(),
  };

  await authenticate(
    {
      params: {},
      headers: {},
    },
    res,
    jest.fn()
  );
  expect(res.sendStatus).toHaveBeenCalledTimes(1);
  expect(res.sendStatus).toHaveBeenCalledWith(403);
});
```

You could apply this to more than just testing. Anywhere you are accepting an object but only using a subset of properties could perhaps benefit from this approach. As with most things, it all depends on context, but it is worth keeping in mind that `Pick` might be a better option than `Partial`.
