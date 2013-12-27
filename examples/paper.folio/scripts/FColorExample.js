console.log( 'FColor Example Loaded' );
/**
 *	FColor Example
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
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var dots;

var colors;
// create base colors
var rgray = new Color.random(0.3),
	rrgb = new Color.random(),
	rhsl = new Color.random({ hue: 45, saturation: 0.7, lightness: 0.7 }),
	rhsb = new Color.random({ hue: 45, saturation: 0.7, brightness: 0.7 }),
	rhex = new Color.random( 'hex' ),
	green = new Color( 0.3, 0.9, 0.7 );



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// intial color creation
	createColors();


	// create dot group
	dots = new Group();
	radius = view.bounds.width/24;

	// create labels
	var labels = new Group();
	var label = [
		'interpolate', '', '',
		'desaturate',
		'saturate',
		'darken',
		'dim',
		'lighten',
		'brighten',
		'contrast',
		'invert\ncompliment'
	];
	for( var i=0; i<label.length; i++ ) {
		var point = new Point(
			(radius*2.1)*i,
			24
		);
		var text = new PointText({
			point: point,
			content: label[i],
			fillColor: 'black',
			fontSize: 12
		});
		text.justification = 'center';
		labels.appendTop( text );
	}
	labels.position.x = view.bounds.center.x;


	// create dot grid
	var y = 0;
	for( a in colors ) {

		for( var i=0; i<colors[a].length; i++ ) {
			// setup grid
			var center = new Point(
				(radius*2.1)*i,
				(radius*2.1)*y
			);

			// setup dot
			var label = colors[a][i].type + '\n' + colors[a][i]._components.round(2);
			var dot = new ColorDot( center, radius, label );
			dot.children[0].fillColor = colors[a][i];
			dots.appendTop( dot );
		}
		y++;
	}
	dots.position = view.bounds.center;


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

	var index = 0;
	for( a in colors ) {
		for( var i=0; i<colors[a].length; i++ ) {
			var dot = dots.children[index].children[0];
			dot.fillColor = colors[a][i];

			var text = dots.children[index].children[1];
			text.content = colors[a][i].type + '\n' + colors[a][i]._components.round(2);

			index++;
		}
	}

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function createColors() {
	colors = {
		// first row
		first: [ rgray, rrgb, rhsl, green, null, green, green, green, green, green, green ],
		// second row
		second: [],
		// third row
		third: [ new Color(0), rhsb, rhex ]
	};

	// first row
	// please never do this... only for proof of concept!
	colors.first[4] = colors.third[3] = colors.first[3].desaturate( 0.6 ).saturate( 0.1 );

	// second row
	// (interpolated between first and third row)
	colors.second[0] = colors.first[0].interpolate( colors.third[0], 0.3 );
	colors.second[1] = colors.first[1].interpolate( colors.third[1], 0.3 );
	colors.second[2] = colors.first[2].interpolate( colors.third[2], 0.3 );
	// desaturated
	colors.second[3] = colors.first[3].desaturate( 0.3 );
	// saturated
	colors.second[4] = colors.first[4].saturate( 0.3 );
	// darkened
	colors.second[5] = colors.first[5].darken( 0.3 );
	// dimmed
	colors.second[6] = colors.first[6].dim( 0.3 );
	// lightened
	colors.second[7] = colors.first[7].lighten( 0.3 );
	// brightened
	colors.second[8] = colors.first[8].brighten( 0.3 );
	// contrasted
	colors.second[9] = colors.first[9].contrast( 0.3 );
	// inverted
	colors.second[10] = colors.first[10].invert();

	// third row
	// (interpolated between first and third row)
	colors.third[0] = colors.first[0].interpolate( colors.third[0], 0.66 );
	// colors.third[1] = colors.first[1].interpolate( colors.third[1], 0.66 );
	colors.third[2] = colors.first[2].interpolate( colors.third[2], 0.66 );
	// desaturated
	colors.third[3] = colors.first[3].desaturate( 0.6 );
	// saturated
	colors.third[4] = colors.first[4].saturate( 0.6 );
	// darkened
	colors.third[5] = colors.first[5].darken( 0.6 );
	// dimmed
	colors.third[6] = colors.first[6].dim( 0.6 );
	// lightened
	colors.third[7] = colors.first[7].lighten( 0.6 );
	// brightened
	colors.third[8] = colors.first[8].brighten( 0.6 );
	// contrasted
	colors.third[9] = colors.first[9].contrast( 0.6 );
	// compliment
	colors.third[10] = colors.first[10].rotate( 180 );
}


// ------------------------------------------------------------------------
var ColorDot = function(center, radius, label) {
	var dot = new Path.Circle( center, radius );

	var text = new PointText({
		point: [ center.x, center.y + 0 ],
		content: label,
		fillColor: 'black',
		fontSize: 12
	});
	text.justification = 'center';

	return new Group([ dot, text ]);
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
};

function onMouseMove(event) {
	// var n = map( event.point.x, 0,view.bounds.width, -1.1,1.1 );
	var n = (event.point.x <= view.bounds.width/2)
		? -2
		: 2;

	// adjust core color hues
	green.hue += n;
	rrgb.hue += n;
	rhsl.hue += n;
	// rhsb.hue += n;

	createColors();
	Draw();
};

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};




