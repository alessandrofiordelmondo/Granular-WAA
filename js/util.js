//open file function
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

//Value calculation function
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

//Window functions
function wTri(N){
	var W = new Float32Array(N);
	for (var n = 0; n < N; 	n++){
		W[n] = 1 - Math.abs((n - N/2) / (N/2));
	}
	return W
}

function wHann(N){
	var W = new Float32Array(N);
	for (var n = 0; n < N; n++){
		W[n] = 0.5*(1-Math.cos((2*Math.PI*n)/N));
	}
	return W
}

function wBlack(N, alpha){
	//sugested alpha = 0.16
	var W = new Float32Array(N);
	var a0 = (1-alpha) / 2;
	var a1 = 0.5;
	var a2 = alpha / 2;
	for (var n = 0; n < N; n++){
		W[n] = a0 - a1*Math.cos((2*Math.PI*n)/N) + a2*Math.cos((4*Math.PI*n)/N);
	}
	return W
}

//window plot function
function graph(y) {
	var canvas = document.getElementById("plot");
	var theContext = canvas.getContext("2d");
	theContext.clearRect(0, 0, canvas.width, canvas.height);
	
	var width = 80;
	var height = 50;
	
	var yMax = 0;	
	if (Math.min(...y) < 0){
		yMax = Math.max(...y) - Math.min(...y);
	} else {
		yMax = Math.max(...y);
	}
	y = y.map(function(x){return height - ((height / yMax) * x)});
	
	pStep = y.length / width;
	
	theContext.strokeRect(0, 0, width, height)
	theContext.beginPath();
	theContext.moveTo(0, y[0]);
	for (var i = 1; i < width; i++){
		theContext.lineTo(i , y[Math.floor(i*pStep)]);
	}
	theContext.stroke();
}
