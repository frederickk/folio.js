console.log( 'Shape' );
/**
 *	Shape
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



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	var raster = new Raster('mr_eastwood');

	grid = new Grid(raster, {
		shapes: ['rectangle', 'triangle', 'circle', 'cross']
	});
	grid.position = view.center;
	raster.remove();
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
};



// ------------------------------------------------------------------------
// Methods
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
				form.position = new Point(x,y);
				form.scale( (scale) ? pixelGray : 1.0, form.position );
				form.rotate( rotation, form.position );
				form.rotate( (rotation) ? pixelGray*360 : 0.0, form.position );

				setColor(form, img.getPixel(x,y));

				group.appendTop(form);
			}
		}
		return group;
	};


	//
	// Sets
	//
	function setColor(item, clr) {
		var clrDark       = clr.darken(darkenPercent),
			pixelGray     = clr.gray,

			origin        = new Point(item.position.x, item.position.y - item.bounds.height/2),
			destination	  = new Point(item.position.x, item.position.y + item.bounds.height/2),

			gradient      = new Gradient([clr, clrDark]),
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
		// 	while(shapeArray[rand] === 0) {
		// 		rand = paper.randomInt(0,shapes.length);
		// 	}
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













