
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

// the sphere
var sphere;

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
	sphere = new frederickkPaper.FShape.FSphere(scene);
	sphere.setSize(size);
	sphere.setLatsLongs(4,4);
	// sphere.noFill();

	var v3 = [];
	for(var i=0; i<sphere.getVertices().length; i++) {
		var fp3 = new f3d.FPoint3(
			sphere.getVertices()[i].x + Math.sin( f.radians(i) ),
			sphere.getVertices()[i].y + -Math.sin( f.radians(i) ),
			sphere.getVertices()[i].z
		);
		v3.push(fp3);
	}
	sphere.setVertices(v3);


	sphere.init();

};



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
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// sphere.init();

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






