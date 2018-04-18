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
npm build
```
or
```
grunt build
```


## Run Locally
Running locally will constantly perform a `build` when any deployable assets change (images, CSS, JS or HTML files). This functionality works well when local extensions are installed ([Install Local Extensions](https://developer.chrome.com/extensions/getstarted#manifest)). There is no need to reload the extension every time a file is changed (for Browser Actions).
```
npm start
```
or
```
grunt debug
```

## Build For Release
Clean the workspace, perform a build, bump the manifest version and create an archive suitable for uploading to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).

Note that if the build fails, it is possible that `jshint` failed; check the contents of `jshint-report.txt` for any violations.

```
npm release
```
or
```
grunt release
```

## Publish A Release
A release will be published to the Chrome Web Store. Publishing for release requires some addional steps, required to enable the Chrome Store API and obtain API keys. [This](https://developer.chrome.com/webstore/using_webstore_api#beforeyoubegin) is a good primer and should provide all the information needed. You will end up with three pieces of information:
- clientId
- clientSecret
- refreshToken

The grunt task expects these as options passed into the CLI (see the example below). The npm script `npm publish` expects three environment variables:
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN

The npm script is useful for CD situations; most CD servers allow for environment variable substitution which allows the npm task to function correctly while also not requiring sensitive information to be commited to git.
```
npm publish
```
or
```
grunt publish --clientId=CLIENT_ID --clientSecret=CLIENT_SECRET --refreshToken=REFRESH_TOKEN
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
  - [Publish A Release](#publish-a-release)
  - [Licence](#licence)
  - [Table Of Contents](#table-of-contents)