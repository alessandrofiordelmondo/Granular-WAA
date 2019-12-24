var contextClass = (window.AudioContext || window.webKitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var audioContext = new contextClass();
var url, cue, vlocity, time, timeRND, dencity, pitch, pitchRND, pan, spread, timeOffSet;
var vox = [];
var nVox = 16;

function start(){
    for(var n = 0; n < nVox; n++){
	vox[n] = new Gran(audioContext);
    };
    timeOffSet = audioContext.currentTime;
}

function loadSound(voxArray, file){
    for (var i = 0; i < voxArray.length; i++){
	fromInputAudioLoader(file, voxArray[i], voxArray[i].audioContext);
    }
}
