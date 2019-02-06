# BIKE-IT

### Pre-requisites
* NodeJS
* To run this application you need to register an [Google Maps API key](https://developers.google.com/maps/documentation/)

### Installing

Run:
$ npm install -g expo-cli

And go through the [Expo installation steps.](https://docs.expo.io/versions/latest/introduction/installation/)

Clone repository, cd into the root folder:
$ npm install

### Running
In root: 
$ npm start

This starts the application, to view the application you need to install the Expo application on the device chosen.

In /server/:
$ npm start
$ nodemon subscriber.js (Only if you want to see messages in home/devices/#)
$ nodemon broker.js

To handle all of these simultaneously I like to use tmux [tmux](https://github.com/tmux/tmux/wiki)

## Remeber to suspend your API keys when you are done!

# Thanks!
