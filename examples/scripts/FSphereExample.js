console.log( 'FSphere Example Loaded' );
/**
 *	F3D Example
 *	3 Halibierte Würfel
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of creating some Max Bill inspired objects
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// the F3D namespace
var f3d = f.F3D;

// the FShape namespace
var fshape = f.FShape;

// initiate the scene, this is how the transformations are
// interpolated for 3D geometry to appear on the screen
var scene = new f3d.FScene3D();

// spheres
var spheres = [];

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

	var size;
	if(view.bounds.width < 768) size = 600;
	else size = 1200;

	// sphere 0
	// wireframe
	spheres[0] = new frederickkPaper.FShape.FSphere(scene);
	spheres[0].setSize(size);
	spheres[0].setLatsLongs(4,4);
	spheres[0].noFill();
	spheres[0].init( -size, 0,0 );

	// sphere 1
	// spectrum fade
	spheres[1] = new frederickkPaper.FShape.FSphere(scene);
	spheres[1].setSize(size);
	spheres[1].setLatsLongs(9,9);
	spheres[1].noStroke();

	var r = f.random(0,180);
	for(var i=0; i<spheres[1].getNumFaces(); i++) {
		spheres[1].setOpacity( i, i/spheres[1].getNumFaces()*0.5 );
		spheres[1].setFillColor( i, new HslColor( r*i/spheres[1].getNumFaces(),0.9,0.8) );
	}
	spheres[1].init( size, 0, 0 );


};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bRotate) {
		values.rotx++;
		values.roty++;
		Draw();
	}
};



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






