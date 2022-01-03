---
title: Jest's test.each just got a whole lot better
description: Jest added a new feature to test.each that helps with writing readable and maintainable tests.
date: 2021-09-10
tags:
  - web
  - javascript
  - testing
layout: layouts/post.njk
---
[Jest](https://jestjs.io/) the javascript testing framework recently (4 months ago) upgraded the `test.each` global function in [version 27](https://github.com/facebook/jest/releases#:~:text=Add%20support%20for%20interpolation%20with%20object%20properties) and seems to have gone under the radar. Well, I only just found it in [the documentation](https://jestjs.io/docs/api#1-testeachtablename-fn-timeout)...

The feature in question is the ability to insert named properties of an object into a tests title. Previously we could only insert a single value or items from an array using `%s` to indicate a string and `%d` for a number etc. Aside from not supporting object properties at all, you could not control the order items would be replaced when using multiple insertions, for example `test.each([['foo', 'bar']])('%s %s', () => {})` would have a test name of "foo bar" and there was no way to do "bar foo".

You can now insert named properties with `$variable`, this is a win for test readability, because you can see how a test name will look without having to guess which item in an array is which. Sadly, the array order issue I mentioned above is still not possible, the closest I could get was `test.each([{0: 'foo', 1: 'bar'}])('$1 $0', () => {})`. However, I would recommend naming your test properties anyway.

Let's look at an example of how you might use this new feature. Say we are writing a new case transform library and we are looking to write some unit tests for the following pure function:
```javascript
function changeCase(input, format) {
  switch (format) {
    case 'upper': {
      return input.toUpperCase();
    }
    case 'lower': {
      return input.toLowerCase();
    }
    default: {
      return input;
    }
  }
}
```
We want to test our uppercase and lowercase formats with all uppercase, all lowercase, and mixed case strings. As well as a non-existing format. So rather than writing a separate test for each case with its own assertions, we could (as the name implies) just use `test.each` and construct an array of test cases instead, reusing the same test function for all of them. This is what that might look like in practise:
```javascript
const sample = [
  {input: 'ALL CAPS', format: 'upper', expected: 'ALL CAPS'},
  {input: 'ALL CAPS', format: 'lower', expected: 'all caps'},
  {input: 'ALL CAPS', format: 'invalid', expected: 'ALL CAPS'},
  {input: 'no caps', format: 'upper', expected: 'NO CAPS'},
  {input: 'no caps', format: 'lower', expected: 'no caps'},
  {input: 'no caps', format: 'invalid', expected: 'no caps'},
  {input: 'MIxEd capS', format: 'upper', expected: 'MIXED CAPS'},
  {input: 'MIxEd capS', format: 'lower', expected: 'mixed caps'},
  {input: 'MIxEd capS', format: 'invalid', expected: 'MIxEd capS'},
];

test.each(sample)(
  'Given "$input" $format formats as "$expected"',
  ({input, format, expected}) => {
    expect(changeCase(input, format)).toBe(expected);
  },
);
```
Previously we would likely write this test like so:
```javascript
const sample = [
  ['ALL CAPS', 'upper', 'ALL CAPS'],
  ['ALL CAPS', 'lower', 'all caps'],
  ['ALL CAPS', 'invalid', 'ALL CAPS'],
  ['no caps', 'upper', 'NO CAPS'],
  ['no caps', 'lower', 'no caps'],
  ['no caps', 'invalid', 'no caps'],
  ['MIxEd capS', 'upper', 'MIXED CAPS'],
  ['MIxEd capS', 'lower', 'mixed caps'],
  ['MIxEd capS', 'invalid', 'MIxEd capS'],
];

test.each(sample)(
  'Given "%s" %s formats as "%s"',
  (input, format, expected) => {
    expect(changeCase(input, format)).toBe(expected);
  },
)
```
Looking at the 'sample' array above alone, it is not easy to infer what each item is representing, so you must track down to the test implementation to see what the parameters were named, and perhaps even how they are used in the test body. In this example that is not particularly a problem, but as you add test cases and you can no longer fit both in your viewport, you must scroll to know what the array you are adding to does.

This is a powerful addition, albeit subtle, to the Jest library and opens new possibilities for naming tests and creating readable maintainable test suites. 2 potential improvements that could be made to the naming in `test.each`, would be `$n` where n is an integer to select array items by index, and also allowing a function instead of a string so the name can be truly customised.