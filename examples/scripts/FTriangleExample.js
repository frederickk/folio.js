console.log( 'FTriangle Example Loaded' );
/**
 *	FTriangle Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of FTriangle
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

var triangle;
var triangles;

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
	// Setup our holder group
	triangles = new Group();

	// create FTriangle
	triangle = new Path.FTriangle( 
		new Point( 100,100 ),
		new Point( view.bounds.width-100,view.bounds.height/2 ),
		new Point( 100, view.bounds.height-100 )
	);

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


	// triangle
	triangle.fillColor = new RgbColor( 0.98, 0.98, 0.98 );
	triangles.appendTop(triangle);


	/*
	 *
	 *	Draw the different triangle centers
	 *
	 */
	// triangle centroid
	var p = new Path.Circle( triangle.position, 6 );
	p.fillColor = new RgbColor( 0.0, 0.0, 0.0 );
	triangles.appendTop(p);

	// triangle centroid
	var c = new Path.Circle( triangle.getCentroid(), 6 );
	c.fillColor = new RgbColor( 1.0, 0.0, 0.0 );
	triangles.appendTop(c);


	// triangle orthocenter
	// var oc = new Path.Circle( triangle.getOrthocenter(), 6 );
	// oc.fillColor = new RgbColor( 1.0, 0.0, 0.7 );
	// triangles.appendTop(oc);

	
	// triangle Circumcenter
	var cc = new Path.Circle( triangle.getCircumCircle(), 6 );
	cc.fillColor = new RgbColor( 0.0, 1.0, 0.7 );
	triangles.appendTop(cc);

	// triangle CircumCircle radius
	var r = new Path.Circle( triangle.getCircumCircle(), triangle.radius );
	r.fillColor = new RgbColor( 0.0, 1.0, 0.7 );
	triangles.appendBottom(r);

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

function onMouseDown(event) {
	var hitResult = project.hitTest(event.point, hitOptions);

	if (hitResult) {
		hitPath = hitResult.item;
		if (hitResult.type == 'segment' && hitPath.name == 'triangle') {
			hitSegment = hitResult.segment;
		}
	}
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
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
