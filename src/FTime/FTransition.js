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
FrederickkPaper.FTime.FTransition = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var fadeMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStartFade = 0.0;
	var timeEndFade = 0.0;
	
	var bBeginFade = false;
	var bFadeIn = false;
	var bFadeOut = false;

	var bStart = 0;
	var easing = 0.05;

	// public
	this.delta = 1.0;


	
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.toggle = function(runtime) {
		if (bStart == 0) {
			this.fadeIn();
		}
		else {
			this.fadeOut();
		}
		_currentTime = runtime;
		update(_currentTime);
	}

	// ------------------------------------------------------------------------
	var update = function(currentTime) {
		if(bBeginFade) {
			//console.log( 'bBeginFade' );

			bBeginFade = false;
			timeStartFade = currentTime;
			if(bFadeIn) {
				timeEndFade = currentTime + parseFloat((1.0 - this.delta) * fadeMillis);
			}
			else {
				timeEndFade = currentTime + parseFloat(this.delta*fadeMillis);
			}
			if(timeEndFade == currentTime) {
				if(bFadeIn) {
					bFadeIn = false;
					this.delta = 1.0;
				}
				else {
					bFadeOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(bFadeIn) {
			//console.log( 'bFadeIn' );

			this.delta = 1.0 - parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.delta = 1.0;
			}
		}
		else if(bFadeOut) {
			//console.log( 'bFadeOut' );

			this.delta = parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.delta = 0.0;
			}
		}

		// console.log( this.delta );
	};

	// ------------------------------------------------------------------------
	this.fadeIn = function() {
		//console.log( 'fadeIn()' );

		if(bFadeIn)return;
		if(this.delta == 1.0) return;
		bBeginFade = true;
		bFadeIn = true;
		bFadeOut = false;
	};
	this.fadeOut = function() {
		//console.log( 'fadeOut()' );

		if(bFadeOut)return;
		if(this.delta == 0.0) return;
		bBeginFade = true;
		bFadeOut = true;
		bFadeIn = false;
	};

	// ------------------------------------------------------------------------
	this.isFadingIn = function() {
		return bFadeIn;
	};
	this.isFadingOut = function() {
		return bFadeOut;
	};

	// ------------------------------------------------------------------------
	this.stopFade = function() {
		bBeginFade = bFadeIn = bFadeOut = false;
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
		fadeMillis = _millis;
		fadeMillis /= 1000;
	};

};


