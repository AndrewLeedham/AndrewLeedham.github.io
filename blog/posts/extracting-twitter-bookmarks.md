---
title: Extracting Twitter Bookmarks
description: Why I wanted to get Twitter bookmarks out of Twitter, and how you can too.
date: 2021-09-08
tags:
  - scraping
  - organisation
layout: layouts/post.njk
---
Over the years I have used Twitter's bookmarks feature (formerly Flamingo's 'Read later' feature) to save useful tweets I may want to refer to later. This was great initially, but I now have 146 bookmarks and Twitter has no way of searching them! Therefore, I have decided to move them elsewhere, this brings to light another pitfall of Twitter bookmarks, there is no public API!

My first attempt was following [an article](https://apievangelist.com/2019/12/30/pulling-your-twitter-bookmarks-via-the-twitter-api/) which used Postman's interceptor browser extension to get auth for the internal API. However, it seems Twitter have closed this loophole, and it just returns a 403 instantly (it also changed to GraphQL since that article was written). So, I decided to take matters into my own hands and dig around in dev-tools. My first line of attack was seeing if I could just scrape the <abbr title="Document Object Model">DOM</abbr>, as I figured if I scroll all the way to the bottom of the page all the bookmarks will be in the DOM somewhere. I quickly found that they are using something akin to [react-window](https://github.com/bvaughn/react-window), which only keeps a few DOM nodes of the greater list in the DOM at any 1 time, positioning them absolutely. This led me to my second line of attack, since they were likely using react-window, they must also be using React, so I fired up the [React Developer Tools Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). After digging around in the obfuscated tree structure for a while, I finally found what I was looking for, a parent node with an array of all the bookmark data!

## Extracting the data

If you are looking to extract your Twitter bookmarks the same way I have. Here is a little step by step:

1. Navigate to https://twitter.com/i/bookmarks and scroll all the way down to the bottom, so all your bookmarks are loaded.

2. Open dev-tools in whatever browser you are using (assuming it supports the React Developer Tools Extension), and navigate to the "Components" tab.

3. You will need to find an "Anonymous" component with the key "bookmarks" (unfortunately you cannot search by key currently), it should look something like this:
![Shows the relevant tree structure in React Developer Tools]({{ '/img/extracting-twitter-bookmarks-tree.png' | url }})

4. Selecting the "Anonymous" component with the key "bookmarks" should yield its props on the right panel, we are looking for the prop named "list". Right click it and select "Copy value to clipboard".
![Shows the bookmarks component props in React Developer Tools]({{ '/img/extracting-twitter-bookmarks-props.png' | url }})

5. The next step is data manipulation, we have a list of IDs but we need them as URLs to be useful. So, if you type `const bookmarks = ` and then paste the copied value into the dev-tools console, and hit <kbd>Enter</kbd> you will have an array to work with. Running the following will convert it into an array of URLs.
```javascript
  bookmarks.slice(0, -1).map((bookmark) => `https://twitter.com/i/web/status/${bookmark.data.content.id}`)
```

6. What you do next with your array of URLs is up to you, personally I converted them into a bookmarks HTML file, by reverse engineering (to use the term lightly) Safari’s bookmark output (since Chrome wouldn’t export for some reason). It is essentially a HTML description list `<dl>` with a description term `<dt>` and anchor `<a>` for each link, with some boilerplate. I used VSCode’s multi-cursor feature to get it in the desired format.