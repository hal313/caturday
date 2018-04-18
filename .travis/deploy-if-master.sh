#!/bin/bash

## Publishes the extension to the Chrome Web Store if on the master branch
if [[ 'master' == $TRAVIS_BRANCH ]]
  npm run publish
fi