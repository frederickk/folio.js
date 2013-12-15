/**
 *	F3D Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example of creating a 3D field
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

// the F3D namespace
var f3d = f.F3D;

// initiate the scene, this is how the transformations are
// interpolated for 3D geometry to appear on the screen
var scene;

// FPath3 paths
var path3 = [];

// values for rotation
var bRotate = false;
var values = {
	rotx:	0,
	roty:	0,
	rotz:	0
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// required setup scene
	// (optional parameters) width, height, focalLength, display mode
	// 'ORTHO' is for isometric
	// 'PERSPECTIVE' is the default mode
	scene = new f3d.FScene3D();
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
	path3[0].fillColor = new Color().random();
	path3[0].closed = true;

	// middle
	path3[1] = new f3d.FPath3();
	path3[1].add3( new f3d.FPoint3(-100,	0,	 100) );
	path3[1].add3( new f3d.FPoint3( 100,	0,	 100) );
	path3[1].add3( new f3d.FPoint3( 100,	0,	-100) );
	path3[1].add3( new f3d.FPoint3(-100,	0,	-100) );
	path3[1].fillColor = new Color().random();
	path3[1].closed = true;

	// bottom
	path3[2] = new f3d.FPath3();
	path3[2].add3( new f3d.FPoint3(-100,	100,	 100) );
	path3[2].add3( new f3d.FPoint3( 100,	100,	 100) );
	path3[2].add3( new f3d.FPoint3( 100,	100,	-100) );
	path3[2].add3( new f3d.FPoint3(-100,	100,	-100) );
	path3[2].fillColor = new Color().random();
	path3[2].closed = true;


	// important! FPath3 has to be added to the scene
	// either as an array or individually
	scene.addItem( path3 );
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bRotate) {
		values.rotx = 720.0 * ( (Math.sin(event.time * 2) + 1) / 15);
		values.roty++;
		values.rotz = 360.0 * ( (Math.cos(event.time * 2) + 1) / -30 );

		Draw();
	}
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// rotates all of the items in the scene
	// TODO: be able to rotate individual items
	scene.rotateX( paper.radians(values.rotx) );
	scene.rotateY( paper.radians(values.roty) );
	scene.rotateZ( paper.radians(values.rotz) );

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
function onMouseDrag(event) {
	values.rotx = event.point.y;
	values.roty = event.point.x;
	// values.rotz = event.point.x - event.point.y;

	// redraw to update scene
	Draw();
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'enter') {
		bRotate = !bRotate;
		values.rotx += 1;
		values.roty += 1;
		values.rotz += 1;
	}
};

function onKeyUp(event) {
};



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(true);
Draw();



