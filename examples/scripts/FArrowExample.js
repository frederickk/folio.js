console.log( 'FArrow Example Loaded' );
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
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// depreciating FShape namespace
// no longer necessary use paper.Path
//var fshape = f.FShape;

var increment;
var arrows;

var points = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// angle increment
	increment = 360/f.randomInt(3,9);

	// Setup our holder group
	arrows = new Group();

	for( var i=0; i<360; i+=increment ) {
		// create tail points
		var r = new Size(
			f.random(30, view.bounds.width/3),
			f.random(30, view.bounds.height/3)
		);
		var tailPoint = new Point( 
			view.bounds.center.x + ( r.width * Math.cos( f.radians(i) ) ), 
			view.bounds.center.y + ( r.height * Math.sin( f.radians(i) ) )
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
function onResize(event) {
	view.size = event.size;
};

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

		var headSize = 1+120*f.norm(event.point.y, 0,view.bounds.height);
		var headPoint = new Point( 
			event.point.x + ( headSize*3 * Math.cos( f.radians( 360*f.norm(i, 0,num) ) ) ), 
			event.point.y + ( headSize*3 * Math.sin( f.radians( 360*f.norm(i, 0,num) ) ) )
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

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};







		





