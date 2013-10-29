/**
 *
 *	FStepper.js
 *
 */


folio.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _stepMillis = 1000; // Set to default of 1s OR 1000ms

	var _timeStart = 0.0;
	var _timeEnd = 0.0;

	var _bToggleStart = 0;
	var _bBeginStpper = false;
	var _bIn = false;
	var _bOut = false;
	var _bDone = true;

	var _easing = 0.05;
	var _bEase = true;

	/*
	 *	public
	 */
	this.delta = 1.0;
	this.counter = -1;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/*
	 *
	 *	toggle (start/stop) the stepper
	 *
	 */
	this.toggle = function() {
		if (_bToggleStart == 0) {
			_bToggleStart = 1;
			this.stepOut();
		}
		else {
			_bToggleStart = 0;
			this.stepIn();
		}
	}

	// ------------------------------------------------------------------------
	/*
	 *	TODO: implement ability to add _easing functions
	 *
	 *	required function to keep the timing in sync
	 *	with the application
	 *
	 *	@param currentTime
	 *			the elapsed time of the application in seconds
	 */
	this.update = function(currentTime) {
		if(_bBeginStpper) {
			_bBeginStpper = false;
			_timeStart = currentTime;
			if(_bIn) {
				_timeEnd = paper.round( (currentTime + ((1.0 - this.delta) * _stepMillis)), 3 );
			}
			else {
				_timeEnd = paper.round( (currentTime + (this.delta*_stepMillis)), 3 );
			}
			if(_timeEnd <= currentTime) {
				if(_bIn) {
					_bIn = false;
					this.delta = 1.0;
				}
				else {
					_bOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(_bIn) {
			this.delta = paper.round( (1.0 - ((_timeEnd - currentTime) / _stepMillis)), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 1.0;
				this.counter++;
				return;
			}
		}
		else if(_bOut) {
			this.delta = paper.round( ((_timeEnd - currentTime) / _stepMillis), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 0.0;
				this.counter++;
				return;
			}
		}
	};

	// ------------------------------------------------------------------------
	/*
	 *
	 *	toggle stepping in (++)
	 *
	 */
	this.stepIn = function() {
		if(_bIn) return;
		if(this.delta == 1.0) return;
		_bBeginStpper = true;
		_bIn = true;
		_bOut = false;
	};

	/*
	 *
	 *	toggle stepping out (--)
	 *
	 */
	this.stepOut = function() {
		if(_bOut) return;
		if(this.delta == 0.0) return;
		_bBeginStpper = true;
		_bOut = true;
		_bIn = false;
	};

	// ------------------------------------------------------------------------
	/*
	 *	@return if the object is stepping in
	 */
	this.isIn = function() {
		return _bIn;
	};
	/*
	 *	@return if the object is stepping out
	 */
	this.isOut = function() {
		return _bOut;
	};

	/*
	 *	@return if the object has finished it's stepping
	 */
	this.isDone = function() {
		if(this.delta < 1.0 && this.delta > 0.0) return false;
		else if(this.delta > 1.0) {
			this.delta = 1.0;
			return true;
		}
		else if(this.delta < 0.0) {
			this.delta = 0.0;
			return true;
		}
	};

	// ------------------------------------------------------------------------
	/*
	 *
	 *	stop stepping
	 *
	 */
	this.stop = function() {
		_bBeginStpper = _bIn = _bOut = false;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/*
	 *	@param _seconds
	 *			length of fade in seconds
	 */
	this.setSeconds = function(_seconds) {
		this.setMillis( parseInt(_seconds * 1000.0) );
	};
	/*
	 *	@param _millis
	 *			length of fade in milliseconds
	 */
	this.setMillis = function(_millis) {
		_stepMillis = _millis;
		_stepMillis /= 1000;
	};

	/*
	 *	@param _val
	 *			to ease or not to ease...
	 *	@param __easing
	 *			(optional) degree of _easing
	 */
	// this.setEasing = function(_val, _easeing) {
	// 	_bEase = _val;
	// 	_easing = _easeing;
	// };

	// ------------------------------------------------------------------------
	/*
	 *	@param _val
	 *			set a value for the delta 0.0 - 1.0
	 */
	this.setDelta = function(_val) {
		this.delta = _val;
	};
};


