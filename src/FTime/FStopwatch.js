/**
 *  
 *	FStopwatch.js
 *	v0.2a
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
frederickkPaper.FTime.FStopwatch = function() {
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
	/**
	 *	
	 *	toggle (start/stop) the stopwatch
	 *	
	 */
	this.toggle = function() {
		if (bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	/**
	 *	
	 *	start the stopwatch
	 *	
	 */
	this.start = function() {
		// start
		bStart = 1;
		then = new Date();
		then.setTime(then.getTime() - timeInMs);
	};

	/**
	 *	
	 *	pause the stopwatch
	 *	
	 */
	this.pause = function() {
		// pause
		bStart = 0;
		now = new Date();
		timeInMs = now.getTime() - then.getTime();
	};

	/**
	 *	
	 *	reset the stopwatch
	 *	
	 */
	this.reset = function() {
		bStart = 0;
		timeInMs = 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	set the stopwatch
	 *
	 *	@param ms
	 *			milliseconds to start the stopwatch with
	 *	@param run
	 *			whether the stopwatch should start or not
	 *	
	 */
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
	/**
	 *	
	 *	@return the time elapsed
	 *	
	 */
	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	};

	/**
	 *	
	 *	@return whether the stopwatch is running
	 *	
	 */
	this.isRunning = function() {
		return (bStart) ? true : false;
	};

};


