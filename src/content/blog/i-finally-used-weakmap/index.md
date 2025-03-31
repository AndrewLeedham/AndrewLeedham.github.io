---
title: I finally used WeakMap!
description: A look into how I used WeakMap for optimisation in a recent project.
pubDate: 2025-03-31
tags:
  - typescript
icon: map
---

You may not have heard of `WeakMap`s, in which case I would reccomend reading the [MDN docs here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap). To summarise, it is a map of objects to some associated data, where the reference to said object is considered weak and therefore does not prevent garbage collection.

I have been looking for a reason to use `WeakMap`s for a while, it also seems like it should be an appropriate tool when doing performance work. Yet, I have never found a good use case until now!

So... what did I use them for you ask? Well I used it as an optimisation around the `getBBox` function, essentially I had an SVG where 100s if not thousands of lines can be dragged and all of them update each-others positions. In order to calculate their relative positions I needed to know where they were positioned previously, this required calling `getBBox` for every line on every `mousemove` event... a lot! There were lots of areas of optimisation for this project, but looking at the devtools performance traces `getBBox` was expensive! So, I looked into optimising it. Because the value does not change while a user is dragging, since it uses CSS transforms not top/left or x/y, we can essentially cache the value of `getBBox` across `mousemove` calls. And you guessed it for the cache we simple use a WeakMap, once those SVG path nodes are removed from the DOM, we don't care about the value anymore and the browser is welcome to get rid of them!
