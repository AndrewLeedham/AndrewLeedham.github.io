---
title: Did you know about native macOS tabs in vscode?
description: vscode has a native macOS tabs option and it make working with multiple projects a breeze.
date: 2022-11-18
tags:
  - macos
  - tips
layout: layouts/post.njk
---

I was trawling through the vscode options the other day looking for some window resizing stuff, and found an option entitled "Native Tabs". Being a curious sort I enabled it and was suprised to see that all my seperate open windows were now combined into 1 with native tabs across the top to navigate between them. This in my opinion is a much better way of displaying multiple projects than workspace folders. You even get a nice little + icon for opening new projects.

![A screenshot of vscode's menu bar with native macOS tabs enabled]({{ '/img/native-macos-vscode-tabs.webp' | url }})

## Enabling Native Tabs
Just like any other option it is available in the GUI settings or the JSON file settings. Accessible by pressing <kbd>cmd + ,</kbd> or via the menu with 'Code -> Preferences -> Settings'. The option you are looking for is under "Window" entitled "Native Tabs".

![A screenshot of vscode's native tabs option in the settings menu]({{ '/img/native-macos-vscode-tabs-options.webp' | url }})

If you prefer you could just add the following to your `settings.json` file:
```
  "window.nativeTabs": true
```