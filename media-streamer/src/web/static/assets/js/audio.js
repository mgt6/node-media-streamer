var context,
    soundBuffer;
window.addEventListener('load', init, false);
function init() {
    try {
        context = new webkitAudioContext();
        loadSound('http://127.0.0.1:8080/stream/stream.mp3');
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            soundBuffer = buffer;
            playSound(soundBuffer);
        });

    };
    request.send();
}

function playSound(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.noteOn(0);
}
