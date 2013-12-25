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

// TODO: implement circle packers
// var packer;

var flakes;
var s;
var sProps = {};


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	flakes = new Group();

	sProps = {
		point: view.center,
		spokes: paper.randomInt(4,12),
		radius: paper.random(20,120)
	};
	s = new SnowFlake(sProps.point, sProps.spokes, sProps.radius, 0.0);
	s.strokeColor = '#c7FFFF';
	s.strokeWidth = 3;

	// packer = new f.FCirclePack(items, 1000);
	// packer.update();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	var t = ((event.time*0.1) % 1.0);

	if( t < 0.9 ) {
		s.remove();
		s = new SnowFlake(sProps.point, sProps.spokes, sProps.radius, t);
		s.strokeColor = '#c7FFFF';
		s.strokeWidth = 3;
	}

	if( t >= 0.9 ) {
		flakes.appendTop(s.clone());
		sProps = {
			point: new Point(
				paper.random(view.bounds.width),
				paper.random(view.bounds.height)
			),
			spokes: paper.randomInt(4,12),
			radius: paper.random(20,120)
		};
	}

	// packer.update();
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var SnowFlake = function(center, spokes, radius, t) {
	var flake = [],
		spokes = (spokes < 4) ? 4 : spokes,
		t = t || 1.0,
		pt = 0.0,
		it = 0.0,
		iRadius = radius,
		iMult = 0.518;

	function initialize() {
		var deg = 90;
		var x, y;
		for( var i=0; i<spokes; i++ ) {
			// spokes
			var s = new spoke(deg);
			flake.push( s );

			// prongs
			if( t > 0.2 ) {
				pt = paper.map(t, 0.2,1.0, 0.0,1.0);
				var p = new prong(deg);
				flake.push( p );
			}

			deg += 360/spokes;
		}

		// inner structure
		do {
			it = t; //paper.map(t, 0.318,1.0, 0.2,1.0);
			iRadius *= iMult;
			iMult -= 0.1;
			var sides = ( parseInt(spokes*t) < 4 ) ? 4 : parseInt(spokes*t);

			var inside = new Path.RegularPolygon(center, sides, iRadius*it);
			inside.strokeWidth = 15;
			inside.strokeCap = 'round';
			inside.rotate( (360/spokes)*1.5, center );
			flake.push( inside );
		}
		while( iRadius > 24 );

		return new Group(flake);
	};

	var spoke = function(deg) {
		var mid = new Point(
			center.x + radius * Math.cos( paper.radians(deg) ) * 0.5,
			center.y + radius * Math.sin( paper.radians(deg) ) * 0.5
		)
		var end = new Point(
			center.x + radius * Math.cos( paper.radians(deg) ),
			center.y + radius * Math.sin( paper.radians(deg) )
		)
		var s = new Path.Line(
			new Point().interpolateTo(mid, center, t),
			new Point().interpolateTo(mid, end, t)
		);
		s.strokeWidth = 15;
		s.strokeCap = 'round';
		return s;
	};

	var prong = function(deg) {
		var prongs = new Group();
		var sta = new Point(
			center.x + radius*0.618 * Math.cos( paper.radians(deg) ),
			center.y + radius*0.618 * Math.sin( paper.radians(deg) )
		);

		deg += (360/spokes)*0.3;
		var end;
		for( var i=0; i<2; i++ ) {
			end = new Point(
				center.x + (radius*0.8) * Math.cos( paper.radians(deg) ),
				center.y + (radius*0.8) * Math.sin( paper.radians(deg) )
			);
			var p = new Path.Line(
				sta,
				new Point().interpolateTo(sta, end, pt)
			);
			p.strokeWidth = 15;
			p.strokeCap = 'round';
			prongs.appendTop(p);

			deg -= ((360/spokes)*0.3)*2;
		}

		return prongs;
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
