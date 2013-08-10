console.log( 'Lissajous Loaded' );
/**
 *	Lissajous
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

// lissajous
var lb;
var factor;
var frequency;
var frequencyTemp;

var bAnimate = false;

// values
var values = {
	bAlternate:		false,
	bBlend:			true,

	periodAngle:	null,

	frequencyX: 	null,
	frequencyY: 	null,

	widthSta:		null,
	widthEnd:		null,

	colSta:			null,
	colEnd:			null,

	opacSta:		null,
	opacEnd:		null,

	width:			250,
	height:			250
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	values.width = view.bounds.width/4;
	values.height = view.bounds.height/4;

	factor = new Point();
	frequency = new Point();
	frequencyTemp = new Point();

	// parameters
	setParameters();

	// draw initial empty curve
	// kinda hacky... whatever
	lb = new lissajousBezier();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bAnimate) {
		values.periodAngle += 1;
		values.frequencyX *= 1.05;
		values.frequencyY *= 1.1;

		values.widthSta += 0.05;
		values.widthEnd += 0.1;

		$('#periodAngle').val( f.round(values.periodAngle,1) );
		$('#frequencyX').val( f.round(values.frequencyX,1) );
		$('#frequencyY').val( f.round(values.frequencyY,1) );
		
		$('#widthSta').val( f.round(values.widthSta,1) );
		$('#widthEnd').val( f.round(values.widthEnd,1) );

		Draw();
	}
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	// remove previous curve
	lb.remove();

	// lissajous curve
	lb = new lissajousBezier(frequency, factor, radians(values.periodAngle));
	lb.translate( new Point(
		view.bounds.width/2,
		view.bounds.height/2)
	);
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function setParameters() {
	// gather values from form fields
	// set period angle
	values.periodAngle = parseFloat( $('#periodAngle').val() );

	// set frequency
	values.frequencyX = parseFloat( $('#frequencyX').val() );
	values.frequencyY = parseFloat( $('#frequencyY').val() );

	// set colors
	values.widthSta = parseFloat( $('#widthSta').val() );
	values.widthEnd = parseFloat( $('#widthEnd').val() );

	// set colors
	values.colSta = new Color( $('#colSta').val() );
	values.colEnd = new Color( $('#colEnd').val() );

	// set opacity
	values.opacSta = parseFloat( $('#opacSta').val() );
	values.opacEnd = parseFloat( $('#opacEnd').val() );


	// set frequency
	// update the current iteration
	if(frequency.x != frequencyTemp.x) frequency.x = frequency.x;
	else frequency.x = values.frequencyX;
	if(frequency.y != frequencyTemp.y) frequency.y = frequency.y;
	else frequency.y = values.frequencyY;

	frequencyTemp.x = values.frequencyX;
	frequencyTemp.y = values.frequencyY;

	// set size
	factor.x = values.width;
	factor.y = values.height;

	// update draw
	if(lb != null) Draw();
};

// ------------------------------------------------------------------------
var lissajousBezier = function(frequency, scale, periodAngleRads, stepRads) {
	/*
	 *	set defaults
	 */
	frequency		= (frequency === undefined) ? new Point(1,2) : frequency;
	scale			= (scale === undefined) ? new Point(view.bounds.width,view.bounds.height) : scale;
	stepRads		= (stepRads === undefined) ? radians(0.5) : stepRads;
	periodAngleRads = (periodAngleRads === undefined) ? 180 : periodAngleRads;


	/*
	 *	group of paths
	 */
	var group = new Group();


	/*
	 *	coordinates for creating curve
	 */
	var p1 = new Point(0,0);
	var p2 = new Point(1,1);
	var d1 = (frequency === undefined) ? new Point(0,0) : frequency;
	var d2 = new Point(0,0);

	for(var angle=stepRads; angle<=(radians(360) + stepRads); angle+=stepRads) {
		var from = p2.clone();
		from.x *= scale.x;
		from.y *= scale.y;

		p2.x = Math.sin( angle*frequency.x + periodAngleRads );
		p2.y = Math.sin( angle*frequency.y );

		d2.x = frequency.x * Math.cos( angle*frequency.x + periodAngleRads );
		d2.y = frequency.y * Math.cos( angle*frequency.y );

		var delta = d1.cross(d2); 


		/*
		 *	path segment of curve
		 */
		var lpath = new Path();
		lpath.strokeCap = 'round';
		lpath.strokeJoin = 'round';
		lpath.add(from);

		// handle
		var handle = new Point(
			( ( p2.cross(d2) ) * d1.x-( p1.cross(d1) ) * d2.x ) / delta,
			( ( p2.cross(d2) ) * d1.y-( p1.cross(d1) ) * d2.y ) / delta
		);
		handle.x *= scale.x;
		handle.y *= scale.y;

		// next point (to)
		var to = p2.clone();
		to.x *= scale.x;
		to.y *= scale.y;

		// tolerance of allowance for handles
		// hack to control a glitch in handle calculation
		var tolerance = new Point(
			scale.x * 0.1,
			scale.y * 0.1
		);

		if( Math.abs(delta) > 0.1 && boundsCheck(handle, scale, tolerance) ) {
			lpath.quadraticCurveTo(handle, to);
		}
		else {
			lpath.add(to);
		}

		p1 = p2.clone();
		d1 = d2.clone();


		/*
		 *	apply style parameters
		 */
		var n = norm(angle, stepRads,(radians(360) + stepRads));

		// stroke width
		var lweight = lerp( values.widthSta, values.widthEnd, n );
		lpath.strokeWidth = lweight;

		// stroke color
		if( values.bBlend ) {
			var lcol = lerpColor( values.colSta, values.colEnd, n );
			lpath.strokeColor = lcol;
		}
		if( values.bAlternate) {
			if( parseInt(n*100) % 2 == 0 ) lpath.strokeColor = values.colSta;
			else lpath.strokeColor = values.colEnd;
		}
		lpath.fillColor = null;

		// stroke opacity
		var lopacity = lerp( values.opacSta, values.opacEnd, n );
		lpath.opacity = lopacity/100;


		/*
		 *	add path to group
		 */
		group.appendTop(lpath);
	}
	if(group.children[0] != undefined) group.firstChild.remove();

	return group;
};

// ------------------------------------------------------------------------
function boundsCheck(pt1, pt2, tolerance) {
	var brect = new Rectangle( 
		new Point(-(pt2.x+tolerance.x), -(pt2.y+tolerance.y)),
		new Point(pt2.x+tolerance.x, pt2.y+tolerance.y)
	);
	return pt1.isInside(brect);
};



// ------------------------------------------------------------------------
function radians(val) {
	return val * (Math.PI/180);
};

// ------------------------------------------------------------------------
function norm(val,start,stop) {
	return (val - start) / (stop - start);
};
function round(val, deci) {
	var multi = Math.pow(10,deci);
	return Math.round(val * multi)/multi;
};

// ------------------------------------------------------------------------
function lerp(start, stop, amt) {
	return start + (stop-start) * amt;
};
function lerpColor(c1,c2, amt) {
	var arg0 = lerp(c1.red,		c2.red,		amt);
	var arg1 = lerp(c1.green,	c2.green,	amt);
	var arg2 = lerp(c1.blue,	c2.blue,	amt);
	return new paper.RGBColor(arg0, arg1, arg2);
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;

	values.width = view.bounds.width/4;
	values.height = view.bounds.height/4;
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
	if(Key.isDown('shift')) {
        $('#periodAngle').val( parseInt(event.point.x/view.bounds.width * 360) );
        values.periodAngle = parseFloat( $('#periodAngle').val() );
    }
    else {
		frequency.x = (event.point.x/view.bounds.width * values.frequencyX);
		frequency.y = (event.point.y/view.bounds.height * values.frequencyY);
    }

	Draw();
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'enter') bAnimate =! bAnimate;
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
