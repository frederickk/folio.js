/**
 *  
 *	FStepper.js
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
 *	FStepper
 *
 */
frederickkPaper.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var stepMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStart = 0.0;
	var timeEnd = 0.0;
	
	var bToggleStart = 0;
	var bBeginStpper = false;
	var bIn = false;
	var bOut = false;
	var bDone = true;

	var easing = 0.05;
	var bEase = true;

	// public
	this.delta = 1.0;
	this.counter = -1;


	
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	toggle (start/stop) the stepper
	 *	
	 */
	this.toggle = function() {
		if (bToggleStart == 0) {
			bToggleStart = 1;
			this.stepOut();
		}
		else {
			bToggleStart = 0;
			this.stepIn();
		}
	}

	// ------------------------------------------------------------------------
	/**
	 *	TODO: implement easing
	 *
	 *	required function to keep the timing in sync
	 *	with the application
	 *
	 *	@param currentTime
	 *			the elapsed time of the application in seconds
	 */
	this.update = function(currentTime) {
		if(bBeginStpper) {
			bBeginStpper = false;
			timeStart = currentTime;
			if(bIn) {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + ((1.0 - this.delta) * stepMillis)), 3 );
			}
			else {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + (this.delta*stepMillis)), 3 );
			}
			if(timeEnd <= currentTime) {
				if(bIn) {
					bIn = false;
					this.delta = 1.0;
				}
				else {
					bOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(bIn) {
			this.delta = frederickkPaper.roundDecimal( (1.0 - ((timeEnd - currentTime) / stepMillis)), 3 );
			// if(bEase) {
			// }

			if(currentTime == timeEnd) {
				bIn = false;
				this.delta = 1.0;
				this.counter++;
				return;
			}
		}
		else if(bOut) {
			this.delta = frederickkPaper.roundDecimal( ((timeEnd - currentTime) / stepMillis), 3 );
			// if(bEase) {
			// }

			if(currentTime == timeEnd) {
				bIn = false;
				this.delta = 0.0;
				this.counter++;
				return;
			}
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	toggle stepping in (++)
	 *	
	 */
	this.stepIn = function() {
		if(bIn) return;
		if(this.delta == 1.0) return;
		bBeginStpper = true;
		bIn = true;
		bOut = false;
	};

	/**
	 *	
	 *	toggle stepping out (--)
	 *	
	 */
	this.stepOut = function() {
		if(bOut) return;
		if(this.delta == 0.0) return;
		bBeginStpper = true;
		bOut = true;
		bIn = false;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@return if the object is stepping in
	 */
	this.isIn = function() {
		return bIn;
	};
	/**
	 *	@return if the object is stepping out
	 */
	this.isOut = function() {
		return bOut;
	};

	/**
	 *	@return if the object has finished it's stepping
	 */
	this.isDone = function() {
		if(this.delta < 1.0 && this.delta > 0.0) return false;
		else if(this.delta >= 1.0) {
			this.delta = 1.0;
			return true;
		}
		else if(this.delta <= 0.0) {
			this.delta = 0.0;
			return true;
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	stop stepping
	 *	
	 */
	this.stop = function() {
		bBeginStpper = bIn = bOut = false;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _seconds
	 *			length of fade in seconds 
	 */
	this.setSeconds = function(_seconds) {
		this.setMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds 
	 */
	this.setMillis = function(_millis) {
		stepMillis = _millis;
		stepMillis /= 1000;
	};

	/**
	 *	@param _val
	 *			to ease or not to ease...
	 *	@param _easing
	 *			(optional) degree of easing
	 */
	// this.setEasing = function(_val, _easeing) {
	// 	bEase = _val;
	// 	easing = _easeing;
	// };

	// ------------------------------------------------------------------------
	/**
	 *	@param _val
	 *			set a value for the delta 0.0 - 1.0
	 */
	this.setDelta = function(_val) {
		this.delta = _val;
	};
};


