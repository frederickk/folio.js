console.log( 'Extruder Loaded' );
/**
 * Extruder 0.0
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * simple extrusion of path shapes
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



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// setup group for extrusion
	extrusionsGroup = new Group();

	// import svg
	svg = project.importSVG( document.getElementById('svg'), true );

	type = new Group( svg.children );
	type.position = view.center;

	// define type as children of svg
	svg.remove();
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
	values.angle = parseFloat(document.getElementById('angle').value);
	values.distance = parseFloat(document.getElementById('distance').value);

	// calculate slope
	var extrudeAngle = angleToSlope(
		type.children[0].position,
		values.angle,
		values.distance
	);

	// setup extrusions group
	if(extrusionsGroup) extrusionsGroup.remove();
	extrusionsGroup = new Group(type);

	// draw the extrusion
	for( var i=0; i<type.children.length; i++ ) {
		var item = type.children[i];
		item.strokeColor = 'white';
		item.strokeWidth = 2;

		// extrude
		var e = Extrude(item, extrudeAngle);
		e.fillColor = null; //'white';
		e.strokeColor = 'green';

		// add to group
		extrusionsGroup.appendBottom(e);

		// hide original object
		item.fillColor = null
		item.strokeColor = null
	}


	// 	// unite all of the faces into
	// 	// one path (if bUniteExtrusion)
	// 	if( values.bUniteExtrusion ) {
	// 		var temp = new Pathfinder.unite( extrusion.children );
	// 		// clean out all elements in the extrusion group
	// 		extrusion.removeChildren();
	// 		// add the lone united extrusion
	// 		// back into the extrusion group
	// 		extrusion.appendBottom( temp );
	// 	}

	// 	// move original item above
	// 	// the extrusion group and
	// 	// group everything together
	// 	extrusion.appendTop( obj.clone() );

	// 	// group all extruded elements
	// 	if(extrudeAngle.width < 0) {
	// 		extrusionsGroup.appendTop( extrusion );
	// 	}
	// 	else {
	// 		extrusionsGroup.appendBottom( extrusion );
	// 	}




};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/**
 * extrudes shapes
 * TODO: make into a class
 * TODO: fix face z-indexing
 *
 * @param {Item} item
 * @param {Size} slope
 * 			the direction and length of extrusion
 *
 * @return {Group} the extrusion path
 *
 */
function Extrude(item, slope) {
	//
	// Properties
	//
	var extrusion = new Group();


	//
	// Methods
	//
	function initialize(item) {
		if( item.hasChildren() ) {
			console.log( item.hasChildren() );
			// for( var i=item.children.length-1; i>=0; i-- ) {
			// 	initialize(item.children[i]);
			// }
		}
		else {
			// pull the points for drawing the
			// extrusion sides
			var holder1 = toPath(item);

			// copy of the item
			var holder2 = holder1.clone();
			holder2.translate( new Point(slope.width, slope.height) );

			// iterate through curves of holder1
			// and then connect the two "holders"
			extrusion.appendBottom( fromCurves(holder1, holder2) );

			// clean-up
			// holder1.remove();
			// holder2.remove();
		}

		return extrusion;
	};


	// ------------------------------------------------------------------------
	function fromCurves(item1, item2) {
		var group = new Group();
		var step = 2;

		for( var i=0; i<item1.curves.length; i++ ) {
			var curve1 = item1.curves[i];
			var curve2 = item2.curves[i];

			// the path for the extruded face
			var path = new Path();

			var uniteGroup = new Group();

			// iterate through curve with getLocation()
			// create a series of path items similar
			// to QuadStrip
			for ( var j=0; j<=curve1.length; j+=step ) {
				var opt1 = curve1.getLocationAt(j).point;
				var opt2 = curve1.getLocationAt(j+step).point;

				var copt1 = curve2.getLocationAt(j).point;
				var copt2 = curve2.getLocationAt(j+step).point;

				var unitePath = new Path();
				unitePath.add(new Segment( opt1 ));
				unitePath.add(new Segment( opt2 ));
				unitePath.add(new Segment( copt2 ));
				unitePath.add(new Segment( copt1 ));
				unitePath.closed = true;
				unitePath.strokeWidth = step;

				uniteGroup.appendBottom( unitePath );
			}

			group.appendBottom( uniteGroup );
		}
		return group;
	};


	// ------------------------------------------------------------------------
	function toPath(item) {
		if( item.shape ) {
			return (item.shape === 'rectangle')
				? new Path.Rectangle(item)
				: new Path.Ellipse(item);
		}
		else {
			return item;
		}
	};


	// ------------------------------------------------------------------------
	return initialize(item);
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



