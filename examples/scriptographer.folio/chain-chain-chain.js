console.log( 'Chain-Chain-Chain Loaded' );
/**
 *	FColor Example
 *	Chain-Chain-Chain
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	An example lerping colors and connecting dots
 *	with the Travelling Salesman Problem
 *
 */

// ------------------------------------------------------------------------
// libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

// dots
var dots;

// tsp
var routePath;

// background
var background;
var colors;

// hit
var hitPath;
var hitOptions = {
	fill: true,
	tolerance: 5
};




// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// calculate grid
	var grid;
	var size;
	if(view.bounds.width < 768) {
		grid = new Size(
			view.bounds.width/4,
			view.bounds.height/4
		);
	}
	else {
		grid = new Size(
			view.bounds.width/7,
			view.bounds.height/4
		);
	}


	// calculate colors
	colors = {
		start:	new RGBColor( random(0,1),random(0,1),random(0,1) ),
		end:	new RGBColor( random(0,1),random(0,1),random(0,1) )
	};


	// Setup background
	background = new Path.Rectangle(view.bounds.topLeft, view.bounds.bottomRight);
	background.position = new Point(background.bounds.width/2,background.bounds.height/2); // hack
	background.strokeColor = null;
	updateBackground();

	// create the grid of dots
	dots = new Group();
	for(var y=grid.height; y<view.bounds.height; y+=grid.height) {
		for(var x=grid.width; x<view.bounds.width; x+=grid.width) {
			var dot = new Path.Circle(
				new Point(x,y),
				randomInt(3,60)
			);
			dot.name = 'dot';
			dots.appendTop(dot);
		}
	}
	dots.children.shuffle();
	updateDots();


	// create route path group
	routePath = new Group();

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
	// remove the old path
	routePath.remove();

	// calculate our salesmen's route
	var tsp = new f.FRoute( dots.children, 2000 );

	// draw the route
	routePath = new Group();
	for (var j=0; j<tsp.route.length-1; ++j) {
		var chain = new Path.FChain(
			dots.children[ tsp.route[j] ],
			dots.children[ tsp.route[j+1] ]
		);
		chain.strokeColor = 'white';
		chain.strokeWidth = 2;
		chain.fillColor = dots.children[ tsp.route[j] ].fillColor;
		chain.opacity = 0.2;
		// chain.blendMode = 'normal';

		routePath.appendTop( chain );
	}
	routePath.moveBelow( dots );
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function updateBackground() {
	// background
	var gradient = new Gradient() {
		type: 'linear',
		stops: [
			new GradientStop( colors.start, 0.0 ),
			new GradientStop( colors.end, 1.0 )
		]
	};
	var gradientColor = new GradientColor(gradient, view.bounds.topLeft, view.bounds.bottomRight);
	background.fillColor = gradientColor;
	background.opacity = 0.2;
};

function updateDots() {
	// dots
	for(var i=0; i<dots.children.length; i++) {
		var dot = dots.children[i];
		var col = new RGBColor(
			interpolate( colors.start.red,   colors.end.red,   i/dots.children.length ),
			interpolate( colors.start.green, colors.end.green, i/dots.children.length ),
			interpolate( colors.start.blue,  colors.end.blue,  i/dots.children.length )
		);
		dot.fillColor = col;
		dot.opacity = 0.6;
		dot.strokeColor = 'white';
		dot.strokeWidth = 2;
	}
};



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(false);
Draw();

