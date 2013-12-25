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

// values
var values = {
	color: null,
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
	svg.fillColor = 'white';
	console.log( svg );

	for( var i=0; i<svg.children.length; i++ ) {
		svg.children[2].fillColor = '#ff00ff';
		svg.children[2].position = view.center;
	}

	// type = new Group( svg.children );
	// type.position = view.center;

	// define type as children of svg
	// svg.remove();
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
	values.color = new Color( document.getElementById('color').value );
	values.angle = parseFloat(document.getElementById('angle').value);
	values.distance = parseFloat(document.getElementById('distance').value);

	// calculate slope
	var slope = paper.slope(
		values.angle,
		values.distance
	);

	// setup extrusions group
	extrusionsGroup.removeChildren();

	// draw the extrusion
	console.log('---------');
	// for( var i=0; i<type.children.length; i++ ) {
	// 	var item = type.children[i];

	// 	// extrude
	// 	// var e = Extrude(item, slope);
	// 	// e.fillColor = values.color; //new Color().random();

	// 	// add to group
	// 	// extrusionsGroup.appendTop(e);
	// }

	// type.moveAbove( extrusionsGroup );

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/**
 * extrudes shapes
 * TODO: fix face z-indexing
 *
 * @param {Item} item
 *			the item to generate extrude
 * @param {Point} slope
 *			the direction and length of extrusion
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
		// checks if item is path and makes it one,
		// if compound path, converts to group
		var item = toPath(item).toGroup();
		// item.fillColor = new Color().random();

		if( item.hasChildren() ) {
			for( var i=item.children.length-1; i>=0; i-- ) {
				var child = item.children[i];
				// child.fillColor = new Color().random();
				initialize(child);
			}
		}
		else {
			// copy the item
			var backFace = item.clone();
			// translate based on slope
			backFace.translate(new Point( slope ));

			// iterate through curves of the two faces
			// and then connect them
			var path = fromCurves(item, backFace)
			extrusion.appendBottom( path );

			// clean-up
			backFace.remove();
		}

		return extrusion;
	};

	// ------------------------------------------------------------------------


	// ------------------------------------------------------------------------
	function fromCurves(item1, item2) {
		var group = new Group();
		var step = 3;

		// the path for the extruded face
		var path = new Path();
		for( var i=0; i<item1.curves.length; i++ ) {
			var curve1 = item1.curves[i];
			var curve2 = item2.curves[i];

			for ( var j=0; j<=curve1.length; j+=step ) {
				// create a series of path items similar to QuadStrip
				var opt1 = curve1.getLocationAt(j).point;
				var opt2 = curve1.getLocationAt(j+step).point;

				var copt1 = curve2.getLocationAt(j).point;
				var copt2 = curve2.getLocationAt(j+step).point;

				path = new Path(
					new Segment( opt1 ),
					new Segment( opt2 ),
					new Segment( copt2 ),
					new Segment( copt1 )
				);
				path.closed = true;
				path.strokeCap = 'round';
				path.strokeWidth = step;

				group.appendBottom( path );
			}

		}
		return group;
	};


	// ------------------------------------------------------------------------
	function toPath(item) {
		if( item.shape != undefined) {
			return (item.shape == 'rectangle')
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
	document.getElementById('distance').value = parseInt(event.point.getDistanceToCenter()/2);
	document.getElementById('angle').value = parseInt(paper.degrees( event.point.getAngle(view.center) ));

	Draw();
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



