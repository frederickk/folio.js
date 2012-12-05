/**
 *  
 *	FStopwatch.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FStopwatch
 *
 *	A simple stopwatch
 *
 */
FrederickkPaper.FTime.FStopwatch = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var now;
	var then;
	var timeInMs = 0;
	var bStart = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.toggle = function() {
		if (bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	this.start = function() {
		// start
		bStart = 1;
		then = new Date();
		then.setTime(then.getTime() - timeInMs);
	};

	this.pause = function() {
		// pause
		bStart = 0;
		now = new Date();
		timeInMs = now.getTime() - then.getTime();
	};

	this.reset = function() {
		bStart = 0;
		timeInMs = 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.set = function(ms, run) {
		timeInMs = ms;
		(run == true) ? bStart = 0 : bStart = 1;

		then = new Date();
		then.setTime(then.getTime() - timeInMs);
		this.toggle();
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	};

	this.isRunning = function() {
		return (bStart) ? true : false;
	};

};


