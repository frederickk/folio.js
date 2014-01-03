console.log( 'Shape Physics' );
/**
 *	Shape Physics
 *	Physics.js
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

var grid;

var balls;
var blocks;

//
// cp.js
//
var space;

var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	//
	// cp.js
	// Create environment
	//
	space = new cp.Space();
	space.iterations = 60;
	space.gravity = cp.v(0, -500);
	// space.sleepTimeThreshold = 2.0;
	space.collisionSlop = 1.0;

	// ground
    var ground = space.addShape(new cp.SegmentShape(
		space.staticBody,
		cp.v(0, 3),
		cp.v(view.bounds.width, 3),
		3
	));
    ground.setElasticity(1);
    ground.setFriction(1);
    ground.setLayers(NOT_GRABABLE_MASK);

    // walls
	var wallLeft = space.addShape(new cp.SegmentShape(
		space.staticBody,
		cp.v(0, 0),
		cp.v(0, view.bounds.height),
		0
	));
	wallLeft.setElasticity(1);
	wallLeft.setFriction(1);
	wallLeft.setLayers(NOT_GRABABLE_MASK);

	var wallRight = space.addShape(new cp.SegmentShape(
		space.staticBody,
		cp.v(view.bounds.width, 0),
		cp.v(view.bounds.width, view.bounds.height),
		0
	));
	wallRight.setElasticity(1);
	wallRight.setFriction(1);
	wallRight.setLayers(NOT_GRABABLE_MASK);


	// Add a circle
	balls = new Group();
	blocks = new Group();
	var total = 18;
	for( var i=0; i<total; i++ ) {
		//
		// Balls
		//
		var mass = paper.randomInt(10, 30);
		var radius = mass;

		var ballBody = space.addBody(new cp.Body(
			mass,
			cp.momentForCircle(mass, 0, radius, cp.v(0, 0))
		));
		ballBody.setPos(cp.v(
			paper.normalize(i+1, 0,total+1)*view.bounds.width,
			view.bounds.height/2
		));

		var ballShape = space.addShape(new cp.CircleShape(
			ballBody,
			radius,
			cp.v(0, 0)
		));
		ballShape.setElasticity( paper.normalize(mass, 30,0) );
		ballShape.setFriction(1);
		ballShape.index = i;
		console.log( ballShape );

		var ball = new Path.Circle(
			new Point(
				ballBody.p.x,
				ballBody.p.y
			),
			ballShape.r
		);
		ball.fillColor = new Color.random(0.0, 1.0, 0.7);
		balls.appendTop(ball);

		//
		// Blocks
		//
		var blockBody = space.addBody(new cp.Body(
			mass,
			cp.momentForBox(mass/2, radius, radius)
		));
		blockBody.setPos(cp.v(
			paper.normalize(i+1, 0,total+1)*view.bounds.width,
			view.bounds.height/2
		));

		var blockShape = space.addShape(new cp.BoxShape(
			blockBody,
			radius,
			radius
		));
		blockShape.setElasticity( paper.normalize(mass, 30,0) );
		blockShape.setFriction(1);
		blockShape.index = i;
		blockShape.width = radius;
		blockShape.height = radius;

		console.log( blockShape );

		var block = new Path.Rectangle(
			new Point(
				blockBody.p.x,
				blockBody.p.y
			),
			new Size(
				// blockShape.width,
				// blockShape.height
				Math.abs(blockShape.verts[0] - blockShape.verts[4]),
				Math.abs(blockShape.verts[1] - blockShape.verts[5])
			)
		);
		block.fillColor = new Color.random(0.0, 1.0, 0.7);
		blocks.appendTop(block);

		console.log( '---------' );
	}

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	space.step(event.time/60);

	Draw();
};


// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	space.eachShape(function(shape) {

		if( shape.type === 'circle' ) {
			var ball = balls.children[shape.index];
			ball.position = new cpToPoint(shape.tc);
		}
		else if( shape.type === 'poly' ) {
			var block = blocks.children[shape.index];
			block.position = new cpToPoint(cp.v(
				shape.tVerts[0] + shape.width/2,
				shape.tVerts[1] + shape.height/2
			));
		}

	});
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var cpToPoint = function(cpoint) {
	return cp.v(cpoint.x, (view.bounds.height - cpoint.y));
};

// ------------------------------------------------------------------------
var Grid = function(img, properties) {
	var group = new Group();

	var properties = properties || {};
	var resolution = properties.resolution || 45,
		rotation = properties.rotation || false,
		scale = properties.scale || false,
		darkenPercent = properties.darkenPercent || 0.3,
		shapes = properties.shapes || ['rectangle'];
	var size = new Size(resolution,resolution);


	//
	// Methods
	//
	function initialize() {
		var form;
		for(var y=resolution; y<img.height; y+=resolution) {
			for(var x=resolution; x<img.width; x+=resolution) {
				form = getShape( getType() );

				var col = img.getPixel(x,y);
				setColor(form, col);

				form.position = new Point(x,y);
				form.scale( (scale) ? 1-col.gray : 1.0, form.position );
				form.rotate( rotation, form.position );
				// form.rotate( (rotation) ? col.gray*360 : 0.0, form.position );

				group.appendTop(form);
			}
		}
		return group;
	};

	//
	// Sets
	//
	function setColor(item, clr) {
		var clrDark	      = clr.darken(darkenPercent),
			pixelGray	  = clr.gray,

			origin		  = new Point(item.position.x, item.position.y - item.bounds.height/2),
			destination	  = new Point(item.position.x, item.position.y + item.bounds.height/2),

			gradient	  = new Gradient([clr, clrDark]),
			gradientColor = new GradientColor(gradient, origin, destination);

		if(item.name === 'cross') {
			item.children[0].strokeColor = clr;
			item.children[1].strokeColor = clrDark;
			item.children[0].strokeCap = 'round';
			item.children[1].strokeCap = 'round';
		}
		else {
			item.fillColor = gradientColor;
		}

	};


	//
	// Gets
	//
	var getType = function() {
		var rand = paper.randomInt(0,shapes.length);
		// if(shapes[rand] === 0) {
		//	while(shapeArray[rand] === 0) {
		//		rand = paper.randomInt(0,shapes.length);
		//	}
		// }
		return shapes[rand];
	};

	var getShape = function(type, properties) {
		var properties = properties || {};
		properties.weight = properties.weight || size.width/2;
		properties.fit = properties.fit || true;

		var form;
		if(type === 'triangle') {
			form = new Path.RegularPolygon(
				new Point(0,0), 3, (size.height/2)*1.33
			);
		}
		else if(type === 'circle') {
			form = Path.Circle( new Point(0,0), size.width/2 );
		}
		else if(type === 'cross') {
			form = new Path.FCross(
				new Point(0,0),
				new Size(
					(properties.fit) ? size.width/2 - properties.weight/2 : size.width/2,
					(properties.fit) ? size.width/2 - properties.weight/2 : size.height/2
				),
				properties.weight
			);
		}
		else {
			// type === 'rectangle'
			form = new Path.Rectangle( new Point(0,0), size );
		}

		form.name = type;
		return form;
	};


	//
	// Invocation
	//
	return initialize();


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

};

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};



