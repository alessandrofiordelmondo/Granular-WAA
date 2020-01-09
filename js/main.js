var contextClass = (window.AudioContext || window.webKitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var audioContext = new contextClass();
var cue=0, velocity=1, time=20, timeRND=0, dencity=50, pitch=1, pitchRND=0, pan=0, spread=0, timeOffSet;
var w = [];
var vox = [];
var nVox = 16;

function start(){
    for(var n = 0; n < nVox; n++){
	vox[n] = new Gran(audioContext);
	vox[n].connect(audioContext.destination);
    };
    timeOffSet = audioContext.currentTime;
}

function loadSound(voxArray, file){
    for (var i = 0; i < voxArray.length; i++){
	fromInputAudioLoader(file, voxArray[i], voxArray[i].audioContext);
    }
}

function play(){
    if (!vox[0]){
    	alert('load a file audio - choose a sound')
    }else{
	for(var i = 0; i < nVox; i++){
	    if (!vox[i].state){
		vox[i].start();
	    }
    	}
    }
} 

function stop(){
    if(vox){
	for (var i = 0; i < nVox; i++){
	    if (vox[i].state){
		vox[i].stop();
	    }
	}
    }	
}

function windType(typ, length=100, alpha=0.16){
    switch(typ){
	case 'tri':
	    w = wTri(length);
	    break
	case 'han':
	    w = wHann(length);
	    break
	case 'bla':
	    w = wBlack(length, alpha);
	    break
	}
    graph(w);
}

$(document).ready(function(){
//inizialize values
    $("#time").val(time);
    $("#timeValue").val(time);
    $("#timeRND").val(timeRND);
    $("#timeRNDValue").val(timeRND);
    $("#pitch").val(pitch);
    $("#pitchValue").val(pitch);
    $("#pitchRND").val(pitchRND);
    $("#pitchRNDValue").val(pitchRND);
    $("#dencity").val(dencity);
    $("#dencityValue").val(dencity);
    $("#pan").val(pan);
    $("#panValue").val(pan);
    $("#spread").val(spread);
    $("#spreadValue").val(spread);
    $("#valocity").val(velocity);
    $("#velocityValue").val(velocity);
    $("#cue").val(cue);
    $("#cueValue").val(cue);
//inizialisation window-drop-down-menu 
    $(".wTypeButton").click(function() {
	var val = $(this).attr('id');
	if (val == 1) {
            $("#windowList").hide();
            $(this).attr('id', '0');
       	} else {
            $("#windowList").show();
            $(this).attr('id', '1');
        }
});
//Mouse click on setting wTypeButton and #windowList .wLst
    $("#windowList, .wTypeButton").mouseup(function() {
	return false;
    });
//Document Click
    $(document).mouseup(function() {
        $("#windowList").hide();
        $(".wTypeButton").attr('id', '0');
    });
//inizialisation window plot
    windType('han');
})
