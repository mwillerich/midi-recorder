var midi = require('midi'),
    fs = require('fs'),
    Log = require('log'),
    commandLineArgs = require('command-line-args');

//point to log.
log = new Log('info', fs.createWriteStream('my.log'));

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
if(input.getPortCount()) {
    // Get the name of a specified input port.
    input.getPortName(0);

    // Configure a callback.
    input.on('message', function(deltaTime, message) {
        // The message is an array of numbers corresponding to the MIDI bytes:
        //   [status, data1, data2]
        // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
        // information interpreting the messages.
        console.log('m:' + message + ' d:' + deltaTime);

        log.info(JSON.stringify({message: message, delta: deltaTime}));
    });

    // Open the first available input port.
    input.openPort(0);

    // Sysex, timing, and active sensing messages are ignored
    // by default. To enable these message types, pass false for
    // the appropriate type in the function below.
    // Order: (Sysex, Timing, Active Sensing)
    // For example if you want to receive only MIDI Clock beats
    // you should use
    // input.ignoreTypes(true, false, true)
    input.ignoreTypes(false, false, false);
}