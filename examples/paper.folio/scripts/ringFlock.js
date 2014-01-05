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

var pieces;

var boids = [];
var predators = [];
var mouse = null;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// import svg
	svg = project.importSVG( document.getElementById('svg'), true );
	for( var i=0, len=svg.children.length; i<len; i++ ) {
		try {
			if(svg.children[i].position.x > view.bounds.width) {
				svg.children[i].remove();
			}
			else if(svg.children[i].position.x < 0) {
				svg.children[i].remove();
			}
			else if(svg.children[i].position.y > view.bounds.height) {
				svg.children[i].remove();
			}
			else if(svg.children[i].position.y < 0) {
				svg.children[i].remove();
			}
		}
		catch(err) {}
	}

	// handle the pattern
	pieces = new Group( svg.children );
	for( var i=0, len=pieces.children.length; i<len; i++ ) {
		var piece = pieces.children[i];
		piece.fillColor = new Color(0.97);
		piece.data.fader = new ColorFader(
			1.0, 1.0,
			new Color({ hue: 0, saturation:0, brightness:0.97 }),
			new Color.random()
		);
	}

	// clean-up
	svg.remove();

	// create the boids
	for (var i=0; i<60; i++) {
		var boid = new f.FFlock(view.center, {
			radius:		24,
			maxSpeed:	10,
			maxForce:	0.05,
			data:		new Color.random({ hue:[-30, 200], saturation:[0.3, 0.7], brightness:[0.9, 1.0] })
			// path:		new Path.Rectangle({
			// 				position:	[0, 0],
			// 				size:		[24, 6],
			// 				fillColor:	new Color.random({ hue:[-30, 200], saturation:[0.3, 0.7], brightness:[0.9, 1.0] })
			// 			})
		});
		boids.push( boid );
	}

	// create a predator
	for (var i=0; i<3; i++) {
		var predator = new f.FPredator(view.center, {
			radius:		36,
			maxSpeed:	36,
			maxForce:	0.01,
			data:		new Color({ hue: 0, saturation:0, brightness:0.97 })
			// path:		new Path.Rectangle({
			// 				position:	[0, 0],
			// 				size:		[24, 6],
			// 				fillColor:	new Color({ hue: 0, saturation:0, brightness:0.97 })
			// 			})
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

		var hit = pieces.hitTest(b.position);
		if( hit ) {
			var item = hit.item;
			item.data.fader.setStart(b.data);
			item.data.fader.trigger();
		}
	}

	for( var i=0, len=predators.length; i<len; i++ ) {
		var p = predators[i];
		p.run(predators, boids);

		// var hit = pieces.hitTest(p.position);
		// if( hit ) {
		// 	var item = hit.item;
		// 	item.data.fader.reset();
		// 	// item.data.fader.setStart(p.data);
		// 	// item.data.fader.trigger();
		// }
	}

	Draw();
};




// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	for( var i=0; i<pieces.children.length; i++ ) {
		var fc = pieces.children[i].data.fader;
		fc.update();
		pieces.children[i].fillColor = fc.color();
	}
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
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
 *
 * @param {Number} fadeSec  length of fade in seconds
 * @param {Number} delaySec length to delay until fade in seconds
 * @param {Color} endCol     target color
 */
var ColorFader = function(fadeSec, delaySec, staCol, endCol) {
	var delaySec = delaySec || 0.250;
	var fadeSec = fadeSec || 0.250;
	var staCol = staCol || new Color('black');
	var endCol = endCol || new Color('black');

	var color = staCol;
	var inc = 1.0;

	var bFade = false;


	function initialize() {
		fadeSec *= 100;
		delaySec *= 100;
	};

	function trigger() {
		if( !bFade ) {
			bFade = true;
			inc = 1.0;
		}
	};

	function reset() {
		timerDelay.reset();
		inc = 1.0;
	};

	function update() {
		if(bFade) {
			inc -= 1.0/fadeSec;
		}
		else {
			inc += 1.0/fadeSec;
		}

		if( inc <= 0.0 ) {
			bFade = false;
			inc = 0.0;
		}
		else if( inc > 1.0 ) {
			bFade = false;
			inc = 1.0;
		}

		var components = {
			hue:        paper.map(inc, 1.0,0.0, staCol.hue,        endCol.hue),
			saturation: paper.map(inc, 1.0,0.0, staCol.saturation, endCol.saturation),
			brightness: paper.map(inc, 1.0,0.0, staCol.brightness, endCol.brightness)
		};
		color = new Color(components);
	};

	function setStartColor(color) {
		col = color;
	};
	function setEndColor(endColor) {
		endCol = endColor;
	};

	function getColor() {
		return color;
	};


	initialize();
	return {
		trigger:	trigger,
		reset:		reset,
		update:		update,

		setStart:   setStartColor,
		setEnd:     setEndColor,
		color:      getColor
	};

};



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





