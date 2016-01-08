var midi = require('midi'),
    Log = require('log'),
    fs = require('fs');


var output = new midi.output();

// Create a virtual input port.
output.openVirtualPort("DJControl Compact");

var replayStarted = false;

function replayLog() {
    var stream = fs.createReadStream(__dirname + '/my.log')
    var log = new Log('info', stream);
    var delay = 0;
    log.on('line', function(line) {
        var msg = JSON.parse(line.msg);
        delay = delay + msg.delta;

        setTimeout(function(){
            console.log(msg.message, delay);
            output.sendMessage(msg.message);
        }, delay*1000);
    });
}

console.log('Press any key to continue, `q` to exit');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', function(buffer){
    var chunk = buffer.toString('ascii');

    if(chunk == 'q') {
        exit();
    }

    if(!replayStarted) {
        replayLog();
        replayStarted = true;
    }
});

function exit() {
    output.closePort();
    process.exit(0);
}
