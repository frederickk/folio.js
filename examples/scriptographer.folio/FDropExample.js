console.log( 'FDrop Example Loaded' );
/**
 *	FDrop Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example of FDrop
 *
 */



// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var group;

var drop;
var scale = 0.001;
var lastScale = 1.0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// create background
	background = new Path.Rectangle( new Point(0,0), view.bounds.size );
	background.fillColor = '#00b2ff';
	background.strokeColor = null;


	group = new Group();

	// create pipe
	var holeCenter = new Point( view.bounds.center.x,view.bounds.center.y-112 );
	var pipeEnd = new Path.Circle(
		holeCenter,
		12
	);
	var pipeStart = new Path.Circle(
		new Point( holeCenter.x,holeCenter.y-27 ),
		6
	);

	var pipe = new Path.FChain( pipeEnd, pipeStart );
	pipe.fillColor = new RGBColor( 1.0, 1.0, 1.0 );
	pipe.strokeColor = new RGBColor( 1.0, 1.0, 1.0 );
	pipe.strokeWidth = 6;
	group.appendTop( pipe );

	pipeEnd.remove();
	pipeStart.remove();

	var hole = new Path.Circle(
		holeCenter,
		12
	);
	hole.fillColor = new RGBColor( 0.0, 0.0, 0.0 );
	group.appendTop( hole );


	// create FDrop
	drop = new Path.FDrop(
		view.bounds.center,
		100
	);
	// drop.bounds.topCenter = holeCenter;
	drop.fillColor = new RGBColor( 1.0, 1.0, 1.0 );
	drop.strokeColor = null;
	group.appendTop( drop );

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	animateDrip(event);
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	group.position = view.bounds.center;
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function animateDrip(event) {
	if( scale < 1.0 ) {
		scale += 0.02;
	}
	else {
		scale = 1.0 + ((Math.sin(event.time * 2) + 1) / 30);
	}

	drop.scale(
		scale / lastScale,
		drop.bounds.topCenter
	);
	lastScale = scale;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(true);
Draw();
