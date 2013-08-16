paper.Path.inject({


	getCircumcircle: function() {
		var that = this;
		var circumradius = 0;

		var arr = this._segments.slice();
		function getDistanceToCentroid(segment) {
			var point = segment.point;
			var x = point.x - that.getCentroid().x,
				y = point.y - that.getCentroid().y,
				d = x * x + y * y;
			return Math.sqrt(d);
		};
		arr.sort( function(a, b) {
			return getDistanceToCentroid(a) - getDistanceToCentroid(b);
		});

		circumradius = getDistanceToCentroid( arr[arr.length-1] ) + getDistanceToCentroid( arr[arr.length-2] );
		circumradius /= 2;

		// // for( var i=0; i<arr.length; i++ ) {
		// // 	var seg = arr[i].point;
		// // 	if( seg.getDistance( this.getCentroid()) > circumradius ) {
		// // 		circumradius = seg.getDistance( this.getCentroid());
		// // 	}
		// // }

		console.log( that.getCenterOfPolygon() );
		return Path.Circle(
			that.getCenterOfPolygon(),
			circumradius
		);
	},

	getCenterOfPolygon: function() {
		return new Point( 0,0 );
	}

});


console.log( 'Centre Loaded' );
/**
 *	Centred
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of various center methods
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var paths, centers;

var hitPath;
var hitSegment;
var hitOptions = {
	segments: true,
	fill: true,
	tolerance: 10
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// set up groups
	paths = new Group();
	centers = new Group();


	// create path
	var path = new Path();
	path.name = '_polygon';

	// create vertices
	var numVertices = randomInt(3,15);
	for( var t=0; t<360; t+=360/numVertices ) {
		var r = random( 100, 150 );
		var point = new Point(
			r * Math.cos( radians(t) ),
			r * Math.sin( radians(t) )
		);
		path.add( point );
	}
	path.closed = true;
	path.fillColor = new Color(0.0, 1.0, 0.7, 0.9).random();
	paths.appendTop( path );


	// generate clone
	var clone = paths.children[0].clone();
	clone.fillColor = new Color({ hue: 90, saturation: 1, brightness: 0.8 }).random();
	paths.appendTop( clone );

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
	centers.removeChildren();
	paths.removeChildren(1);

	// recreate clone
	var clone = paths.children[0].clone();
	// clone.fillColor = new Color({ hue: 90, saturation: 1, brightness: 0.8 }).random();
	paths.appendTop( clone );

	// set on grid
	var col3 = view.bounds.width/2;
	for( var i=0; i<paths.children.length; i++ ) {
		var path = paths.children[i];
		path.position = new Point(
			col3 * (i % 2)+1,
			view.bounds.center.y
		);
	}

	// centroid
	centers.appendTop( centroid(paths.children[0]) );

	// center
	centers.appendTop( center(clone) );


	paths.appendTop( centers );
	paths.position = view.bounds.center;

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function centroid(path) {
	var style = {
		strokeColor: 'black',
		// dashArray: [1, 9],
		strokeWidth: 1.5,
		// strokeCap: 'round'
	};

	// centroid
	var centroid = new Path.Circle(
		path.getCentroid(),
		4.5
	)
	centroid.style = style;

	// radius length
	var line = new Path.Line(
		path.getCentroid(),
		new Point(
			path.getCentroid().x + path.getCircumcircle().bounds.size.width/2,
			path.getCentroid().y
		)
	);
	line.style = style;

	// circumcircle
	var circumcircle = path.getCircumcircle();
	circumcircle.style = style;

	// incircle
	var incircle = path.getIncircle();
	incircle.style = style;

	return new Group([ centroid, line, circumcircle, incircle ]);
};

// ------------------------------------------------------------------------
function center(path) {
	var style = {
		strokeColor: 'black',
		dashArray: [0.1, 6],
		strokeWidth: 1.8*1.5,
		strokeCap: 'round'
	};

	// center dot
	var center = new Path.Circle(
		path.position,
		4.5
	)
	center.style = style;

	// radius
	var line = new Path.Line(
		path.position,
		new Point(
			path.position.x + path.bounds.size.getCircumradius(),
			path.position.y
		)
	);
	line.style = style;

	// circumcircle
	var circumcircle = new Path.Circle(
		path.position,
		path.bounds.size.getCircumradius()
	)
	circumcircle.style = style;

	// incircle
	var incircle = new Path.Circle(
		path.position,
		path.bounds.size.getIncircleradius()
	)
	incircle.style = style;

	// bounding box
	var boundingBox = new Path.Rectangle( path.bounds );
	boundingBox.style = style;

	return new Group([ center, line, circumcircle, incircle, boundingBox ]);
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
	var hitResult = project.hitTest(event.point, hitOptions);

	if (hitResult) {
		hitPath = hitResult.item;
		if (hitResult.type == 'segment' && hitPath.name == '_polygon') {
			hitSegment = hitResult.segment;
		}
	}
};

function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	if (hitResult && hitResult.item && hitResult.item.name == '_polygon') {
		hitResult.item.selected = true;
	}
};

function onMouseDrag(event) {
	if (hitSegment) {
		hitSegment.point = event.point;
		Draw();
	}
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
