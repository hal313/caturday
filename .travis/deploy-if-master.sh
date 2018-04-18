#!/bin/bash

## Publishes the extension to the Chrome Web Store if on the master branch
if [[ 'master' == $TRAVIS_BRANCH ]]
  npm run publish
else
  echo "Skipping deploy on branch $TRAVIS_BRANCH"
fi