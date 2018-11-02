#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/kaichenle/Dropbox/cs_242/fa18-cs242-assignment3/githubApp/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/kaichenle/Dropbox/cs_242/fa18-cs242-assignment3/githubApp/node_modules/.bin:/usr/local/bin:/Users/kaichenle/anaconda3/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/TeX/texbin:/opt/X11/bin
      npm $@
    