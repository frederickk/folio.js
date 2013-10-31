console.log( 'Ease Spline Loaded' );
/**
 *	Ease Example 0.0
 *	Easing
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 * 
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of the easing methods
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var ftime = f.FTime;

// easing
var ease = new ftime.Ease();
var keyspline;

// spline curve
var handles = [];
var handleLines = [];
var anchors = [];
var spline;

// clock
var clock;

// items
var distribution;

// interaction
var hitPath;
var hitOptions = {
	fill: true,
	tolerance: 10
};

// attributes
var rgbFill = [ 1.0, 1.0, 1.0 ];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// anchors
	anchors[0] = new Point(
		view.bounds.center.x + 150,
		view.bounds.center.y - 150
	);
	anchors[1] = new Point(
		view.bounds.center.x - 150,
		view.bounds.center.y + 150
	);

	for( var i=0; i<anchors.length; i++ ) {
		var a = new Path.Circle( anchors[i], 3 )
		a.fillColor = 'red';
	}


	// bezier handles
	// X and Y are relative to anchor
	for( var i=0; i<anchors.length; i++ ) {
		handles[i] = new Path.Circle( 
			new Point(
				(i % 2 == 0) ? anchors[i].x - 61 : anchors[i].x + 61,
				(i % 2 == 0) ? anchors[i].y + 61 : anchors[i].y - 61
			), 9 );
		handles[i].name = '__handle';
		handles[i].fillColor = 'black';


		// handle lines
		handleLines[i] = new Path.Line(
			anchors[i], 
			handles[i].position
		);
		handleLines[i].strokeWidth = 2;
		handleLines[i].strokeColor = 'black'
	}



	// create spline
	var handleIn = handles[0].position; //new Point(-80, -100);
	var handleOut = new Point(80, 100);

	var segment1 = new Segment(anchors[0], null, handleOut);
	var segment2 = new Segment(anchors[1], handleIn, null);

	spline = new Path( 
		segment1,
		segment2
	);
	spline.strokeColor = new Color(rgbFill);
	spline.strokeWidth = 2;
	spline.fillColor = null;


	// create distribution items
	distribution = new Group();

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	// slow the time down 50%
	var t = event.time*0.5;

	// pseudo normalize the time
	var tnorm = t % 1;


	// calculate key spline values
	keyspline = new ease.spline(
		handles[0].position,
		handles[1].position
	);


	// clock
	clock = new TimerClock( 
		new Point(
			view.bounds.center.x - view.bounds.width*0.3,
			view.bounds.center.y
		),
		100,
		keyspline.get(tnorm)
	);
	clock.fillColor = new Color(rgbFill);


	// distributed items
	distribution.remove();
	distribution = ItemEase(
		keyspline,
		10, 
		new Point(
			view.bounds.center.x + view.bounds.width*0.3,
			view.bounds.center.y
		),
		new Size( 300, 150 )
	);
	
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {

	for( var i=0; i<anchors.length; i++ ) {
		handleLines[i].segments[1].point = handles[i].position;
	}

	spline.segments[0].handleOut = new Point(
		anchors[0].x - handles[0].position.x, 
		anchors[0].y - handles[0].position.y
	);
	spline.segments[1].handleIn = new Point(
		anchors[1].x - handles[1].position.x, 
		anchors[1].y - handles[1].position.y
	);


};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/**
 *
 *	A simple 'pie-chart' style timer
 *
 *	@param {Point} center
 *			 the center point of the circle
 *	@param {Number} radius
 *			the radius of the timer clock
 *	@param {Number} time
 *			normalized time value (0.0 - 1.0)
 *
 *	@example
 *
 */
var TimerClock = function( center, radius, time ) {
	// clean out previous instances
	// there has to be a better way to animate objects
	// if( values.bVerbose ) console.log( project.activeLayer.children.length );
	if( project.activeLayer.children['__TimerClock'] ) {
		project.activeLayer.children['__TimerClock'].remove();
	}

	time = (time != undefined) 
		? time
		: 1.0;
	var angle = (Math.PI*2.001) * time;

	var from = new Point(
		center.x + radius * Math.cos(Math.PI*0),
		center.y + radius * Math.sin(Math.PI*0)
	);
	var through = new Point(
		center.x + radius * Math.cos(angle/2),
		center.y + radius * Math.sin(angle/2)
	);
	var to = new Point(
		center.x + radius * Math.cos(angle),
		center.y + radius * Math.sin(angle)
	);

	var path = new Path.Arc(from, through, to);
	path.add( center );
	path.name = '__TimerClock';
	return path;
};


// ------------------------------------------------------------------------
function ItemEase(keyspline, num, point, size) {
	var group = new Group();
	var path = new Path;

	for( var i=0; i<num; i++ ) {
		var e = keyspline.get(i/num);
		var center = new Point(
			e*size.width,
			0 //1-e*size.height
		);

		// point marker
		var marker = new Path.Circle( center, 7 );
		marker.fillColor = 'FF1E1E';
		marker.strokeColor = null;
		group.appendTop( marker );

		// path
		path.add( center );
	}

	path.strokeColor = new Color(rgbFill);
	path.strokeWidth = 18;
	path.fillColor = null;
	path.strokeCap = 'round';
	group.appendBottom( path );

	group.position = point;
	return group;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
	hitPath = null;
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	if (hitResult) {
		if (hitResult.item.name == '__handle') {
			hitPath = hitResult.item;
		}
	}
};

function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	if (hitResult && hitResult.item && hitResult.item.name == '__handle') {
		hitResult.item.selected = true;
	}
};

function onMouseDrag(event) {
	if (hitPath) {
		hitPath.position = event.point;
		Draw();
	}
};

// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
