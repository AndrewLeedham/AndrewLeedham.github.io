---
title: The two ways to test errors in Jest
description: A summary of the 2 ways of testing errors in the Jest testing framework.
date: 2021-10-23
tags:
  - web
  - javascript
  - testing
layout: layouts/post.njk
---
## Method one
The simplest way to test for errors being thrown in Jest is using one of the three built-in matchers:
- [`toThrow(error?)`](https://jestjs.io/docs/expect#tothrowerror) where `error` is a matcher for the specific type or message of the thrown error. To match the message you have three options: Regular expression, exact string match or passing an error instance where the message will be directly compared. To match the type you can pass an Error class and it will check if the error was created from it (`instanceof`).
- [`toThrowErrorMatchingSnapshot(hint?)`](https://jestjs.io/docs/expect#tothrowerrormatchingsnapshothint) where hint is some string to uniquely identify the snapshot. I would not recommend using this, as error messages are usually minimal and moving them into a different snapshot file just disconnects the test from the expected outcome.
- [`toThrowErrorMatchingInlineSnapshot(inlineSnapshot)`](https://jestjs.io/docs/expect#tothrowerrormatchinginlinesnapshotinlinesnapshot) where `inlineSnapshot` is the error message itself, this is the same as `toThrow` with an exact string match with the added benefit of automatically being updated without having to copy/paste the message from the console.

Something to note when using any of these functions is that you should be passing a function to [`expect`](https://jestjs.io/docs/expect#expectvalue), not a value like you usually would. This is because Jest needs to manage when your function is called so it can wrap it in a `try`/`catch` internally. In the case of asynchronous code you can just pass a `Promise` and do `.rejects.toThrow()`.

For most cases the above functions should suffice. However, you may have noticed they only look at either the message of the error or its Error class. What if you want to go deeper, for example there is a new Error class that has landed in several browsers and is in newer versions of Node.js called [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError). It groups multiple errors together by storing them as 'children' on a property called "errors". We could test if we are getting an `AggregateError` or if the message of said error is as expected, but not what each of the internal errors are. This brings us to our second way of testing for errors in Jest.

# Method 2
Using `try`/`catch` in a Jest test function is the second method, this may seem obvious but what if no error is thrown, the test would still pass. Jest has us covered here with a function for checking how many assertions were made in a test: [`expect.hasAssertions()`](https://jestjs.io/docs/expect#expecthasassertions), or even [`expect.assertions(number)`](https://jestjs.io/docs/expect#expectassertionsnumber) if you want to make sure a specific number of assertions were made. I have been using Jest for years and have only just discovered these two functions (hence the blogpost). So, let’s look at an example:
```javascript twoslash
/// <reference types="jest" />
/// <reference lib="esnext.promise" />
// ---cut---
function foo() {
  throw new AggregateError([new Error('bar'), new Error('baz')], 'foo');
}

test('AggregateError has specific child errors', () => {
  // We are telling Jest that this test definitely has assertions.
  // Meaning if expect is not called at least once it will fail.
  // So if foo does not throw an error our test will fail.
  expect.hasAssertions();
  try {
    foo();
  } catch (error) {
    // We now have the full error object and can test whatever we like.
    expect(error.message).toBe('foo');
    expect(error.errors).toHaveLength(2);
    expect(error.errors[0]?.message).toBe('bar');
    expect(error.errors[1]?.message).toBe('baz');
  }
});
```
