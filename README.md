# [Caturday](https://github.com/hal313/caturday-chrome-extension)

[![Build Status](http://img.shields.io/travis/hal313/caturday-chrome-extension/master.svg?style=flat-square)](https://travis-ci.org/hal313/caturday-chrome-extension)
[![Dependency Status](https://david-dm.org/hal313/caturday-chrome-extension.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)[![DevDependency Status](https://david-dm.org/hal313/caturday-chrome-extension/dev-status.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)


> Chrome extension to display kitties!

# Introduction
Need a break from all the depressing news? Too much work on your plate? If you are looking for a refreshing reminder of how amazing life is - look no further! With the press of a button, you will be served up a random image of cats! Even for dog lovers, this extension is pretty fun.


## Setup
Initial setup for any development environment.
```
npm install -g grunt-cli
npm install
```
## Build
A build will generate usable artifacts in the `dist/`. 
```
grunt build
```

## Run Locally
Running locally will constantly perform a `build` when any deployable assets change (images, CSS, JS or HTML files). This functionality works well when local extensions are installed ([Install Local Extensions](https://developer.chrome.com/extensions/getstarted#manifest)). There is no need to reload the extension every time a file is changed (for Browser Actions).
```
grunt debug
```

## Build For Release
Clean the workspace, perform a build, bump the manifest version and create an archive suitable for uploading to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).

Note that if the build fails, it is possible that `jshint` failed; check the contents of `jshint-report.txt` for any violations.

```
grunt release
```

## Licence
This software is released under the [MIT Licence](https://raw.githubusercontent.com/hal313/caturday-chrome-extension/master/LICENSE).


## Table Of Contents
- [Caturday](#caturday)
- [Introduction](#introduction)
  - [Setup](#setup)
  - [Build](#build)
  - [Run Locally](#run-locally)
  - [Build For Release](#build-for-release)
  - [Licence](#licence)
  - [Table Of Contents](#table-of-contents)