console.log( 'FStepper Example Loaded' );
/**
 *	FStepper Example 0.0
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of lerping points, sunrise, sunset
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

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
	points[0] = view.bounds.topLeft;
	// end point
	points[1] = view.bounds.bottomRight;

	// initiate blend FStepper
	blend = new ftime.FStepper();
	// Set the time length to 18000 milliseconds (== 18 seconds)
	blend.setMillis( 18000 );

	// swap colors
	colors[0] = new paper.RGBColor(95/255, 56/255, 102/255);
	colors[1] = new paper.RGBColor(241/255, 93/255, 94/255);

	// this is the ball we'll animate with the stepper
	ball = new Path.Circle( points[0], 60 );
	ball.fillColor = new paper.RGBColor(1.0, 1.0, 1.0);

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
	var pos = new f.FPoint().lerp(
		points[0],
		points[1],
		move.delta
	);
	// move the ball in an arc
	pos.x *= Math.cos(move.delta);
	pos.y *= -Math.sin(move.delta)*2;
	ball.position = pos;
	ball.translate( 0, view.bounds.height );

	// blend the colors from one to the other
	var col = new f.FColor().lerpRGBColor(
		new paper.RGBColor(1.0, 1.0, 1.0),
		colors[0],
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
