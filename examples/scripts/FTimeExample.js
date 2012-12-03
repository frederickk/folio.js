console.log( 'FTime Example Loaded' );
/**
*	FTime Example 0.0
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = Frederickk;
var ftime = new f.FTime();

var stopwatch = new f.FStopwatch();

var time = {
	start: null,
	elapsed: null
};

var local;
var running;
var timer;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// Show the local time
	local = new Clock( 
		new paper.Point(
			view.bounds.width*0.25,
			view.bounds.center.y
		),
		200
	);

	// show the running time
	running = new Clock(
		view.bounds.center,
		200
	);

	// show the timer time
	timer = new Clock( 
		new paper.Point(
			view.bounds.width*0.75,
			view.bounds.center.y
		),
		200
	);
	time.elapsed = new PointText( 
		new paper.Point(
			view.bounds.width*0.75,
			view.bounds.center.y+50
		)
	);
	time.elapsed.justification = 'center';
	time.elapsed.characterStyle = {
		font: 'futura',
		fontSize: 12,
		fillColor: 'black'
	};
	time.elapsed.content = '00:00';





};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

	// get the local time
	var now = new f.FTime();
	local.setTime( ftime.toArray(now.now()) );

	// get the run time of this app
	var runTimeStr = ftime.get( event.time*1000 );
	running.setTime( ftime.toArray(runTimeStr) );
	// console.log( str );


	// get time of our stopwatch
	var timerTimeStr = ftime.get( stopwatch.get() );
	time.elapsed.content = timerTimeStr;
	timer.setTime( ftime.toArray(timerTimeStr) );

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var Clock = function(_pt, _radius) {
	// Properties
	// public
	this.s = 0;
	this.m = 0;
	this.h = 0;

	this.ticks = true;


	// private
	var pt = _pt;
	var radius = _radius;

	var group = new Group();
	
	var clockRadius = radius * 0.5;
	var secondsRadius = clockRadius * 0.90;
	var minutesRadius = clockRadius * 0.80;
	var hoursRadius = clockRadius * 0.53;
	

	// clock face
	var face = new paper.Path.Circle(pt, clockRadius);
	face.fillColor = 'white';
	face.strokeColor = 'black';
	face.strokeWidth = 9;
	group.appendTop(face);


	// clock hands
	var mpt = new paper.Point(pt.x + Math.cos(this.m) * minutesRadius, pt.y + Math.sin(this.m) * minutesRadius);
	var minutes = new paper.Path.Line( pt, mpt );
	minutes.strokeColor = 'black';
	minutes.strokeWidth = 9;
	minutes.strokeCap = 'butt';
	group.appendTop(minutes);

	var hpt = new paper.Point(pt.x + Math.cos(this.h) * hoursRadius, pt.y + Math.sin(this.h) * hoursRadius);
	var hours = new paper.Path.Line( pt, hpt );
	hours.strokeColor = 'black';
	hours.strokeWidth = 9;
	hours.strokeCap = 'butt';
	group.appendTop(hours);

	var spt = new paper.Point(pt.x + Math.cos(this.s) * secondsRadius, pt.y + Math.sin(this.s) * secondsRadius);
	var seconds = new paper.Path.Line( pt, spt );
	seconds.strokeColor = new paper.RGBColor(0.9, 0.26, 0.14);
	seconds.strokeWidth = 2;
	seconds.strokeCap = 'round';
	group.appendTop(seconds);



	if(this.ticks) {
		var groupTicks = new Group();
		for (var a=0; a<360; a+=18) {
			var x1 = pt.x + Math.cos(f.radians(a)) * (secondsRadius-3);
			var y1 = pt.y + Math.sin(f.radians(a)) * (secondsRadius-3);
			var x2 = pt.x + Math.cos(f.radians(a)) * (secondsRadius+9);
			var y2 = pt.y + Math.sin(f.radians(a)) * (secondsRadius+9);
			// var tick = new paper.Path.Circle( new paper.Point(x,y), 1.5 );
			var tick = new paper.Path.Line(
				new paper.Point(x1,y1),
				new paper.Point(x2,y2)
			);
			tick.strokeColor = 'black';
			tick.strokeWidth = 2;
			groupTicks.appendTop(tick);
		}
		group.appendTop(groupTicks);
	}



	// Methods
	this.update = function() {
		spt = new paper.Point(
			pt.x + Math.cos(this.s) * secondsRadius,
			pt.y + Math.sin(this.s) * secondsRadius
		);
		seconds.segments[1].point = spt;

		mpt = new paper.Point(
			pt.x + Math.cos(this.m) * minutesRadius,
			pt.y + Math.sin(this.m) * minutesRadius
		);
		minutes.segments[1].point = mpt;

		hpt = new paper.Point(
			pt.x + Math.cos(this.h) * hoursRadius,
			pt.y + Math.sin(this.h) * hoursRadius
		);
		hours.segments[1].point = hpt;
	};

	/*
	 *	@param time
	 * 			[hours, minutes, seconds]
	 */
	this.setTime = function(time) {
		// Angles for Math.sin() and Math.cos() start at 3 o'clock;
		// subtract (Math.PI*0.5) to make them start at the top
		this.s = f.map(time[2], 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);
		this.m = f.map(time[1], 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);
		var hour = (time[0] > 12) ? (time[0]-12) : time[0];
		this.h = f.map( Math.abs(hour), 0, 12, 0, (Math.PI*2)) - (Math.PI*0.5);

		// update hands
		this.update();
	};

	this.get = function() {
		return group;
	};

};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'space') {
		stopwatch.toggle();
	}

};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
