console.log( 'FColor Example Loaded' );
/**
 *	FColor Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// depreciating FColor namespace
// no longer necessary use paper.Color() or GrayColor() or etc.
//var fcolor = f.FColor

var dots;
var dotsSize;

var colors;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	colors = [
		// individualize colors
		// first row
		// color class in Paper.js has been re-worked
		new GrayColor( random( 0.3,0.6 ) ),
		new Color( random( 0.0,1.0), random( 0.0,1.0), random( 0.0,1.0) ),
		new HslColor( random( 45,90), random( 0.7,0.9), random( 0.7,0.9) ),
		new HsbColor( random( 90,120), random( 0.7,0.9), random( 0.7,0.9) ),

		new Color( 0, 1.0, 0.7 ),
		new Color( 0, 0.7, 1.0 ),

		// second row
		null, null, null, null, null, null,

		// third row
		null, null, null, null, null, null,

		// fourth row
		new Color( 0 ),
		new Color( '#'+randomHex() ),
		new Color( '#'+randomHex() ), //new Color().integer( parseInt(randomHex()) ),
		new Color( '#'+randomHex() ), //new Color().bytes( Math.random()*255, Math.random()*255, Math.random()*255 ),
		null,
		null
	];

	// second row
	// (lerped between first and fourth row)
	colors[6] = colors[0].lerp( colors[18], 0.66 );
	colors[7] = colors[1].lerp( colors[19], 0.66 );
	colors[8] = colors[2].lerp( colors[20], 0.66 );
	colors[9] = colors[3].lerp( colors[21], 0.66 );
	// darkened
	colors[10] = colors[4];//.darken( 0.33, true );
	// lightned
	colors[11] = colors[5];//.clone().lighten( 0.33 );

	// third row
	// (lerped between first and fourth row)
	colors[12] = colors[0].lerp( colors[18], 0.33 );
	colors[13] = colors[1].lerp( colors[19], 0.33 );
	colors[14] = colors[2].lerp( colors[20], 0.33 );
	colors[15] = colors[3].lerp( colors[21], 0.33 );
	// darkened
	colors[16] = colors[4];//.clone().darken( 0.66 );
	// lightned
	colors[17] = colors[5];//.clone().lighten( 0.66 );

	// fourth row
	// darkened
	colors[22] = colors[4];//.clone().darken( 0.9 );
	// lightned
	colors[23] = colors[5];//.clone().lighten( 0.9 );


	// create dot group
	dots = new Group();
	dotsSize = view.bounds.height/4;

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

	dots.removeChildren();

	// draw dots
	var index = 0;
	var margin = 21;

	for(var y=0; y<4; y++) {
		for(var x=0; x<6; x++) {
			// setup grid
			var pt = new Point(
				map( x, 0,5, margin*6,view.bounds.width-margin*6),
				map( y, 0,3, margin*6,view.bounds.height-margin*6)
			);		

			// draw dot
			var dot = new Path.Circle( pt, dotsSize );
			dot.fillColor = colors[index];
			dots.appendTop( dot );

			index++;
		}
	} 

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function randomHex() {
	return ((1<<24)*Math.random()|0).toString(16);
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
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
	dotsSize = (event.point.x*event.point.y)/view.bounds.width;
	Draw();
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};





