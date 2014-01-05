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
var predators = [];
var mouse = null;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// // the radius of the rings
	// var radius = 120;

	// // create the rings
	// rings = new Group();
	// for( var x=-radius; x<view.bounds.width+radius; x+=radius ) {
	//	for( var y=-radius; y<view.bounds.height+radius; y+=radius/2 ) {
	//		var ring = new Path.Circle(
	//			new Point(x,y),
	//			radius
	//		);
	//		ring.strokeColor = 'white'; //new Color.random();
	//		ring.strokeWidth = 3;
	//		rings.appendTop(ring);
	//	}
	// }


	// // break the overlaps of the rings into seperate paths
	// pieces = new Group();
	// // hit result criteria
	// var hitOptions = {
	//	segments:	true,
	//	stroke:		false,
	//	fill:		true,
	//	tolerance:	radius
	// };

	// for( var i=0; i<rings.children.length; i++ ) {
	//	// the ring to test
	//	var ring1 = rings.children[i];

	//	// the items that the ring hits
	//	var hit = rings.hitTest(ring1.position, hitOptions );

	//	// intersect the items
	//	var intersect = ring1.intersect(hit.item).toGroup();
	//	breakGroup(intersect, pieces);
	//	// exclude the items
	//	var exclude = ring1.exclude(hit.item).toGroup();
	//	breakGroup(exclude, pieces);

	//	// cleanup
	//	rings.children[i].remove();
	// }

	// rings.moveAbove(pieces);
	// // rings.remove();


	// var prevPath = new Path();
	// for( var i=0; i<pieces.children.length; i++ ) {
	//	var path = pieces.children[i];
	//	// console.log( comparePaths(prevPath, path) );

	//	if( comparePaths(prevPath, path) ) {
	//		prevPath.remove();
	//	}
	//	else {
	//		// ?
	//		// path.position.y += radius/2; //paper.random(-100, 100);
	//		path.fillColor = new Color(0.97);
	//		path.opacity = 0.4;
	//	}
	//	prevPath = path;
	// }

	// test pieces
	pieces = new Group();
	var cols = 9;
	var rows = 6;
	for( var x=0; x<view.bounds.width; x+=view.bounds.width/cols ) {
		for( var y=0; y<view.bounds.height; y+=view.bounds.height/rows ) {
			var piece = new Path.Rectangle(
				new Point(x,y),
				new Size(view.bounds.width/cols, view.bounds.height/rows)
			);
			piece.fillColor = new Color(0.97);
			piece.strokeColor = 'white';
			pieces.addChild( piece );
		}
	}



	// create the boids
	for (var i=0; i<120; i++) {
		var boid = new f.FFlock(view.center, {
			radius:		24,
			maxSpeed:	10,
			maxForce:	0.05,
			path:		new Path.Rectangle({
							position:	[0, 0],
							size:		[24, 6],
							fillColor:	new Color.random({ hue:[-30, 200], saturation:[0.3, 0.7], brightness:[0.9, 1.0] })
						})
		});
		boids.push( boid );
	}

	// create a predator
	for (var i=0; i<3; i++) {
		var predator = new f.FPredator(view.center, {
			radius:		36,
			maxSpeed:	36,
			maxForce:	0.01,
			path:		new Path.Rectangle({
							position:	[0, 0],
							size:		[24, 6],
							fillColor:	'black'
						})
		});
		predators.push( predator );
	}

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

	for( var i=0, len=boids.length; i<len; i++ ) {
		var b = boids[i];

		if (mouse) {
			boids[i].arrive(mouse);
		}
		b.run(boids);

	//	var hit = pieces.hitTest(b.position);
	//	if( hit ) {
	//		hit.item.fillColor = b.shape.fillColor;
	//	}
	}

	for( var i=0, len=predators.length; i<len; i++ ) {
		var p = predators[i];
		p.run(predators, boids);
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
//	var col = new Color('black');
//	var toCol = new Color('black');

//	var start, end;
//	var delaySec = 0.250;  // default wait: 250ms
//	var fadeSec = 0.250;   // default fade: 250ms
//	var inc = 1.0;

//	function initialize() {
//		setStart(delaySec);
//		setToColor(toCol);
//	}
//	function reset() {
//		setStart(delaySec);
//		inc = 1.0;
//		return inc;
//	};
//	function update(event) {
//		var c = col;
//		if(event.time > end) {
//			inc -= 1.0/fadeSec;
//			c = new Color(
//				paper.map(inc, 1.0,0.0, col.hue,        toCol.hue),
//				paper.map(inc, 1.0,0.0, col.brightness, toCol.brightness),
//				paper.map(inc, 1.0,0.0, col.saturation, toCol.saturation)
//			);
//		}
//		return c;
//	};

//	function setStart(delay) {
//		delaySec = delay;
//		start = millis();
//		end = start + delaySec;
//	};
//	function setColor(color) {
//		col = color;
//	};
//	function setToColor(toColor) {
//		toCol = toColor;
//	};


//	initialize();
//	return {
//		reset:		reset,
//		update:	update,

//		setColor:   setColor,
//		setToColor: setToColor
//	};

// };



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};

// ------------------------------------------------------------------------
function onMouseUp(event) {
	mouse = null;
};

function onMouseDown(event) {
	mouse = event.point;
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
	mouse = event.point;
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};





