console.log( 'FColor Example Loaded' );
// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = Frederickk;


var items = [];
var temp;


// tsp
var RouteStep = 0;
var tsp = new TSP();


// background
var background;
var colors = {
	start:	new f.FColor().random(),
	end:	new f.FColor().random()
};

var hitOptions = {
	fill: true,
	tolerance: 5
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// setup background
	background = new paper.Path.Rectangle(view.bounds.topLeft, view.bounds.bottomRight);

	// draw dots
	var grid = new paper.Size(view.bounds.width/7, view.bounds.height/4);
	for(var y=grid.height; y<view.bounds.height; y+=grid.height) {
		for(var x=grid.width; x<view.bounds.width; x+=grid.width) {
			var pt = new f.FPoint(x,y); //.random();
			var path = new Path.Circle(pt, f.randomInt(3,60));
			path.fillColor = 'white';
			// path.blendMode = 'multiply';
			items.push( path );
		}
	}
	items.shuffle();
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
	console.log( 'Draw()' );

	tsp.calculate( items, 1 );
	tsp.draw();
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function updateBackground() {
	// background
	// var gradient = new Gradient([colors.start, colors.end]);
	// var gradientColor = new GradientColor(gradient, view.bounds.topLeft, view.bounds.bottomRight);
	// background.fillColor = gradientColor;

	// dots
	for(var i=0; i<items.length; i++) {
		var col = new f.FColor().lerpRGBColor(
			colors.start,
			colors.end,
			i/items.length
		);
		items.opacity = 0.1; //i/items.length;
		items[i].fillColor = col;
	}

	// links
	if(tsp.getTangents() != null) {
		for(var i=0; i<tsp.getTangents().children.length; i++) {
			var tan = tsp.getTangents().children[i];
			var col = new f.FColor().lerpRGBColor(
				colors.start,
				colors.end,
				i/items.length
			);
			tan.fillColor = col;
			tan.opacity = 0.15; //(i/tsp.getTangents().children.length)-0.1;

		}
	}

}



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
	Draw();
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
	// temp = new paper.Path.Circle( event.point, 6 );
	// items[items.length] = temp;

	var hitResult = project.hitTest(event.point, hitOptions);
	if (hitResult) {
		temp = hitResult.item;

		for(var i=0; i<items.length; i++) {
			if( items[i].position.x == temp.position.x &&
				items[i].position.y == temp.position.y ) {
				temp = items[i];
			}
		}

		// var amt = (event.point.x / view.bounds.width);
		// var col = new f.FColor().lerpRGBColor( colors.start,colors.end, amt)
		// temp.fillColor = col;
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
