console.log( 'FSphere Example Loaded' );
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

// spheres
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
	// set canvas background
	paper.view.element.style.backgroundColor = 'rgb(18, 18, 18)'; //#121212

	// required setup scene
	scene = new f3d.FScene3D();
	scene.setup(view.bounds.width, view.bounds.height, 1000, 'ORTHO');


	// sphere
	var radius = 900;
	sphere = new f3d.FPath3.FSphere(
		scene,
		new f3d.FPoint3( 0,0,-100 ),
		radius,
		[9,9]
	);
	sphere.strokeColor = null;

	var r = paper.random(0,360);
	var facesNum = sphere.children.length;
	for(var i=0; i<facesNum; i++) {
		var face = sphere.children[i];
		face.opacity = i/facesNum*0.5;
		face.fillColor = new HslColor( r*i/facesNum, 0.9, 0.8);
	}


	// background
	var background = new Path.Rectangle(
		new Point( 0,0 ),
		view.bounds.size
	);
	background.fillColor = {
		gradient: {
			stops: [
				[ new HslColor( r*0.0, 0.9, 0.8), 0.0 ],
				[ new HslColor( r*1.0, 0.9, 0.8), 1.0 ]
			],
		},
		origin: background.point,
		destination: background.bounds.bottomLeft
	};
	background.opacity = 0.9

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
// Draw
// ------------------------------------------------------------------------
function Draw() {
	// rotate
	scene.rotateX( paper.radians(values.rotx) );
	scene.rotateY( paper.radians(values.roty) );
	scene.rotateZ( paper.radians(values.rotz) );

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






