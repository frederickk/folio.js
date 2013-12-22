console.log( 'Extruder Loaded' );
/**
 *	Extruder 0.0
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	simple extrusion of path shapes
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// document properties
var svg;
var type;

// extrusion
var extrusionsGroup;

// mouse
var slopeLine;
var clicks = [false, false, false];
var clickPts = [];
var bDrawn = false;

// values
var values = {
	colorExtrude1: null,
	bDarkened: false,
	darkenColorPct: 20,

	angle: null,
	distance: null
};

// components
var components = {
	/*
	 *	extrusion
	 */
	colorExtrude1: {
		type: 'color',
		label: 'Extrusion Color'
	},

	// bDarkened: {
	//	type: 'checkbox',
	//	label: 'Darken Color'
	// },
	// darkenColorPct: {
	//	type: 'number',
	//	units: 'percent',
	//	steppers: true,
	//	increment: 1
	// },
	angle: {
		type: 'number',
		label: 'Angle',
		units: 'degree',
		steppers: true,
		increment: 1
	},
	distance: {
		type: 'number',
		label: 'Distance',
		units: 'point',
		steppers: true,
		increment: 1
	},



};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// setup group for extrusion
	extrusionsGroup = new Group();

	// import svg
	svg = project.importSVG(document.getElementById('svg'));
	// re-position svg
	svg.position = new Point( view.bounds.width/2-svg.bounds.width/2, view.bounds.height/2-svg.bounds.height/2 );

	// define type as children of svg
	type = new Group( svg.children );

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	// get values from interface components
	values.colorExtrude1 = new Color( document.getElementById('colorExtrude1').value );
	values.angle = document.getElementById('angle').value;
	values.distance = document.getElementById('distance').value;


	// calculate late extrusion length
	// the first item selected is chosen
	// as the benchmark item
	var extrudeAngle;
	if( !bDrawn ) {
		extrudeAngle = angleToSlope(type.children[0].position, values.angle, values.distance);
	}

	// darken color by amount
	values.darkenColorAmt /= 100;

	// clean-up previous extrusions
	// if they were created
	extrusionsGroup.removeChildren();

	// setup extrusions group
	// extrusionsGroup = new Group();

	// draw the extrusion
	for( var i=0; i<type.children.length; i++ ) {
		var obj = type.children[i];
		obj.fillColor = new Color( 0.0, 0.0, 0.0 );
		obj.strokeColor = new Color( 0.0, 0.0, 0.0 );
		obj.strokeWidth = 2;

		// setup group for extruded faces
		var extrusion;

		// compound path or group?
		if( obj.hasChildren() ) {
			extrusion = new Group();
			for( var c=obj.children.length-1; c>=0; c-- ) {
				var child = obj.children[c].clone();
				// TODO: children items get filled with
				//		 the alternate extrusion color
				var temp = recursiveExtrude( child, extrudeAngle, values.colorExtrude1 );
				extrusion.appendTop( temp );
				child.remove();
			}
		}
		// lone wolf?
		else {
			// lone items get filled with
			// the main extrusion color
			extrusion = extrude( obj, extrudeAngle, values.colorExtrude1 );
		}

		// unite all of the faces into
		// one path (if bUniteExtrusion)
		if( values.bUniteExtrusion ) {
			var temp = new Pathfinder.unite( extrusion.children );
			// clean out all elements in the extrusion group
			extrusion.removeChildren();
			// add the lone united extrusion
			// back into the extrusion group
			extrusion.appendBottom( temp );
		}

		// move original item above
		// the extrusion group and
		// group everything together
		extrusion.appendTop( obj.clone() );

		// group all extruded elements
		if(extrudeAngle.width < 0) {
			extrusionsGroup.appendTop( extrusion );
		}
		else {
			extrusionsGroup.appendBottom( extrusion );
		}

		// hide original object
		obj.fillColor = null
		obj.strokeColor = null

	}

	// center the type
	extrusionsGroup.position = new Point(
		view.bounds.width/2,
		view.bounds.height/2
	);

	// assume extrusion was defined
	// by mouse and reset
	bDrawn = false;

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/**
 *
 *	extrudes shapes
 *	TODO: make into a class
 *	TODO: fix face z-indexing
 *
 *	@param {Item} item
 *				the Path.Item to extrude
 *	@param {Size} slope
 *				the direction and length of extrusion ()
 *	@param {Color} color
 *				(optional) main color of extrusion
 *
 */
function extrude(item, slope, color) {
	// extrusion holder
	var extrusion = new Group();

	// pull the points for drawing the
	// extrusion sides
	var holder1 = item; //.clone();
	holder1.strokeColor = new Color( 1.0, 0.0, 1.0 );

	// copy of the item
	var holder2 = holder1.clone();
	holder2.strokeColor = new Color( 0.7, 0, 1.0 );
	holder2.translate( new Point(slope.width,slope.height) );

	// iterate through curves of holder1
	// and then connect the two "holders"
	for( var cc=0; cc<holder1.curves.length; cc++ ) {
		var curve1 = holder1.curves[cc];
		var curve2 = holder2.curves[cc];

		// the path for the extruded face
		var path = new Path();

		var uniteGroup = new Group();
		var step = 2;

		// iterate through curve with getLocation()
		// create a series of path items similar
		// to QuadStrip
		for ( var j=0; j<=curve1.length; j+=step ) {
			var opt1 = curve1.getLocationAt(j).point;
			var opt2 = curve1.getLocationAt(j+step).point;

			var copt1 = curve2.getLocationAt(j).point;
			var copt2 = curve2.getLocationAt(j+step).point;

			var unitePath = new Path();
			unitePath.add( new Segment( opt1 ) );
			unitePath.add( new Segment( opt2 ) );
			unitePath.add( new Segment( copt2 ) );
			unitePath.add( new Segment( copt1 ) );
			unitePath.closed = true;

			unitePath.strokeColor = values.colorExtrude1;
			unitePath.strokeWidth = step;

			// add to unite group
			uniteGroup.appendBottom( unitePath );
		}

		// add to extrusion group
		extrusion.appendBottom( uniteGroup );
	}

	// clean-up
	holder1.remove();
	holder2.remove();

	// move parent to top
	item.moveAbove( extrusion );

	return extrusion;
};


/**
 *
 *	recursive extrusion
 *	TODO: make a part of "master" extrusion class
 *
 *	@param {Item} item
 *				the Path.Item to extrude
 *	@param {Size} slope
 *				the direction and length of extrusion ()
 *	@param {Color} color
 *				(optional) main color of extrusion
 *
 */
function recursiveExtrude(item, slope, color) {
	var recursiveGroup = new Group();

	var temp;
	if(item.hasChildren()) {
		for( var c=item.children.length-1; c>=0; c-- ) {
			var child = item.children[c];//.clone();
			if( child.hasChildren() ) {
				temp = recursiveExtrude( child, slope, color );
			}
			else {
				temp = extrude( child, slope, color );
				child.remove();
			}
			recursiveGroup.appendTop( temp );
		}
	}
	else {
		temp = extrude( item, slope, color );
	}
	recursiveGroup.appendTop( temp );

	return recursiveGroup;
};

// ------------------------------------------------------------------------
function angleAsPoints(center, angle, radius) {
	var theta = paper.radians( angle );
	radius /= 2;

	var pt1 = new Point(
		center.x + radius*Math.cos(theta),
		center.y - radius*Math.sin(theta)
	);
	var pt2 = new Point(
		center.x - radius*Math.cos(theta),
		center.y + radius*Math.sin(theta)
	)
	// // debug
	// var line = new Path.Line( pt1, pt2 );
	// line.strokeColor = new Color(0,0,0);

	return [pt1, pt2];
};

// ------------------------------------------------------------------------
function angleToSlope(center, angle, distance) {
	// calculate extrude length and direction (slope)
	// since i'm terrible at math
	// this is my bootleg work-around
	var pt1 = center;
	var pt2 = new Point(
		pt1.x + distance*Math.cos( paper.radians(angle) ),
		pt1.y + distance*Math.sin( paper.radians(angle) )
	);

	var slope = new Size(
		(pt2.y - pt1.y),
		(pt2.x - pt1.x)
	);

	return slope;
};

function slopeToAngle(slope) {
	return Math.atan( slope.width/slope.height );
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

// ------------------------------------------------------------------------
function onMouseDown(event) {
	// if( clicks[0] && clicks[1] ) {
	//	clicks = [false, false];
	//	clickPts = [];
	//	slopeLine.remove();
	// }
	// else if( !clicks[0] ) {
	//	clickPts[0] = event.point;
	//	clicks[0] = true;
	// }
	// else if( clicks[0] ) {
	//	clickPts[1] = event.point;
	//	clicks[1] = true;

	//	slopeLine = new Path();
	//	slopeLine.add( new Segment(clickPts[0]) );
	//	slopeLine.add( new Segment(clickPts[1]) );
	//	slopeLine.strokeColor = values.colorExtrude1;
	//	slopeLine.strokeWidth = 6;

	//	// clicks = [false, false, false];

	//	// calculate angle and distance
	//	var angle = slopeToAngle( slopeLine.bounds );
	//	var distance = slopeLine.segments[0].point.getDistance( slopeLine.segments[1].point );

	//	// push to components
	//	values.angle = ( f.degrees( angle ) );
	//	values.distance = distance;

	//	// extrusion slope as
	//	// drawn by mouse
	//	bDrawn = true;

	// }

};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};



