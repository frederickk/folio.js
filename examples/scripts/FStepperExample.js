console.log( 'FStepper Example Loaded' );
/**
 *	FStepper Example 0.0
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of lerping points, sunrise, sunset
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// the FTime namespace
var ftime = f.FTime;

// Stepper for animations
var move;
var blend;
var ball;
// holder for ball's points
var points = [];
// holder for ball's colors
var colors = [];

var background;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// Setup background
	background = new Path.Rectangle( view.bounds.topLeft, view.bounds.bottomRight );

	// initiate move FStepper
	move = new ftime.FStepper();
	// Set the time length to 9 seconds
	move.setSeconds( 9 );

	// start point
	points[0] = new Point(view.bounds.width,view.bounds.height);
	// end point
	points[1] = new Point(0,0);

	// initiate blend FStepper
	blend = new ftime.FStepper();
	// Set the time length to 18000 milliseconds (== 18 seconds)
	blend.setMillis( 18000 );

	// swap colors
	colors[0] = new Color(95/255, 56/255, 102/255);
	colors[1] = new Color(241/255, 93/255, 94/255);

	// this is the ball we'll animate with the stepper
	ball = new Path.Circle( points[0], 60 );
	ball.fillColor = new Color(1.0, 1.0, 1.0);

	// start the FSteppers
	move.toggle();
	blend.toggle();

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	// required to keep the stepper in sync with our script
	move.update( event.time );
	blend.update( event.time );

	// when the stepper has reach it's end within the
	// time alotted, it's done
	if( move.isDone() ) {
		// tell the stepper to start counting again
		move.toggle();
	}
	// when the stepper has reach it's end within the
	// time alotted, it's done
	if( blend.isDone() ) {
		// tell the stepper to start counting again
		blend.toggle();
	}

	// redraw to update scene
	Draw();
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	background.fillColor = colors[1];

	// in order to animate the ball, we'll lerp from
	// point1 to point2
	// var pos = points[0].lerp(
	// 	points[1],
	// 	move.delta
	// );
	var pos = new Point(
		lerp( points[0].x, points[1].x, move.delta ),
		lerp( points[0].y, points[1].y, move.delta )
	);

	// move the ball on an arc
	pos.x *= Math.cos(move.delta);
	pos.y *= -Math.sin(move.delta)*2;
	ball.position = pos;
	ball.translate( 0, view.bounds.height );

	// blend the colors from one to the other
	var col = colors[0].lerp(
		new Color(1.0, 1.0, 1.0),
		blend.delta
	);
	ball.fillColor = col;
};




// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
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
	// when any key is pressed the colors swap
	temp = colors[0];
	colors[0] = colors[1];
	colors[1] = temp;
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
