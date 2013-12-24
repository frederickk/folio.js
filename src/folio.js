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


// install Paper.js into window
paper.install(window);


// once the DOM is ready, setup Paper.js
window.onload = function() {
	paper.setup('canvas');
	console.log('Folio.js is go!');


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



	/**
	 *
	 * Supporting Methods
	 *
	 */
	// ------------------------------------------------------------------------
	function resizeCanvas() {
		// var width = window.innerWidth;
		// var height = window.innerHeight;

		// set canvas width and height
		var canvas = document.getElementById('canvas');
		var parent = canvas.parentNode;
		if (canvas.getContext) {
			// canvas.width = width;
			// canvas.height = height;
			canvas.width = parent.offsetWidth;
			canvas.height = parent.offsetHeight;
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

	// ------------------------------------------------------------------------
	var resizeTimeout;
	window.onresize = function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(resizeCanvas, 100);
	};
	// resizeCanvas();

};
