---
title: How Experimental Browser Features Helped Me Verify a Hypothesis
description: A look at how I solved an issue with scrollbars and an accordion animation using experimental browser features.
date: 2021-10-07
tags:
  - web
  - javascript
  - debugging
layout: layouts/post.njk
---

An issue was recently reported to me that an accordion component I work on had a scrollbar in some circumstances when it should not. For a bit of context, the accordion shows scrollbars when the content height is more than 50% of the viewport, and this content was not.

Thankfully, the error report had a link to a few affected pages, and I could recreate the issue, so it was a good starting place. I wrote a lot of the code for this component and reviewed the rest of it, so again a fortunate position which is rare.

When opening and closing the accordion it animates the `max-height` and toggles between an `overflow-y` of `none` and `auto` as to hide the scrollbar during the animation. This is a common technique as `max-height` is animatable and does not cause a reflow like height would. In order to add the `overflow-y` we hook into the `transitionend` event in JavaScript, so my initial thought was that this was not firing and thus leaving the `max-height` or not changing the `overflow-y`, but that was not the case. Then I noticed something, after toggling the accordion what seemed 1000 times, the text content was flowing onto an additional line at the end of the animation when the `overflow-y` was being added! To me, this instantly rang alarms in my head! The height I am calculating for the `max-height` is not taking the scrollbar into account, as it removes ~15px from the width of the content potentially making it flow onto another line. I quickly scrambled to prove this hypothesis and remembered reading about a new property that was intended to stop layout shift from scrollbars. After googling and trawling through creators past tweets, I found it [`scrollbar-gutter`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter), it is an experimental feature in Chrome but it was easy to enable and using it with my accordion resolved the issue. So all I needed was a fix that was not an experimental feature. In the end, I had to rely on setting `overflow-y` to `auto` triggering layout, calculating the height, and then setting it back to `none`. Triggering an additional layout step is not really what I wanted to do, but after mulling on it for a while, I could not think of a better solution with the tools I had.

This perhaps gives you insight into how I go about solving problems. It was satisfying to realise the cause and verify it quickly with a new browser feature!