console.log( 'FColor Example Loaded' );
/**
 *	FColor Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	A very long version of 10 PRINT CHR$(205.5+RND(1));
 *	http://10print.org/
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;


var background;
var group10;

// our cross
var cross;

// size of pattern elements
var size;

// colors holer
var colors = []; 



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// scale the size to the width of the canvas
	size = (view.bounds.width/40)/2;

	// create our cross element
	cross = new Cross( view.bounds.center, new paper.Size(size,size) );

	cross.children[0].strokeWidth = size;
	cross.children[0].strokeCap = 'round';

	cross.children[1].strokeWidth = size;
	cross.children[1].strokeCap = 'round';

	// hide the cross (because we'll be cloning it in Draw())
	cross.visible = false;

	// initiate draw group
	group10 = new paper.Group();

	// initiate background
	background = new paper.Path.Rectangle( view.bounds.topLeft, view.bounds.bottomRight );

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
	colors[0] = new f.FColor().HexToColor( $("#hexcolor1").val() );
	colors[1] = new f.FColor().HexToColor( $("#hexcolor2").val() );

	background.fillColor = colors[1];
	background.bounds.size = view.bounds.size;

	// a bit of hack to clear the group when redrawing
	group10.removeChildren();

	for(var y=0; y<view.bounds.height+size/2; y+=size*2) {
		for(var x=0; x<view.bounds.width+size/2; x+=size*2) {
			// generate a random integer between 0 and 2
			var rand = f.randomInt(0,2);
			// grab one lines in the cross
			// at random of course
			var c = cross.children[ rand ].clone();
			// darken colors[0] to use as a secondary color
			// a function added to paper.Color via frederickkPaper
			(rand == 0) ? c.strokeColor = colors[0] : c.strokeColor = colors[0].clone().darken(0.3);
			// position the line on the grid
			c.position = new paper.Point(x+size/2,y+size/2);
			// add to our group (which we clear each redraw)
			group10.appendTop(c);
		}
	}

	group10.appendBottom(background);

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/*
 *	cross
 */
var Cross = function(point, size) {
	var group = new paper.Group();

	line1 = new paper.Path.Line(
		point.x + size.width, 
		point.y - size.height, 
		point.x - size.width, 
		point.y + size.height
	);
	line2 = new paper.Path.Line(point.x + size.width, point.y + size.height, point.x - size.width, point.y - size.height);

	group.appendTop( line1 );
	group.appendTop( line2 );
	return group;
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
	Draw();
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






