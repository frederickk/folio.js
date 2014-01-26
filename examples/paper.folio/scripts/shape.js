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
	// set canvas background
	paper.view.element.style.backgroundColor = 'rgb(247, 247, 247)';

	var raster = new Raster('image') ; //document.getElementById('image').value);
	raster.position = view.center;

	var shapes = [];
	if(document.getElementById('bTriangle').checked) shapes = shapes.concat('triangle');
	if(document.getElementById('bCircle').checked) shapes = shapes.concat('circle');
	if(document.getElementById('bSquare').checked) shapes = shapes.concat('square');
	if(document.getElementById('bCross').checked) shapes = shapes.concat('cross');

	var res = ( parseInt(document.getElementById('resolution').value) <= 20 )
		? 20
		: parseInt(document.getElementById('resolution').value);
	document.getElementById('resolution').value = res;

	raster.onLoad = function() {
		if( grid ) grid.remove();
		grid = new Grid(raster, {
			shapes: shapes,
			resolution: res,
			rotation: parseFloat(document.getElementById('rotation').value),
			scale: document.getElementById('bScale').checked
		});
		grid.position = new Point(
			view.center.x,
			view.center.y-15
		);

		raster.remove();
	};

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













