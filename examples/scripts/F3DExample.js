console.log( 'F3D Example Loaded' );
/**
 *	F3D Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of creating a 3D field
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// the F3D namespace
var f3d = f.F3D;

// initiate the scene, this is how the transformations are
// interpolated for 3D geometry to appear on the screen
var scene = new f3d.FScene3D();

// FPath3 paths
var path3 = [];

// values for rotation
var rotation = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// required setup scene
	// (optional parameters) width, height, focalLength, display mode
	// 'ORTHO' is for isometric
	// 'PERSPECTIVE' is the default mode
	scene.setup(view.bounds.width, view.bounds.height, 1000, 'PERSPECTIVE');


	// top 
	// initiate the 3D path
	path3[0] = new f3d.FPath3();
	// add 3D points to this path
	// FPoint3 takes 3 arguments (x, y, z)
	path3[0].add3( new f3d.FPoint3(-100,	-100,	 100) );
	path3[0].add3( new f3d.FPoint3( 100,	-100,	 100) );
	path3[0].add3( new f3d.FPoint3( 100,	-100,	-100) );
	path3[0].add3( new f3d.FPoint3(-100,	-100,	-100) );
	// use FColor to give the field a random RGB color
	path3[0].fillColor = new f.FColor().random();
	path3[0].closed = true;

	// middle
	path3[1] = new f3d.FPath3();
	path3[1].add3( new f3d.FPoint3(-100,	0,	 100) );
	path3[1].add3( new f3d.FPoint3( 100,	0,	 100) );
	path3[1].add3( new f3d.FPoint3( 100,	0,	-100) );
	path3[1].add3( new f3d.FPoint3(-100,	0,	-100) );
	path3[1].fillColor = new f.FColor().random();
	path3[1].closed = true;

	// bottom
	path3[2] = new f3d.FPath3();
	path3[2].add3( new f3d.FPoint3(-100,	100,	 100) );
	path3[2].add3( new f3d.FPoint3( 100,	100,	 100) );
	path3[2].add3( new f3d.FPoint3( 100,	100,	-100) );
	path3[2].add3( new f3d.FPoint3(-100,	100,	-100) );
	path3[2].fillColor = new f.FColor().random();
	path3[2].closed = true;


	// important! FPath3 has to be added to the scene
	// either as an array or individually
	scene.addItem( path3 );
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// rotates all of the items in the scene
	// TODO: be able to rotate individual items
	scene.rotateX( f.radians(rotation[0]) );
	scene.rotateY( f.radians(rotation[1]) );
	scene.rotateZ( f.radians(rotation[2]) );

	// draw scene to screen
	// the scene contains all paths (only FPath3 items) added to the scene
	// the scene can have a scalar as well
	scene.draw().scale(1);
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	// view.size = event.size;
};

// ------------------------------------------------------------------------
function onMouseUp(event) {
};

function onMouseDown(event) {
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
	rotation[0] = event.point.y;
	rotation[1] = event.point.x;
	rotation[2] = event.point.x - event.point.y;

	// redraw to update scene
	Draw();
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};






