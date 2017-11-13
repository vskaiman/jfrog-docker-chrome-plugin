# jfrog-docker-chrome-plugin

Client side post processing plugin of jfrog site for generating copy action
on docker tag name.
Copy action does alert window with full path of docker image which is ready for
command `docker pull`

## Install plugin
0. git clone current repository.
1. fill `jfrogUrl` inside `manifest.json` and `main.js`.
2. go to to `chrome://extensions/``, turn on developer mode and install plugin.

## todo
0. move jfrog parameter to plugin option.
