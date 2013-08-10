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
		start:	new Color( random(0,1),random(0,1),random(0,1) ),
		end:	new Color( random(0,1),random(0,1),random(0,1) )
	};


	// Setup background
	background = new Path.Rectangle(view.bounds.topLeft, view.bounds.bottomRight);
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
	var tsp = new TSP( dots.children, 2000 );

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
		chain.fillColor.alpha = 0.2;
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
	var gradient = new Gradient([colors.start, colors.end]);
	var gradientColor = new GradientColor(gradient, view.bounds.topLeft, view.bounds.bottomRight);
	background.fillColor = gradientColor;
	background.opacity = 0.2;
};

function updateDots() {
	// dots
	for(var i=0; i<dots.children.length; i++) {
		var dot = dots.children[i];
		var col = colors.start.lerp(
			colors.end,
			i/dots.children.length
		);
		dot.fillColor = col;
		dot.fillColor.alpha = 0.6;
		dot.strokeColor = 'white';
		dot.strokeWidth = 2;
	}
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
	Draw();
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
	var hitResult = project.hitTest(event.point, hitOptions);

	if (hitResult) {
		if (hitResult.item.name == 'dot') {
			hitPath = hitResult.item;
		}
	}
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	if (hitResult && hitResult.item && hitResult.item.name == 'dot') {
		hitResult.item.selected = true;
	}

	colors.start = new HslColor(
		(event.point.x/view.bounds.width)*360,
		0.9, 0.9
	);
	colors.end = new HsbColor(
		(event.point.y/view.bounds.height)*360,
		0.9, 0.9
	);

	updateBackground();
	updateDots();
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
	if (hitPath) {
		if (event.modifiers.shift) {
			var x1 = hitPath.position.x;
			var x2 = event.point.x;
			var scaling = ((x1-x2)/1000)*-1;
			hitPath.scale( 1+scaling );
		}
		else {
			hitPath.position = event.point;
		}
		Draw();
	}

};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
