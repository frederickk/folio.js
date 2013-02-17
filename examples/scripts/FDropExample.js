console.log( 'FDrop Example Loaded' );
/**
 *	FDrop Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of FDrop
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// depreciating FShape namespace
// no longer necessary use paper.Path
//var fshape = f.FShape;

var group;

var drop;
var scale = 0.001;
var lastScale = 1.0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	group = new Group();

	// create pipe
	var holeCenter = new Point( view.bounds.center.x,view.bounds.center.y-112 );
	var pipe = new Path.FChain(
		new Path.Circle(
			holeCenter,
			12
		),
		new Path.Circle(
			new Point( holeCenter.x,holeCenter.y-27 ),
			6
		)
	);
	pipe.fillColor = new RgbColor( 1.0, 1.0, 1.0 );
	pipe.strokeColor = new RgbColor( 1.0, 1.0, 1.0 );
	pipe.strokeWidth = 6;
	group.appendTop( pipe );

	var hole = new Path.Circle(
		holeCenter,
		12
	);
	hole.fillColor = new RgbColor( 0.0, 0.0, 0.0 );
	group.appendTop( hole );


	// create FDrop
	drop = new Path.FDrop(
		view.bounds.center,
		100
	);
	// drop.bounds.topCenter = holeCenter;
	drop.fillColor = new RgbColor( 1.0, 1.0, 1.0 );
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
		scale += 0.01;
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
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
};

function onMouseDown(event) {
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
