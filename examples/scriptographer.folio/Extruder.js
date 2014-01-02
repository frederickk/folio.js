/**
 *	Extruder 0.0
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */

// ------------------------------------------------------------------------
// libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// load folio
var f = folio;

// document properties
var sel;
var palette;

// extrusion
var extrusionsGroup = new Group();

// mouse
var slopeLine;
var clicks = [false, false, false];
var clickPts = [];
var bDrawn = false;

// values
var values = {
	colorExtrude1: new RGBColor( 0, 1.0, 0.7 ),
	bDarkened: false,
	darkenColorPct: 20,
	colorExtrude2: new RGBColor( 1.0, 0.0, 0.7 ), //.darken(0.2),

	angle: 30,
	distance: 240,

	bUniteExtrusion: false
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
	// 	type: 'checkbox',
	// 	label: 'Darken Color'
	// },
	// darkenColorPct: {
	// 	type: 'number',
	// 	units: 'percent',
	// 	steppers: true,
	// 	increment: 1
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

	sRule: {
		type: 'ruler',
		fullSize: true,
	},


	/*
	 *	additional
	 */
	bUniteExtrusion: {
		type: 'checkbox',
		label: 'Unite Extrusion'
	},

	oRule: {
		type: 'ruler',
		fullSize: true,
	},


	/*
	 *	actions
	 */
	redefine: {
		type: 'button',
		value: 'Redefine Selection',
		fullSize: true,
		onClick: function() {
			sel = activeDocument.getItems({
				type: Item,
				selected: true
			});
			var alert = new Dialog.alert('Selection Updated', 'Extrusion will be applied to these ' + sel.length + ' selected items.');
		}
	},

	go: {
		type: 'button',
		value: 'Go! Go! Go!',
		fullSize: true,
		onClick: function() {
			Draw();
		}
	},

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// define selected items
	sel = activeDocument.getItems({
		type: Item,
		selected: true
	});


	// open palette
	palette = new Palette('Extrude 0.0', components, values);

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

	// calculate late extrusion length
	// the first item selected is chosen
	// as the benchmark item
	var extrudeAngle;
	if( !bDrawn ) {
		extrudeAngle = angleToSlope(sel[0].position, values.angle, values.distance);
	}

	// darken color by amount
	values.darkenColorAmt /= 100;

	// clean-up previous extrusions
	// if they were created
	extrusionsGroup.removeChildren();

	// setup extrusions group
	// extrusionsGroup = new Group();

	// draw the extrusion
	for( var i=0; i<sel.length; i++ ) {
		var obj = sel[i];

		// if the selected item is live type
		// it has to be outlined
		// let's clone it first
		if( f.getType(obj) == 'TextItem' ) {
			console.log( 'Outlining TextItem' );
			obj = obj.clone().createOutline();
		}

		// setup group for extruded faces
		var extrusion;

		// compound path or group?
		if( obj.hasChildren() ) {
			extrusion = new Group();
			for( var c=obj.children.length-1; c>=0; c-- ) {
				var child = obj.children[c].clone();
				// TODO: children items get filled with
				// 		 the alternate extrusion color
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

	}

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
	var holder1 = item.clone();
	holder1.strokeColor = new RGBColor( 1.0, 0.0, 1.0 );

	// copy of the item
	var holder2 = holder1.clone();
	holder2.strokeColor = new RGBColor( 0.7, 0, 1.0 );
	holder2.translate( new Point(slope.width,slope.height) );

	// iterate through curves of holder1
	// and then connect the two "holders"
	for( var cc=0; cc<holder1.curves.length; cc++ ) {
		var curve1 = holder1.curves[cc];
		var curve2 = holder2.curves[cc];

		// the path for the extruded face
		var path = new Path();

		if( curve1.isLinear() ) {
			// this works for linear paths only
			path.add( curve1.point2  );
			path.add( curve1.point1 );
			path.add( curve2.point1 );
			path.add( curve2.point2 );

			path.closed = true;
			path.strokeColor = null;
		}
		else {
			// bootleg work around... for now
			var uniteGroup = new Group();
			var step = 2;

			// iterate through curve with getLocation()
			// create a series of path items similar
			// to QuadStrip
			for ( var j=0; j<=curve1.length; j+=step ) {
				var opt1 = curve1.getLocation(j).point;
				var opt2 = curve1.getLocation(j+step).point;

				var copt1 = curve2.getLocation(j).point;
				var copt2 = curve2.getLocation(j+step).point;

				var unitePath = new Path();
				unitePath.add( new Segment( opt1 ) );
				unitePath.add( new Segment( opt2 ) );
				unitePath.add( new Segment( copt2 ) );
				unitePath.add( new Segment( copt1 ) );
				unitePath.closed = true;

				// add to unite group
				uniteGroup.appendBottom( unitePath );
			}
			// and now... the bootleg part
			// unite all unitePaths the unite Pathfinder
			path = new Pathfinder.unite( uniteGroup.children );

		}

		// TODO: darken every other face
		// have to work out the stacking order
		// if( cc % 2 == 0 ) {
			path.fillColor = color;
		// }
		// else {
		// 	darken += 0.1;
		// 	path.fillColor = color.darken( values.darkenColorPct, true );
		// }

		// add to extrusion group
		extrusion.appendBottom( path );
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

	for( var c=item.children.length-1; c>=0; c-- ) {
		var child = item.children[c].clone();
		var temp;
		if( child.hasChildren() ) {
			temp = recursiveExtrude( child, slope, color );
		}
		else {
			temp = extrude( child, slope, color );
			child.remove();
		}
		recursiveGroup.appendTop( temp );
	}

	return recursiveGroup;
};

// ------------------------------------------------------------------------
function angleAsPoints(center, angle, radius) {
	var theta = radians( angle );
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
	// line.strokeColor = new RGBColor(0,0,0);

	return [pt1, pt2];
};

// ------------------------------------------------------------------------
function angleToSlope(center, angle, distance) {
	// calculate extrude length and direction (slope)
	// since i'm terrible at math
	// this is my bootleg work-around
	var pt1 = center;
	var pt2 = new Point(
		pt1.x + distance*Math.cos( f.radians(angle) ),
		pt1.y + distance*Math.sin( f.radians(angle) )
	);

	var slope = new Size(
		(pt2.y - pt1.y),
		(pt2.x - pt1.x)
	);

	return slope;
};

function slopeAngle(slope) {
	return Math.atan( slope.width/slope.height );
};




// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
// function onMouseDown(event) {
// 	if( clicks[0] && clicks[1] ) {
// 		clicks = [false, false];
// 		clickPts = [];
// 		slopeLine.remove();
// 	}
// 	else if( !clicks[0] ) {
// 		clickPts[0] = event.point;
// 		clicks[0] = true;
// 	}
// 	else if( clicks[0] ) {
// 		clickPts[1] = event.point;
// 		clicks[1] = true;

// 		slopeLine = new Path();
// 		slopeLine.add( new Segment(clickPts[0]) );
// 		slopeLine.add( new Segment(clickPts[1]) );
// 		slopeLine.strokeColor = values.colorExtrude1;
// 		slopeLine.strokeWidth = 6;

// 		// clicks = [false, false, false];

// 		// calculate angle and distance
// 		var angle = slopeAngle( slopeLine.bounds );
// 		var distance = slopeLine.segments[0].point.getDistance( slopeLine.segments[1].point );

// 		// push to components
// 		values.angle = (degrees( angle ));
// 		values.distance = distance;

// 		// extrusion slope as
// 		// drawn by mouse
// 		bDrawn = true;
// 	}

// };

// function onMouseDrag(event) {
// };

// function onMouseUp(event) {
// };



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
// var timer = setInterval(Update, 2);
// Draw();





