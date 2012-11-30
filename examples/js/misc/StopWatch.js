/**
 *  
 *	StopWatch.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 */
var StopWatch = function() {
	// Properties
	// private
	var now;
	var then;
	var timeInMs = 0;
	var bStart = 0;


	// Methods
	this.StartStop = function() {
		if (bStart == 0) {
			// start
			bStart = 1;
			then = new Date();
			then.setTime(then.getTime() - timeInMs);
		}
		else {
			// pause
			bStart = 0;
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
	}

	this.Reset = function() {
		bStart = 0;
		timeInMs = 0;
	}


	// Sets
	this.set = function(ms, run) {
		timeInMs = ms;
		(run) ? bStart = 0 : bStart = 1;

		then = new Date();
		then.setTime(then.getTime() - timeInMs);
		this.StartStop();
	}


	// Gets
	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	}

	this.isRunning = function() {
		return (bStart) ? true : false;
	}

}