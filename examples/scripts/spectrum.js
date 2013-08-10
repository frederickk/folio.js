console.log( 'Spectrum Loaded' );
/**
 *	Spectrum
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An exmaple of blending colors using Color.lerp
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// the gradient
var spectrum;
var path;

// colors
var spectrumColors = [
  new Color( 115/255, 233/255, 255/255 ),
  new Color(   0/255, 255/255, 178/255 ),
  new Color( 144/255,  39/255, 142/255 ),
  new Color( 255/255,  70/255, 100/255 )
];

// colors holder
var colors = new Array(2);

var index = 0;
var delta = 0.0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// the spectrum
	colors[0] = spectrumColors[0];
	colors[1] = spectrumColors[1];

	spectrum = new GradientColor(
		new Gradient([ colors[0], colors[1] ]),
		view.bounds.topLeft,
		view.bounds.bottomRight
	);

	// the container
	path = new Path.Rectangle( new Point(0,0), view.bounds.size );
	path.fillColor = spectrum;

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(delta > 1.0) {
		index++;
		delta = 0.0;
	}
	else {
		delta += 0.01;
	}

	Draw();
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {

	// update colors
	colors[0] = new Color().lerp(
		spectrumColors[ index % 4 ],
		spectrumColors[ (index+1) % 4 ],
		delta
	);

	colors[1] = new Color().lerp(
		spectrumColors[ (index+1) % 4 ],
		spectrumColors[ (index+2) % 4 ],
		delta
	);

	// update spectrum
	spectrum = new GradientColor(
		new Gradient([ colors[0], colors[1] ]),
		path.bounds.topLeft,
		path.bounds.bottomRight
	);
	path.fillColor = spectrum;

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
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};







		





