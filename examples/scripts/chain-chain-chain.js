console.log( 'Chain-Chain-Chain Loaded' );
/**
 *	FColor Example
 *	Chain-Chain-Chain
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example lerping colors and connecting dots
 *	with the Travelling Salesman Problem
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// dots
var dots;

// tsp
var RouteStep = 0;
var tsp = new TSP();

// background
var background;
var colors = {
	start:	new RgbColor().random(),
	end:	new RgbColor().random()
};

// hit
var temp;
var hitOptions = {
	fill: true,
	tolerance: 5
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// Setup background
	background = new Path.Rectangle(view.bounds.topLeft, view.bounds.bottomRight);

	// draw dots
	dots = new Group();

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

	for(var y=grid.height; y<view.bounds.height; y+=grid.height) {
		for(var x=grid.width; x<view.bounds.width; x+=grid.width) {
			
			var pt = new Point(x,y); //.random();
			var path = new Path.Circle(pt, f.randomInt(3,60));
			path.fillColor = 'white';
			// path.blendMode = 'multiply';

			dots.appendTop(path);
		}
	}
	
	dots.children.shuffle();
	updateBackground();
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
	tsp.calculate( dots.children, 1000);
	tsp.draw();
	tsp.getTangents().moveBelow( dots );
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

	// dots
	for(var i=0; i<dots.children.length; i++) {
		var kid = dots.children[i];
		var col = colors.start.lerp(
			colors.end,
			i/dots.children.length
		);
		// kid.opacity = 0.1;
		kid.fillColor = col;
		kid.fillColor.alpha = 0.2;
	}

	// links
	if(tsp.getTangents() != null) {
		for(var i=0; i<tsp.getTangents().children.length; i++) {
			var tan = tsp.getTangents().children[i];
			var col = colors.start.lerp(
				colors.end,
				i/dots.children.length
			);
			tan.fillColor = col;
			tan.fillColor.alpha = 0.2;
			// tan.opacity = 0.2; //(i/tsp.getTangents().children.length)-0.1;

		}
	}

}



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
	// temp = new Path.Circle( event.point, 6 );
	// dots.appendTop(temp);

	var hitResult = project.hitTest(event.point, hitOptions);
	if(hitResult) {
		if(hitResult.item.isGroupedWith(dots.children[0]) ) {
			temp = hitResult.item;
			temp.fillColor = 'black';
			temp.fillColor.alpha = 0.1;
		}
	}
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
	colors.start = new HslColor((event.point.x/view.bounds.width)*360, 0.9, 0.9);
	colors.end = new HsbColor((event.point.y/view.bounds.height)*360, 0.9, 0.9);

	updateBackground();
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
	if (event.modifiers.shift) {
		var x1 = temp.position.x;
		var x2 = event.point.x;
		var scaling = ((x1-x2)/1000)*-1;
		temp.scale( 1+scaling );
	}
	else {
		temp.position = event.point;
	}
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
