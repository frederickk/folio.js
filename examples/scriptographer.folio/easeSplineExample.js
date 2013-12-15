/**
 *	Ease Spline Example
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
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



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
var anchors = [];
var spline;

// items
var distribution;


// values
var values = {
	numItems: 10,
	rgbFill:[ 0.0, random(1.0), random(0.7) ],
};

// components
var components = {
	numItems: {
		type:			'number',
		label:			'Number of Items',
	}
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// initiate dialog
	var palette = new Dialog.prompt('Ease Distribution', components, values);


	// anchors
	anchors[0] = new Point(
		view.bounds.center.x + 150,
		view.bounds.center.y - 150
	);
	anchors[1] = new Point(
		view.bounds.center.x - 150,
		view.bounds.center.y + 150
	);

	// create spline
	spline = new Path( anchors );
	spline.strokeColor = new RGBColor(values.rgbFill);
	spline.strokeWidth = 2;
	spline.fillColor = null;


	// create distribution items
	distribution = new Group();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

	// calculate key spline values
	keyspline = new ease.spline(
		spline.segments[0].handleOut,
		spline.segments[1].handleIn
	);

	// distributed items
	distribution.remove();
	distribution = ItemEase(
		keyspline,
		values.numItems,
		new Point(
			view.bounds.width*0.3,
			0
		),
		new Size( 300, 150 )
	);

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function ItemEase(keyspline, num, point, size) {
	var group = new Group();

	for( var i=0; i<num; i++ ) {
		var e = keyspline.get(i/num);
		var center = new Point(
			e*size.width,
			0 //1-e*size.height
		);

		// point marker
		var marker = new Path.Circle( center, 7 );
		marker.fillColor = values.rgbFill;
		marker.strokeColor = null;
		group.appendTop( marker );
	}

	group.position = point;
	return group;
};

// ------------------------------------------------------------------------
function GridEase(keyspline, num, point, size) {
	var group = new Group();

	for( var i=0; i<num; i++ ) {
		for( var j=0; j<num; j++ ) {
			var ex = keyspline.get(i/num);
			var ey = keyspline.get(j/num);
			var center = new Point(
				ex*size.width,
				ey*size.height
			);

			// point marker
			var marker = new Path.Circle( center, 7 );
			marker.fillColor = values.rgbFill;
			marker.strokeColor = null;
			group.appendTop( marker );
		}
	}

	group.position = point;
	return group;
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
