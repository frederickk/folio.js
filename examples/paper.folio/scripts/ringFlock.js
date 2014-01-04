console.log( 'Ring Flock' );
/**
 *	Ring Flock
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


var rings;
var pieces;

var boids = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// the radius of the rings
	var radius = 120;

	// create the rings
	rings = new Group();
	for( var x=-radius; x<view.bounds.width+radius; x+=radius ) {
		for( var y=-radius; y<view.bounds.height+radius; y+=radius/2 ) {
			var ring = new Path.Circle(
				new Point(x,y),
				radius
			);
			ring.strokeColor = 'white'; //new Color.random();
			ring.strokeWidth = 3;
			rings.appendTop(ring);
		}
	}


	// break the overlaps of the rings into seperate paths
	pieces = new Group();
	// hit result criteria
	var hitOptions = {
		segments:	true,
		stroke:		false,
		fill:		true,
		tolerance:	radius
	};

	for( var i=0; i<rings.children.length; i++ ) {
		// the ring to test
		var ring1 = rings.children[i];

		// the items that the ring hits
		var hit = rings.hitTest(ring1.position, hitOptions );

		// intersect the items
		var intersect = ring1.intersect(hit.item).toGroup();
		breakGroup(intersect, pieces);
		// exclude the items
		var exclude = ring1.exclude(hit.item).toGroup();
		breakGroup(exclude, pieces);

		// cleanup
		rings.children[i].remove();
	}

	rings.moveAbove(pieces);
	// rings.remove();


	var prevPath = new Path();
	for( var i=0; i<pieces.children.length; i++ ) {
		var path = pieces.children[i];
		// console.log( comparePaths(prevPath, path) );

		if( comparePaths(prevPath, path) ) {
			prevPath.remove();
		}
		else {
			// ?
			path.position.y += radius/2; //paper.random(-100, 100);
			path.fillColor = new Color(0.97);
			path.opacity = 0.4;
		}
		prevPath = path;
	}


	// create the boids
	for (var i=0; i<12; i++) {
		var boid = new Boid(view.center);
		boid.init();
		boids.push( boid );
	}


};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

	for( var i=0; i<boids.length; i++ ) {
		var b = boids[i];
		b.run(boids);

		var hit = pieces.hitTest(b.position);
		if( hit ) {
			hit.item.fillColor = b.shape.fillColor;
		}
	}

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function comparePaths(path1, path2) {
	var result = false;
	var keys = ['closed', 'fullySelected', 'clockwise'];
	for (var i=0, l=keys.length; i<l; i++) {
		var key = keys[i];
		result = (path1[key] === path2[key]);
	}
	result = (path1.segments === path2.segments);
	return result;
};

/**
 * @param {Item} item
 *       Item or Group
 * @param {Group} toGroup
 *       target Group for items
 *
 * @return {Group} the target Group
 */
function breakGroup(item, toGroup) {
	if( item.hasChildren() ) {
		for( var i=0; i<item.children.length; i++ ) {
			var kid = item.children[i];
			if( kid.hasChildren() ) {
				breakGroup(kid, toGroup);
			}
			else {
				toGroup.addChild(kid);
			}
		}
	}
	else {
		toGroup.addChild(item);
	}
	return toGroup;
};


// ------------------------------------------------------------------------
/**
 * Fader
 * TODO: utilize folio.js
 *
 * @param {Number} fadeSec  length of fade in seconds
 * @param {Number} delaySec length to delay until fade in seconds
 * @param {Color} toCol     target color
 */
// var Fader = function(fadeSec, delaySec, toCol) {
// 	var col = new Color('black');
// 	var toCol = new Color('black');

// 	var start, end;
// 	var delaySec = 0.250;  // default wait: 250ms
// 	var fadeSec = 0.250;   // default fade: 250ms
// 	var inc = 1.0;

// 	function initialize() {
// 		setStart(delaySec);
// 		setToColor(toCol);
// 	}
// 	function reset() {
// 		setStart(delaySec);
// 		inc = 1.0;
// 		return inc;
// 	};
// 	function update(event) {
// 		var c = col;
// 		if(event.time > end) {
// 			inc -= 1.0/fadeSec;
// 			c = new Color(
// 				paper.map(inc, 1.0,0.0, col.hue,        toCol.hue),
// 				paper.map(inc, 1.0,0.0, col.brightness, toCol.brightness),
// 				paper.map(inc, 1.0,0.0, col.saturation, toCol.saturation)
// 			);
// 		}
// 		return c;
// 	};

// 	function setStart(delay) {
// 		delaySec = delay;
// 		start = millis();
// 		end = start + delaySec;
// 	};
// 	function setColor(color) {
// 		col = color;
// 	};
// 	function setToColor(toColor) {
// 		toCol = toColor;
// 	};


// 	initialize();
// 	return {
// 		reset: 		reset,
// 		update: 	update,

// 		setColor:   setColor,
// 		setToColor: setToColor
// 	};

// };



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





