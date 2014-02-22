console.log( '10 PRINT CHR$(205.5+RND(1)); Loaded' );
/**
 *	10 PRINT CHR$(205.5+RND(1));
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	A very long version of 10 PRINT CHR$(205.5+RND(1));
 *	http://10print.org/
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

var background;
var group10;

// our cross
var cross;

// size of pattern elements
var size;

// colors holder
var colors = [];


//values
var values = {
	color0:	new RGBColor( paper.random(0,1), paper.random(0,1), paper.random(0,1) ),
	color1:	new RGBColor( paper.random(0,1), paper.random(0,1), paper.random(0,1) )
};

//components
var components = {
	color0: {
		type: 'color',
		label: 'Pattern'
	},
	color1: {
		type: 'color',
		label: 'Background'
	}
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	var palette = new Palette('10 PRINT CHR$(205.5+RND(1));', components, values);


	// scale the size to the width of the canvas
	size = (view.bounds.width/10)/2;

	// create our cross element
	cross = new Path.FCross(
		view.bounds.center, new Size(size,size), size, 'SHARP'
	);

	// hide the cross (because we'll be cloning it in Draw())
	cross.visible = false;

	// initiate draw group
	group10 = new Group();
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
	// pull in color values from input fields
	// uses jquery to get values
	colors = [ values.color0, values.color1 ];

	background = new Path.Rectangle( view.bounds.topLeft, view.bounds.bottomRight );
	background.fillColor = colors[1];
	background.strokeColor = null;
	background.bounds.size = view.bounds.size;

	// a bit of hack to clear the group when redrawing
	group10.removeChildren();

	for(var y=0; y<view.bounds.height+size/2; y+=size*2) {
		for(var x=0; x<view.bounds.width+size/2; x+=size*2) {
			// generate a random integer between 0 and 2
			var rand = paper.randomInt(0,2);
			// grab one lines in the cross
			// at random of course
			var c = cross.children[ rand ].clone();
			// darken colors[0] to use as a secondary color
			// (rand == 0)
				// ? c.fillColor = 0.03 //colors[0].lighten(0.03)
				// : c.fillColor = 0.03; //colors[0].lighten(-0.03);
			c.fillColor = colors[0];
			c.strokeColor = null;

			// position the line on the grid
			c.position = new Point(x+size/2,y+size/2);
			// add to our group (which we clear each redraw)
			group10.appendTop(c);
		}
	}

	group10.appendBottom(background);

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onMouseDown(event) {
	Draw();
};



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(false);
Draw();









