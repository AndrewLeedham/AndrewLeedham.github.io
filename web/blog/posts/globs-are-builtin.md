---
title: Globs are built-in!
description: Did you know globs are built in to Unix and therefore macOS.
date: 2022-02-08
tags:
  - unix
  - macos
layout: layouts/post.njk
---

I have recently been converting some large repos to Ecmascript Modules (ESM). As part of that process, I have been using [jscodeshift](https://github.com/facebook/jscodeshift) to convert en masse. To specify which files to convert the `jscodeshift` CLI accepts any number of paths separated by spaces (positional arguments). A perfect case for Unix path expansion (globs), since `jscodeshift` does not support globs via a library like [glob](https://www.npmjs.com/package/glob) or [globby](https://www.npmjs.com/package/globby). So, I pulled out my faded Unix knowledge.

Globs just work in the shell! Path expansion takes a glob with wildcards and replaces it with matching paths. So say we have a directory structure like this:
```
example
├── file.css
├── file.js
├── other.js
└── sub
    └── file.js
```
Say we wanted to select all the JavaScript files in this structure, we could use the following glob `echo ./example/**/*.js` which would output:
```
./example/file.js ./example/other.js ./example/sub/file.js
```
The important thing to note here is that the echo command is called as `echo ./example/file.js ./example/other.js ./example/sub/file.js` because the path expansion is executed first then passed to the command as arguments. Meaning we can use built-in globs for any CLI that does not natively support globs.

Using built-in path expansion is useful even if a CLI supports native globs for two reasons:
1. Globbing libraries often have slightly different syntax, meaning you need to figure out which is in use and adapt your muscle memory per CLI. But with Unix path expansion, you are always using the same system with the same syntax.
2. You can dry-run your glob outside of the CLI using `echo` meaning, you are sure it is processing the correct files without running some potentially destructive process.

__Bonus Tip__ use `echo ./example/**/*.js | tr ' ' '\n'` to print each file path on a newline. Making it much easier to digest large sets of files.