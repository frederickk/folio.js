/**
 *  
 *	FFade.js
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
 *	FFade
 *
 */
Frederickk.FFade = function() {
	// Properties
	// private
	var fadeMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStartFade = 0.0;
	var timeEndFade = 0.0;
	
	var bBeginFade = false;
	var bFadeIn = false;
	var bFadeOut = false;

	// public
	this.alpha = 1.0;


	
	// Methods
	this.update = function() {
		_currentTime = new Date().getMilliseconds();
		this.update(_currentTime);
	};
	this.update = function(currentTime) {
		if(bBeginFade) {
			bBeginFade = false;
			timeStartFade = currentTime;
			if(bFadeIn) {
				timeEndFade = currentTime + parseFloat((1.0 - this.alpha) * fadeMillis);
			}
			else {
				timeEndFade = currentTime + parseFloat(this.alpha*fadeMillis);
			}
			if(timeEndFade == currentTime) {
				if(bFadeIn) {
					bFadeIn = false;
					this.alpha = 1.0;
				}
				else {
					bFadeOut = false;
					this.alpha = 0.0;
				}
			}
		}
		if(bFadeIn) {
			this.alpha = 1.0 - parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 1.0;
			}
		}
		else if(bFadeOut) {
			this.alpha = parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 0.0;
			}
		}
	};

	this.fadeIn = function() {
		if(bFadeIn)return;
		if(this.alpha == 1.0) return;
		bBeginFade = true;
		bFadeIn = true;
		bFadeOut = false;
	};
	this.fadeOut = function() {
		if(bFadeOut)return;
		if(this.alpha == 0.0) return;
		bBeginFade = true;
		bFadeOut = true;
		bFadeIn = false;
	};

	this.isFadingIn = function() {
		return bFadeIn;
	};
	this.isFadingOut = function() {
		return bFadeOut;
	};
	this.stopFade = function() {
		bBeginFade = bFadeIn = bFadeOut = false;
	};



	// sets
	/**
	 *	@param _seconds
	 *			length of fade in seconds 
	 */
	this.setFadeSeconds = function(_seconds) {
		setFadeMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds 
	 */
	this.setFadeMillis = function(_millis) {
		fadeMillis = _millis;
	};

};


