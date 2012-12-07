/**
 *  
 *	FTransition.js
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
 *	FTransition
 *
 */
frederickkPaper.FTime.FTransition = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var transMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStart = 0.0;
	var timeEnd = 0.0;
	
	var bToggleStart = 0;
	var bBeginTrans = false;
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
	this.toggle = function() {
		if (bToggleStart == 0) {
			bToggleStart = 1;
			this.transOut();
		}
		else {
			bToggleStart = 0;
			this.transIn();
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
		if(bBeginTrans) {
			bBeginTrans = false;
			timeStart = currentTime;
			if(bIn) {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + ((1.0 - this.delta) * transMillis)), 3 );
			}
			else {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + (this.delta*transMillis)), 3 );
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
			this.delta = frederickkPaper.roundDecimal( (1.0 - ((timeEnd - currentTime) / transMillis)), 3 );
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
			this.delta = frederickkPaper.roundDecimal( ((timeEnd - currentTime) / transMillis), 3 );
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
	this.transIn = function() {
		if(bIn) return;
		if(this.delta == 1.0) return;
		bBeginTrans = true;
		bIn = true;
		bOut = false;
	};
	this.transOut = function() {
		if(bOut) return;
		if(this.delta == 0.0) return;
		bBeginTrans = true;
		bOut = true;
		bIn = false;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@return
	 *			if the object is transitioning in
	 */
	this.isIn = function() {
		return bIn;
	};
	/**
	 *	@return
	 *			if the object is transitioning out
	 */
	this.isOut = function() {
		return bOut;
	};

	/**
	 *	@return
	 *			if the object has finished it's transition
	 */
	this.isDone = function() {
		if(this.delta < 1.0 && this.delta > 0.0) return false
		else return true
	};

	// ------------------------------------------------------------------------
	this.stop = function() {
		bBeginTrans = bIn = bOut = false;
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
		transMillis = _millis;
		transMillis /= 1000;
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

};


