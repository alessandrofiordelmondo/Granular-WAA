var contextClass = (window.AudioContext || window.webKitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var audioContext = new contextClass();
var url, cue, vlocity, time, timeRND, dencity, pitch, pitchRND, pan, spread, timeOffSet;
var w = [];
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

function windType(typ){
    switch(typ){
	case 'tri':
	    w = wTri(100);
	    break
	case 'han':
	    w = wHann(100);
	    break
	case 'bla':
	    w = wBlack(100, 0.16);
	    break
	}
    graph(w);
}
