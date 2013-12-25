console.log( 'Snow Pack Loaded' );
/**
 *	FCirclePack Example
 *	Snow Pack
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var packer;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	var items = [];
	for( var i=0; i<10; i++ ) {
		var s = new SnowFlake( new Point.random(), 6, paper.random(20,100) );
		s.strokeColor = 'black';
		s.strokeWidth = 2;
		// var s = new Path.Circle( new Point.random(), 20 );
		// s.strokeColor = 'black';

		items.push( s );
	}

	packer = new f.FCirclePack(items, 1000);
	packer.update();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	packer.update();
	// console.log( packer );
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var SnowFlake = function(center, spokes, radius) {
	var flake = [];
	var t = 1.0;

	function initialize() {
		var deg = 0;
		var x, y;
		for( var i=0; i<spokes; i++ ) {
			deg += 360/spokes;
			x = center.x + radius * Math.cos( paper.radians(deg) ) * t;
			y = center.y + radius * Math.sin( paper.radians(deg) ) * t;

			var spoke = new Path.Line( center, new Point(x,y) );
			spoke.strokeWidth = 15;
			spoke.strokeCap = 'round';
			flake.push( spoke );

			var p = new prong(deg);
			flake.push( p );
		}
		var inside = new Path.RegularPolygon(center, spokes, radius*0.618);
		inside.strokeWidth = 15;
		inside.strokeCap = 'round';
		inside.rotate( 180/spokes );
		flake.push( inside );

		return new Group(flake);
	};

	var prong = function(deg) {
		var x = center.x + radius*0.618 * Math.cos( paper.radians(deg) ) * t;
		var y = center.y + radius*0.618 * Math.sin( paper.radians(deg) ) * t;
		var origin = new Point(x,y);

		deg += (360/spokes)*0.3;
		x = center.x + radius*0.8 * Math.cos( paper.radians(deg) ) * t;
		y = center.y + radius*0.8 * Math.sin( paper.radians(deg) ) * t;
		var prong1 = new Path.Line( origin, new Point(x,y) );
		prong1.strokeWidth = 15;
		prong1.strokeCap = 'round';

		deg -= ((360/spokes)*0.3)*2;
		x = center.x + radius*0.8 * Math.cos( paper.radians(deg) ) * t;
		y = center.y + radius*0.8 * Math.sin( paper.radians(deg) ) * t;
		var prong2 = new Path.Line( origin, new Point(x,y) );
		prong2.strokeWidth = 15;
		prong2.strokeCap = 'round';

		return new Group(prong1, prong2);
	};

	return initialize().rotate( 180/spokes );
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

// ------------------------------------------------------------------------
function onMouseDown(event) {
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
