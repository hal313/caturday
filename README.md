# [Caturday Chrome Extension](https://github.com/hal313/caturday-chrome-extension)

[![Build Status](http://img.shields.io/travis/hal313/caturday-chrome-extension/master.svg?style=flat-square)](https://travis-ci.org/hal313/caturday-chrome-extension)
[![Dependency Status](https://david-dm.org/hal313/caturday-chrome-extension.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)[![DevDependency Status](https://david-dm.org/hal313/caturday-chrome-extension/dev-status.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)


> Chrome extension to display kitties!

# Introduction
Need a break from all the depressing news? Too much work on your plate? If you are looking for a refreshing reminder of how amazing life is - look no further! With the press of a button, you will be served up a random image of cats! Even for dog lovers, this extension is pretty fun.


## Setup
Initial setup for any development environment.
```bash
npm install -g grunt-cli
npm install
```
## Build
A build will generate usable artifacts in the `dist/`.
```bash
grunt build
```


## Run Locally
Running locally will constantly perform a `build` when any deployable assets change (images, CSS, JS or HTML files). This functionality works well when local extensions are installed ([Install Local Extensions](https://developer.chrome.com/extensions/getstarted#manifest)). There is no need to reload the extension every time a file is changed (for Browser Actions).
```bash
npm start
```

## Build For Release
Clean the workspace, perform a build, bump the manifest version and create an archive suitable for uploading to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).

Note that if the build fails, it is possible that `jshint` failed; check the output contents for any violations.
```bash
npm run release
```

## Publish A Release
Publishing release requires some additional steps ([This](https://developer.chrome.com/webstore/using_webstore_api#beforeyoubegin) is a good primer and should provide all the information needed):
1. Create a Google Cloud project
1. Enable the Chrome Store API
3. Obtain API keys

You will end up with three pieces of information:
- clientId
- clientSecret
- refreshToken

It is important to note that when credentials are created, the type is "OAuth Client ID" with authorization type of "desktop app"; this will allow for offline tokens to be generated.

The npm script `npm run deploy` expects three environment variables:
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN

The npm script is useful for CD situations; most CD servers allow for environment variable substitution which allows the npm task to function correctly while also not requiring sensitive information to be commited to git.
```bash
npm run deploy
```

## Publish Procedure
Publishes are currently manual, though releases could be configured with a CD server (invoke `npm run deploy` as a build step).

In general, the steps are inspired from git-flow:
* Create a release branch
* Bump the version
* Build a deployable
   * If using CI/CD, create a build (`npm run build`) in order to verify that the build succeeds
   * If manually publishing, run `npm run build`
* Commit the version bump
* Merge the release branch into `master`
* Create a tag
* Merge the release branch into `develop`
* Remove the release branch
* Push branches and tags
* Deploy the built artifact to the Chrome web store

This script is suitable for locally preparing a build and push changes to a CI/CD server for publishing to the Chrome Web Store.
```bash
./ext/scripts/release.sh
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
  - [Publish Procedure](#publish-procedure)
  - [Licence](#licence)
  - [Table Of Contents](#table-of-contents)
