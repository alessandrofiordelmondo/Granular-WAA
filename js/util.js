function audioFileLoader(url, obj, audioContext){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = "arraybuffer";
    req.onload = function(){
   	audioContext.decodeAudioData(req.response, function(data) { obj.buffer = data; });
    };
    req.send()
}

function fromInputAudioLoader(file, obj, audioContext){
    var audiodata = new FileReader();
    audiodata.readAsArrayBuffer(file[0]);
    audiodata.onload = function(e){
	audioContext.decodeAudioData(e.target.result, function(data){ obj.buffer = data; })
    }
}

var RAND = function(min, max){
	return Math.random()*(max-min) + min;
}

var frameTime = function(t, tr){
	//t	= frame time [ms]
	//tr 	= random frame time [%]
	var alpha = 150;	//random influence [100/150/200/...]
	var rng = t * tr/alpha; 
	var T = t + RAND(-rng, rng);
	return T/1000;
};

var frameDelay = function(t, d){
	//t	= frame time [ms]
	//d 	= dencity [%]
	var T = t*1000;
	var del = (100 - d) / 100;
	var D = RAND(del/2*T, del*2*T);
	return D;
};

var framePitch = function(p, pr){
	//p	= pitch
	//pr	= random pitch [%]
	var pMin = p + (0.25 - p) * (pr / 100);
	var pMax = p + (2 - p) * (pr / 100);
	var P = RAND(pMin, pMax);
	return P;
};

var framePan = function(pn, sp){
	//pn	= pan [-1 - 1]
	//sp	= spread [%]
	var pnMin = pn + (-1 - pn) * (sp / 100);
	var pnMax = pn + (1 - pn) * (sp / 100);
	var PN = RAND(pnMin, pnMax);
	return PN; 
}

