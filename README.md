Midi Recorder
=============
This is a collection of scripts that allow you to record MIDI messages sent from devices to your machine, and replay them at a later point.

I've created them so that I can test the mapping of my MIDI controller for the [MIXXX DJ software](http://www.mixxx.org).

Dependencies
------------
  - [Node.js](https://nodejs.org). I'm running this on v4.2.4, different versions may work just fine.
  - node-midi (npm module). This module has a lot of system-specific dependencies itself, make sure to check out its [prerequisites](https://www.npmjs.com/package/midi#prerequisites)
  - log (npm module)
  - command-line-args (npm module)

How to run
----------
`npm install` to set up. Make sure you have Node.js and the prerequisites for node-midi installed.

`node record.js` to record.

`node play.js` to replay. I seem to need to unplug the device I recorded from in order to get the replayed signals picked up by whatever host software.