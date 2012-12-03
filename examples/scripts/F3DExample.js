/**
 *	F3D Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = Frederickk;
var f3d = f.F3D;
var fshape = f.FShape;

var scene = new f3d.FScene3D();


// values
var bRotate = false;
var values = {
	rotx:	45,
	roty:	35.3,
	rotz:	-30
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// required setup scene
	scene.setup(view.bounds.width, view.bounds.height, 1000, 'ORTHO');


	// FBillBox
	// http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
	var billRed = new Frederickk.FShape.FBillBox(scene);
	billRed.setWHD(600, 600, 600);
	billRed.red();
	billRed.init(600,-600,0);

	var billYellow = new Frederickk.FShape.FBillBox(scene);
	billYellow.setWHD(600, 600, 600);
	billYellow.yellow();
	billYellow.init(-600,600,0);

	var billBlue = new Frederickk.FShape.FBillBox(scene);
	billBlue.setWHD(600, 600, 600);
	billBlue.blue();
	billBlue.init(-600,-600,0);


	// var billGreen = new Frederickk.FShape.FBillBox(scene);
	// billGreen.setWHD(600, 600, 600);
	// billGreen.fillColor = new paper.RGBColor(0.62, 0.77, 0.14);
	// billGreen.setVertices( [9,17,7] );
	// billGreen.init(-1800,600,0);


}



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bRotate) {
		values.rotx = 720.0 * ( (Math.sin(event.time * 2) + 1) / 30 );
		values.roty = 720.0 * ( (Math.cos(event.time * 2) + 1) / 30 );
		values.rotz++;

		Draw();
	}
}



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// rotate
	scene.rotateX( f.radians(values.rotx) );
	scene.rotateY( f.radians(values.roty) );
	scene.rotateZ( f.radians(values.rotz) );

	// draw to screen
	scene.draw().scale(1);

}



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function reset() {
	values.rotx = 45;
	values.roty = 35.3;
	values.rotz = -30;
}



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
}

// ------------------------------------------------------------------------
function onMouseUp(event) {
}

function onMouseDown(event) {
}

function onMouseMove(event) {
}

function onMouseDrag(event) {
	values.rotx = event.point.y;
	values.roty = event.point.x;
	values.rotz = event.point.x - event.point.y;

	// redraw to update scene
	Draw();
}


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'space') {
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
}

function onKeyUp(event) {
}






