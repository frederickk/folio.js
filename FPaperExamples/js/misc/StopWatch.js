var StopWatch = function() {
	var now;
	var timeInMs = 0;
	var bStart = 0;

	this.StartStop = function() {
		if (bStart == 0) {
			bStart = 1;
			then = new Date();
			then.setTime(then.getTime() - timeInMs);
		}
		else {
			bStart = 0;
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
	}

	this.Reset = function() {
		bStart = 0;
		timeInMs = 0;
	}

	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	}

}