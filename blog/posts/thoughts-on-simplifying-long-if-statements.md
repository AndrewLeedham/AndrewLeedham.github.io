---
title: Thoughts on simplifying long if statements
description: Some thoughts on simplifying long if statements to be more readable.
date: 2021-10-12
tags:
  - web
  - javascript
layout: layouts/post.njk
---
I ran into a problem recently where an if statement was getting out of hand. It was quickly becoming unreadable. So I did some thinking on how I could simplify it. The if statement in question was needed to check if 1 of 3 given objects was truthy but only 1. The astute may recognise this as an exclusive or (xor) statement. So let's look at the problem, written out it would have looked something like this:
```javascript
if (
  (term1 && !term2 && !term3) ||
  (!term1 && term2 && !term3) ||
  (!term1 && !term2 && term3)
) {
  // do something
}
```
[Prettier](https://prettier.io/) admittedly does a great job of formatting this, but tracking each of the nots (`!`) are in the correct place is error-prone. So what can we do to improve this? There are several techniques that could be useful here, each with different pros and cons, and each can be useful on there own.

## Splitting the if statment into 3 variables
```javascript
const onlyTerm1 = term1 && !term2 && !term3;
const onlyTerm2 = !term1 && term2 && !term3;
const onlyTerm3 = !term1 && !term2 && term3;
if (onlyTerm1 || onlyTerm2 || onlyTerm3) {
  // do something
}
```

### Pros
- More descriptive, making the intent clear. Previously without parsing all the terms in your head it was unclear the purpose of the if statement. You could use comments, but I personally feel the more the code can talk for itself the better.

### Cons
- We still have the not (`!`) problem. Making sure each is in the correct place is confusing to look at.

## Abstracting the logic into a function
```javascript
function onlyTerm(term, otherTerm1, otherTerm2) {
  return term && !otherTerm1 && !otherTerm2;
}

const onlyTerm1 = onlyTerm(term1, term2, term3);
const onlyTerm1 = onlyTerm(term2, term3, term1);
const onlyTerm1 = onlyTerm(term3, term1, term2);
if (onlyTerm1 || onlyTerm2 || onlyTerm3) {
  // do something
}
```

### Pros
- More descriptive, making the intent clear.
- The not (`!`) logic is written once, which is easier to follow, as we don't have a grid of them.

### Cons
- We now have to track the order each term is passed to the `onlyTerm` function, which is just as bad as the not (`!`) grid.

## Using JavaScripts functional program style Array functions
```javascript
if ([term1, term2, term3].filter((term) => Boolean(term)).length === 1) {
  // do something
}
```

### Pros
- We can add any number of terms without the length of the if statement growing exponentially.
- We don't have to track any nots (`!`) or the order of the terms.

### Cons
- The intent is not explicitly clear. It is easier to parse in your head: but still not ideal.

## Creating an exclusive or (xor) helper function
```javascript
function xor(...terms) {
  return terms.filter((term) => Boolean(term)).length === 1;
}
if (xor(term1, term2, term3)) {
  // do something
}
```
### Pros
- More descriptive, making the intent clear. Assuming you know what `xor` refers to, some JSDoc would go a long way there.
- We can add any number of terms without the length of the if statement growing exponentially.
- We don't have to track any nots (`!`) or the order of the terms.

Note that yes, with large data sets the xor function is not the most efficient implementation. There is room for optimisation. But on three terms, or likely any number of terms you are likely to put in an if statement, the difference would be negligible. Readability reigns king over micro optimisations in most cases.

## Conclusion

Abstracting to functions and variables are two very crucial tools in our programming toolbelts. Each of these techniques can be used in different scenarios. None of them are perfect. But taking the time to think about readability is key not only in shared code-bases, but for yourself when coming back to your code years, months or even weeks later.