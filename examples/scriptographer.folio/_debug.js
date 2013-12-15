/**
 *	folio Test 0.0
 *
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
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');




// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// load folio
var f = folio;

// document properties
var sel;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// FArrow
	var headPoint = new Point( 9,9 );
	var tailPoint = new Point( 90,90 );
	var arrowHeadSize = new Size( 18,18 );
	var farrow = new Path.FArrow( headPoint, tailPoint, arrowHeadSize );
	farrow.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );


	// FBubble
	var bubblePoint = new Point( 45,45 );
	var bubbleSize = new Size( 90,60 );
	var bubbleTagSize = new Size( 9,9 );
	var bubbleTagCenter = 'CENTER';
	var b = new Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
	b.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );


	// FChain
	var path1 = new Path.Circle( new Point(90,90), 9 );
 	var path2 = new Path.Circle( new Point(180,180), 90 );
 	var fchain = new Path.FChain( path1, path2 );
 	fchain.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );
 	fchain.fillColor = null;


 	// FCross
	var centerPoint = new Point( 45,45 );
	var size = new Size( 45,45 );
	var strokeWidth = 3;
	var crossType = 'LINE';
	var fcross = new Path.FCross( centerPoint, size, strokeWidth, crossType );
	fcross.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );


	// FDrop
	var centerPoint = new Point( 45,45 );
	var scale = 45;
	var fdrop = new Path.FDrop( centerPoint, scale );
	fdrop.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );


	// FTriangle
	var p1 = new Point( 9,9 );
	var p2 = new Point( 90,45 );
	var p3 = new Point( 45,90 );
	var ftriangle = new Path.FTriangle( p1, p2, p3 );
	ftriangle.strokeColor = new RGBColor( 0.0, 1.0, 0.7 );


	// // HSLColor
	// var hsl = new HSLColor( 120, 1.0, 0.8 );
	// var hslPath = new Path.Rectangle(
	// 	new Point( 0,-180 ),
	// 	new Size( 180, 180 )
	// );
	// hslPath.fillColor = hsl;

	// // HSBColor
	// var hsb = new HSBColor( 120, 1.0, 0.8 );
	// var hsbPath = new Path.Rectangle(
	// 	new Point( 180,-180 ),
	// 	new Size( 180, 180 )
	// );
	// hsbPath.fillColor = hsb;
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(false);
Draw();

