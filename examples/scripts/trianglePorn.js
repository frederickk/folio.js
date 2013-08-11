console.log( 'Triangle Porn' );
/**
 *	FTriangle Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of FTriangle
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// ftime
var ft = f.FTime;

// triangles
var points;
var triangulation;
var triangles;

var rgbColors = [
	[ 255/255, 68/255, 100/255 ],
	[ 242/255, 204/255, 68/255 ],
	[ 144/255, 39/255, 142/255 ]
];

// hatching density
var compareArea;
var density = {
	max: 30,
	min: 6,
	value: 1.0,
	strokeWidth: 1.5,
	background: true
	// clipmask: true
};

// reflection markers 
var reflectMarkers;

// hit paths
var hitPath;
var hitSegment;
var hitOptions = {
	segments: true,
	fill: true,
	tolerance: 20
};




// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// create initial points
	points = [
		new Point( view.bounds.width/2,140 ), // top
		new Point( view.bounds.width-18,view.bounds.height-140 ),
		new Point( 18, view.bounds.height-140 )
	];


	// create reflection pointers
	reflectMarkers = new Group();
	for( var i=0; i<4; i++ ) {
		reflectMarkers.appendTop( new Path() );
	}


	// create triangulation
	triangulation = new f.FTriangulate( points );
	compareArea = triangulation.getTriangles(0).getArea(); //view.bounds.width*view.bounds.height;

	// Setup our holder group
	triangles = new Group();

	// draw initial triangle face
	face = new Path();
	face.name = 'triangle';
	face.add( triangulation.getTriangles(0).p1 );
	face.add( triangulation.getTriangles(0).p2 );
	face.add( triangulation.getTriangles(0).p3 );
	face.closed = true;

	triangles.appendTop( 
		hatchFill(
			face, 
			{ value: 0.5 }
		)
	);

	// Draw();

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
	// workaround for clearing redraws	
	triangles.removeChildren();

	var total = triangulation.getTriangles().length;
	for( var i=0; i<total; i++ ) {
		var triangle = triangulation.getTriangles(i);
		var triArea = triangle.getArea();

		// draw triangle
		face = new Path();
		face.name = 'triangle';
		face.add( triangle.p1 );
		face.add( triangle.p2 );
		face.add( triangle.p3 );
		face.closed = true;

		var ratio = ((i+1)/total);
		var max = density.max * (triArea/compareArea);
		var pmax = max;
		var pstrokeWidth = 100 * (triArea/compareArea);

		density.lerp = 1.0;
		density.value = ratio;
		density.max = max;
		density.strokeWidth = 2;
		var r = randomInt( 0,rgbColors.length );
		if( i%3 == 0) {
			density.strokeColor = new Color( rgbColors[r] );
			density.fillColor = null;
		}
		else {
			density.strokeColor = 'white';
			density.fillColor = new Color( rgbColors[r] );
		}

		triangles.appendTop( hatchFill(face, density) );
		density.max = pmax;
		density.strokeWidth = pstrokeWidth;

	}
	triangles.moveBelow( reflectMarkers );
};


// ------------------------------------------------------------------------
/**
 *	add point(s) to Triangulation
 *
 *	@param {Point} point
 *			a single Point or array of Points
 *
 */
function addPoint(point) {
	triangulation.add( point );
	Draw();
};

// ------------------------------------------------------------------------
/**
 *	reflect a point across all axes
 *
 *	@param {Point} point
 *			origin point of reflection
 *	@param {Point} axis (optional)
 *			axis to reflect points over, default reflects over center axis of canvas
 *
 */
function reflectPoint(point, axis) {
	axis = (axis == undefined)
		? new Point( view.bounds.width, view.bounds.height )
		: axis;

	return [
		// original point
		point,
		// reflection across the x axis
		new Point(axis.x - point.x, point.y),
		// reflection across the y axis
		new Point(point.x, axis.y - point.y),
		// reflection across both axes
		new Point(axis.x - point.x,axis.y - point.y)
	];
};

// ------------------------------------------------------------------------
/*
 *	fill path with a simple hatched line fill
 *
 *	@param {Path} path
 *			path to fill with hatching
 *	@param {Array} options
 *			{ max: 100, 			// maximum no. of lines
 *			  min: 10,				// minimum no. of lines)
 *			  value: 0.1,			// density 0.0 - 1.0
 *
 *			  lerp: 0.5,			// lerp value 0.0 - 1.0
 *			  strokeWidth: 2,		// width of stroke
 *			  strokeColor: 'white',	// color of stroke
 *
 *			  background: true,		// create a background shape from path
 *			  fillColor: 'blue',	// color of background (default: path.fillColor)
 *
 *			  clipMask: true 		// create a mask shape from path
 *			}
 */
function hatchFill(path, options) {
	var density = (options == undefined) 
		? Math.round(100 * 0.5)
		: Math.round(options.max * options.value) < options.min
			? options.min
			: Math.round(options.max * options.value);

	var groupHatch = new Group();


	// gather points
	var points = [];
	for( var i=0; i<path.segments.length; i++ ) {
		var seg = path.segments[i];
		points.push( seg.point );
	}

	// distances
	var distances = [];
	for( var i=0,j=points.length-1; i<points.length; i++,j--) {
		distances.push( 
			// first point v. last point
			points[i].getDistance( points[j] )
		);
	}

	// draw hatch lines
	for(var j=0; j<density; j++) {
		var ratio = (j/density);
		var linePt1 = new Point();
		var linePt2 = new Point();

		var m = parseInt( Math.max.apply( Math, distances ) );
		switch( m % 3 ) {
			case 0:
				linePt1.x = (points[0].x + (points[2].x - points[0].x) * ratio);
				linePt1.y = (points[0].y + (points[2].y - points[0].y) * ratio);
				linePt2.x = (points[1].x + (points[2].x - points[1].x) * ratio);
				linePt2.y = (points[1].y + (points[2].y - points[1].y) * ratio);
				break;
			case 1:
				linePt1.x = (points[1].x + (points[0].x - points[1].x) * ratio);
				linePt1.y = (points[1].y + (points[0].y - points[1].y) * ratio);
				linePt2.x = (points[2].x + (points[0].x - points[2].x) * ratio);
				linePt2.y = (points[2].y + (points[0].y - points[2].y) * ratio);
				break;
			case 2:
				linePt1.x = (points[0].x + (points[1].x - points[0].x) * ratio);
				linePt1.y = (points[0].y + (points[1].y - points[0].y) * ratio);
				linePt2.x = (points[2].x + (points[1].x - points[2].x) * ratio);
				linePt2.y = (points[2].y + (points[1].y - points[2].y) * ratio);
				break;
		}

		// if( options.lerp != undefined ) {
		// 	linePt2 = linePt1.lerp( linePt2, options.lerp );
		// }

		var line = new Path.Line( 
			linePt1,
			// linePt2
			( options.lerp != undefined ) 
				? linePt1.lerp( linePt2, options.lerp )
				: linePt2
		);
		line.strokeWidth = (options.strokeWidth != null) 
			? options.strokeWidth
			: 1;

		line.strokeColor = (options.strokeColor != undefined)
			? options.strokeColor
			: (options.background)
				? null
				: path.strokeColor;

		line.strokeCap = 'square';
		line.fillColor = null;

		groupHatch.appendTop( line );
	}

	// create mask
	// if( options.clipMask ) {
		var mask = path.clone();
		mask.name = '__mask';
		mask.fillColor = (options.fillColor != undefined)
			? options.fillColor
			: (options.background)
				? null
				: path.fillColor;
		mask.strokeColor = (options.strokeColor != undefined)
			? options.strokeColor
			: (options.background)
				? null
				: path.strokeColor;
		mask.strokeWidth = (options.strokeWidth != null) 
			? options.strokeWidth
			: 1;
		// mask.clipMask = true;
		groupHatch.appendBottom( mask );
		// groupHatch.clipped = true;
	// }

	// clear path
	path.remove();

	return groupHatch;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
	var reflected = reflectPoint(event.point);
	reflectMarkers.removeChildren();

	var hitResult = project.hitTest(event.point, hitOptions);

	// check hit 
	if (hitResult) {
		hitPath = hitResult.item;
		if (hitResult.type == 'segment' && hitPath.name == 'triangle') {
			hitSegment = hitResult.segment;

			// TODO: find point in triangulation
			// match so that mesh adjusts itself
			// TODO: find matching reflected point!
		}
		else {
			// segment not hit? add a point
			addPoint( event.point );
			addPoint( reflected );
		}
	}
	else {
		// nothing hit at all? add a point
		addPoint( event.point );
		addPoint( reflected );
	}

};

function onMouseDown(event) {
	reflectMarkers.removeChildren();
};

function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	if (hitResult && hitResult.item && hitResult.item.name == 'triangle') {
		hitResult.item.selected = true;
	}
};

function onMouseDrag(event) {
	if (hitSegment) {
		hitSegment.point = event.point;
		Draw();
	}

	// draw reflection markers
	var reflected = reflectPoint(event.point);
	reflectMarkers.removeChildren();
	for( var i=0; i<4; i++ ) {
		var path = new Path.Circle( reflected[i], 10 );
		path.fillColor = new Color( 0.0, 1.0, 0.7, 0.7 );
		reflectMarkers.appendTop( path );
	}
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
