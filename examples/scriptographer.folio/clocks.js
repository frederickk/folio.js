console.log( 'FTime Example Loaded' );
/**
 *	FTime Example 0.0
 *	Clocks
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example of multiple closk that would Edward R. Murrow proud
 *
 */


// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// load folio
var f = folio;

var ftime = f.FTime;

// document properties
var fdate = new ftime.FDate();
var stopwatch = new ftime.FStopwatch();

var timeText = {
	local: null,
	running: null,
	timer: null,
	seventy: null
};

var local;
var running;
var timer;
var seventy;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	var size = 200;


	// Show the local time
	local = new Clock(
		new Point(
			artboard.bounds.width*0.15,
			artboard.bounds.center.y
		),
		size
	);
	timeText.local = new PointText(
		new Point(
			artboard.bounds.width*0.15,
			artboard.bounds.center.y+size
		)
	);
	timeText.local.paragraphStyle = {
		justification: 'center'
	};
	timeText.local.characterStyle = {
		font: app.fonts['Futura OTKF']['Demi'],
		fontSize: size*0.135,
		fillColor: 'black'
	};
	timeText.local.content = 'Local';


	// show the running time
	running = new Clock(
		new Point(
			artboard.bounds.width*0.38,
			artboard.bounds.center.y
		),
		size
	);
	timeText.running = timeText.local.clone();
	timeText.running.position = new Point(
			artboard.bounds.width*0.38,
			artboard.bounds.center.y+size);
	timeText.running.content = 'Running';


	// show the timer time
	timer = new Clock(
		new Point(
			artboard.bounds.width*0.62,
			artboard.bounds.center.y
		),
		size
	);
	timeText.timer = timeText.local.clone();
	timeText.timer.position = new Point(
			artboard.bounds.width*0.62,
			artboard.bounds.center.y+size);
	timeText.timer.content = 'Timer'; //'00:00:00';


	// show the time since 1. January 1970
	seventy = new Clock(
		new Point(
			artboard.bounds.width*0.85,
			artboard.bounds.center.y
		),
		size
	);
	timeText.seventy = timeText.local.clone();
	timeText.seventy.position = new Point(
			artboard.bounds.width*0.85,
			artboard.bounds.center.y+size);
	timeText.seventy.content = '1970';



};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	// Get the local time
	var now = new ftime.FDate();
	var temp = new ftime.FDate();
	local.setTime( temp.toArray(now.now()) );


	// Get the run time of this app
	var runTimeStr = temp.get( event.time*1000 );
	running.setTime( temp.toArray(runTimeStr) );


	// Get time of our stopwatch
	var timerTimeStr = temp.get( stopwatch.get() );
	if(stopwatch.isRunning()) timeText.timer.content = timerTimeStr;
	timer.setTime( temp.toArray(timerTimeStr) );


	var sinceSeventy = new Date();
	var sinceSeventyStr = temp.get( sinceSeventy.getTime() );
	seventy.setTime( temp.toArray(sinceSeventyStr) );

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
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	public
	 */
	this.s = 0;
	this.m = 0;
	this.h = 0;

	this.ticks = true;


	/*
	 *	private
	 */
	var pt = _pt;
	var radius = _radius;

	var group = new Group();

	var clockRadius = radius * 0.5;
	var secondsRadius = clockRadius * 0.90;
	var minutesRadius = clockRadius * 0.80;
	var hoursRadius = clockRadius * 0.53;


	// clock face
	var face = new Path.Circle(pt, clockRadius);
	face.fillColor = null; //'white';
	face.strokeColor = 'black';
	face.strokeWidth = 9;
	group.appendTop(face);


	// clock hands
	var mpt = new Point(pt.x + Math.cos(this.m) * minutesRadius, pt.y + Math.sin(this.m) * minutesRadius);
	var minutes = new Path.Line( pt, mpt );
	minutes.strokeColor = 'black';
	minutes.strokeWidth = 9;
	minutes.strokeCap = 'butt';
	group.appendTop(minutes);

	var hpt = new Point(pt.x + Math.cos(this.h) * hoursRadius, pt.y + Math.sin(this.h) * hoursRadius);
	var hours = new Path.Line( pt, hpt );
	hours.strokeColor = 'black';
	hours.strokeWidth = 9;
	hours.strokeCap = 'butt';
	group.appendTop(hours);

	var spt = new Point(pt.x + Math.cos(this.s) * secondsRadius, pt.y + Math.sin(this.s) * secondsRadius);
	var seconds = new Path.Line( pt, spt );
	seconds.strokeColor = new RGBColor(0.9, 0.26, 0.14);
	seconds.strokeWidth = 2;
	seconds.strokeCap = 'round';
	group.appendTop(seconds);



	if(this.ticks) {
		var groupTicks = new Group();
		for (var a=0; a<360; a+=30) {
			var x1 = pt.x + Math.cos(radians(a)) * (secondsRadius-3);
			var y1 = pt.y + Math.sin(radians(a)) * (secondsRadius-3);
			var x2 = pt.x + Math.cos(radians(a)) * (secondsRadius+9);
			var y2 = pt.y + Math.sin(radians(a)) * (secondsRadius+9);
			// var tick = new Path.Circle( new Point(x,y), 1.5 );
			var tick = new Path.Line(
				new Point(x1,y1),
				new Point(x2,y2)
			);
			tick.strokeColor = 'black';
			tick.strokeWidth = 2;
			groupTicks.appendTop(tick);
		}
		group.appendTop(groupTicks);
	}



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.update = function() {
		spt = new Point(
			pt.x + Math.cos(this.s) * secondsRadius,
			pt.y + Math.sin(this.s) * secondsRadius
		);
		seconds.segments[1].point = spt;

		mpt = new Point(
			pt.x + Math.cos(this.m) * minutesRadius,
			pt.y + Math.sin(this.m) * minutesRadius
		);
		minutes.segments[1].point = mpt;

		hpt = new Point(
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
		this.s = map(time[2], 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);
		this.m = map(time[1], 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);
		var hour = (time[0] > 12) ? (time[0]-12) : time[0];
		this.h = map( Math.abs(hour), 0, 12, 0, (Math.PI*2)) - (Math.PI*0.5);

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
function onKeyDown(event) {
	if(event.character == ' ') {
		stopwatch.toggle();
	}
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};




// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(true);
Draw();
