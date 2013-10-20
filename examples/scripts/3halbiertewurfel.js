console.log( '3 halbierte Würfel Loaded' );
/**
 *	F3D Example
 *	3 Halibierte Würfel
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example of creating some Max Bill inspired objects
 *
 */


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

// Bill Shapes
var billRed;
var billYellow;
var billBlue;
var billGreen;

// values
var bRotate = false;
var values = {
	rotx:	45,
	roty:	35.3,
	rotz:	-30
};
var bBoundingBox = true;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// required setup scene
	scene = new f3d.FScene3D();
	scene.setup(view.bounds.width, view.bounds.height, 1000, 'ORTHO');



	// FBillBox
	// http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
	var size;
	if(view.bounds.width < 768) size = 250;
	else size = 600;


	billRed = new BillRed(
		scene,
		new f3d.FPoint3(size,-size,0),
		new f3d.FSize3(size, size, size)
	);

	billYellow = new BillYellow(
		scene,
		new f3d.FPoint3(-size,size,0),
		new f3d.FSize3(size, size, size)
	);

	billBlue = new BillBlue(
		scene,
		new f3d.FPoint3(-size,-size,0),
		new f3d.FSize3(size, size, size)
	);

	// billGreen = new f3d.FPath3.BillBox(
	// 	scene,
	// 	new f3d.FPoint3(size,size,0),
	// 	new f3d.FSize3(size, size, size),
	// 	[9,17,7]
	// );
	// billGreen.fillColor = new Color(0.62, 0.77, 0.14);


};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bRotate) {
		values.rotx++;
		values.roty++;
		values.rotz++;

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
function reset() {
	values.rotx = 45;
	values.roty = 35.3;
	values.rotz = -30;
};



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
	values.rotx = event.point.y;
	values.roty = event.point.x;
	values.rotz = event.point.x - event.point.y;

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
	if(event.key == 'r') {
		reset();
	}

	// redraw to update scene
	Draw();
};

function onKeyUp(event) {
};






