/**
 *	FArrow Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example of creating an arrow
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

var increment;
var arrows;

var points = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// angle increment
	increment = 360/randomInt(3,9);

	// Setup our holder group
	arrows = new Group();

	for( var i=0; i<360; i+=increment ) {
		// create tail points
		var r = new Size(
			random(30, view.bounds.width/3),
			random(30, view.bounds.height/3)
		);
		var tailPoint = new Point(
			view.bounds.center.x + ( r.width * Math.cos( radians(i) ) ),
			view.bounds.center.y + ( r.height * Math.sin( radians(i) ) )
		);
		points.push(tailPoint);

		// create arrow
		var arrow = Path.FArrow(
			view.bounds.center,
			tailPoint,
			new Size(20,20)
		);
		arrow.strokeCap = 'round';
		arrows.appendTop( arrow );
	}
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
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onMouseUp(event) {
};

function onMouseDown(event) {
};

function onMouseMove(event) {
	var num = arrows.children.length;
	for( var i=0; i<num; i++ ) {
		// Get the old arrow
		var arrow = arrows.children[i];

		var headSize = 1+120*normalize(event.point.y, 0,view.bounds.height);
		var headPoint = new Point(
			event.point.x + ( headSize*3 * Math.cos( radians( 360*normalize(i, 0,num) ) ) ),
			event.point.y + ( headSize*3 * Math.sin( radians( 360*normalize(i, 0,num) ) ) )
		);

		// create a new arrow
		var arrowNew = new Path.FArrow(
			headPoint,
			points[i],
			new Size(headSize,headSize)
		);
		arrowNew.strokeWidth = 3;
		arrowNew.strokeColor = 'black';
		arrowNew.strokeCap = arrow.strokeCap;

		// remove the old arrow
		arrow.remove();

		// add the new arrow
		arrows.appendBottom( arrowNew );
	}
};



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(false);
Draw();






