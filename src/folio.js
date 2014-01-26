// ------------------------------------------------------------------------
/**!
 *
 * REQUIRED LIBRARIES!
 *
 * Paper.js @ http://paperjs.org/
 *
 */



// ------------------------------------------------------------------------
var folio = folio || {};



/**
 *
 * Initialize Structure
 *
 */
// create methods
// drawing
var Setup = function(){};
var Draw = function(){};
var Update = function(event){};

var Animate = function(object){};
var AnimateClear = function(){};

// events
// mouse
var onMouseUp = function(event){};
var onMouseDown = function(event){};
var onMouseMove = function(event){};
var onMouseDrag = function(event){};

// keyboard
var onKeyDown = function(event){};
var onKeyUp = function(event){};


/**
 *
 * Initialize Canvas
 *
 */
var container = document.createElement('div');
container.id = 'container';
container.style.position = 'absolute';
container.style.width = '100%';
container.style.height = '100%';
document.body.appendChild( container );

var canvases = document.getElementsByTagName('canvas');
var canvas;
if( canvases.length == 0 ) {
	// create canvas element
	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = '100%';
	canvas.height = '100%';
	canvas.style.backgroundColor = '#ffffff';
	container.appendChild( canvas );
}
else {
	// use first canvas found
	canvas = canvases[0];
}

// paper.js
paper.install(window);
paper.setup(canvas);


// once the DOM is ready, setup Paper.js
window.onload = function() {
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	if(typeof Setup === 'function') Setup();
	if(typeof Draw === 'function') Draw();


	// ------------------------------------------------------------------------
	var AnimationGroup = new Group();
	AnimationGroup.name = '__AnimationGroup';

	function Animate(object, order) {
		// object must be a valid paper.js item
		// default is to add object to top
		if( order === 'bottom' ) AnimationGroup.appendBottom( object );
		else AnimationGroup.appendTop( object );
	};
	function AnimateClear() {
		if( project.activeLayer.children['__AnimationGroup'] ) {
			project.activeLayer.children['__AnimationGroup'].remove();
		}
	};



	// ------------------------------------------------------------------------
	// Events
	// ------------------------------------------------------------------------
	view.onFrame = function(event) {
		// TODO:	add a method which clears an "animation group" each frame
		if(typeof Update === 'function') Update(event);
		AnimateClear();
	};

	view.onResize = function(event) {
		if(typeof onResize === 'function') onResize(event);
	};

	// ------------------------------------------------------------------------
	var tool = new Tool();
	tool.onMouseUp = function(event) {
		if(typeof onMouseUp === 'function') onMouseUp(event);
	};

	tool.onMouseDown = function(event) {
		if(typeof onMouseDown === 'function') onMouseDown(event);
	};

	tool.onMouseMove = function(event) {
		if(typeof onMouseMove === 'function') onMouseMove(event);
	};

	tool.onMouseDrag = function(event) {
		if(typeof onMouseDrag === 'function') onMouseDrag(event);
	};


	// ------------------------------------------------------------------------
	tool.onKeyDown = function(event) {
		if(typeof onKeyDown === 'function') onKeyDown(event);
	};

	tool.onKeyUp = function(event) {
		if(typeof onKeyUp === 'function') onKeyUp(event);
	};


	// ------------------------------------------------------------------------
	view.draw(); // draw the screen



	// ------------------------------------------------------------------------
	function resizeCanvas() {
		// set canvas width and height
		if (canvas.getContext) {
			canvas.width = container.offsetWidth;
			canvas.height = container.offsetHeight;
			canvas.style.width = container.offsetWidth + 'px';
			canvas.style.height = container.offsetHeight + 'px';

			// resetup canvas
			paper.setup(canvas);
		}

		// clear out view
		for( var i=0; i<projects.length; i++ ) {
			for( var j=0; j<projects[i].layers.length; j++ ) {
				var layer = projects[i].layers[j];
				// console.log( 'removing' );
				layer.removeChildren();
			}
		}

		// re-initiate setup
		if(typeof Setup === 'function') Setup();
		// re-initiate draw
		if(typeof Draw === 'function') Draw();

		// make sure view does its draw
		view.draw();

	};
	window.addEventListener('resize', resizeCanvas);


	// ------------------------------------------------------------------------
	console.log('Folio.js is go!');
};
