var Gran = function(audioContext){
    var self = this;
    self.state = true;
    self.audioContext = audioContext;
    self.currentTime = self.audioContext.currentTime;
    self.buffer = undefined;

    self.gain = self.audioContext.createGain();
    self.gain.gain.value = 0;
    self.panner = self.audioContext.createStereoPanner();
    
    self.destination;

    self.connect = function(destination){
	self.destination = destination;
    }

    /*
    external varable:
    cue, velocity, timeOffSet, time timeRND, pitch, pitchRND, dencity, pan, spread
    */

    self.play = function(){
	var sound = self.audioContextBufferSource();
	sound.buffer = self.buffer;
	var bufDur = sound.buffer.duration;
	var startPoint = cue * bufDur;
	var cuePoint = ( (self.currentTime - timeOffSet) * valocity + startPoint ) % bufDur;
        var fTime = frameTime(time, timeRND);
	var fPitch = framePitch(pitch, pitchRND);
	var fpT = fTime/Math.abs(fPitch);
	var fCue = cuePoint - (fTime/fpT); 
	if (fCue < 0){
	    fCue = 0;
	}
	var fDelay = frameDelay(fTime, dencity);
	var fPan = framePan(pan, spread);
		
	self.panner.pan.value = fPan;
	sound.connect(self.panner);
	self.panner.connect(self.gain);
	self.gain.connect(self.destination);
			
	sound.playbackRate.value = fPitch;
	sound.start(self.currentTime, fCue);
	self.gain.gain.setValueCurveAtTime (w, self.currentTime, fpT);
	sound.stop(self.currentTime + fpT);
		
	sound.onended = function(){
	    if (self.state){
		setTimeout(function(){
		    self.play();
	    	},fDelay);
	    }
	};
    };

    self.start = function(){
	self.state = true;
	self.play();
    }

    self.stop = function(){
	self.state = false;
    }
}
