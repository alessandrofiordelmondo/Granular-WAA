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
