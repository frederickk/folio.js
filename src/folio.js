/*!
 *	
 *	folio.js
 *	v0.5
 *	https://github.com/frederickk/folio.js
 *
 *	16. February 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *	
 *	
 *	Folio.js is a library for Paper.js http://paperjs.org/. Folio.js
 *	serves as a collection of functions for supporting animations,
 *	rudimentary 3D, additional Path items and lastly a structured
 *	framework/chain of operations similar to that of Processing,
 *	OpenFrameworks, Cinder, et. al. 
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *	Additional information and demos can be found here
 *	http://kennethfrederick.de/folio.js/
 *	http://kenfrederick.blogspot.de/2012/12/frederickkpaper.html
 *
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *	
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *	
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA
 *	
 */



// ------------------------------------------------------------------------
/*!
 *
 *	REQUIRED LIBRARIES!
 *
 *	PaperJs @ http://paperjs.org/
 *	JQuery @	http://jquery.com/download/
 *
 */



// ------------------------------------------------------------------------
var folio = folio || {};



/*
 *
 *	Initialize Structure
 *
 */
// (function() {
	// console.log('\nfolio.js');
	// console.log('v.0.5');
	// console.log('https://github.com/frederickk/folio.js');
	// console.log('ken.frederick@gmx.de');
	// console.log('------------------------------------\n');


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
		console.log('Paper.js is go!');
		


		// ------------------------------------------------------------------------
		// Methods
		// ------------------------------------------------------------------------
		Setup();


		Draw();


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
			// TODO: 	add a method which clears an "animation group" each frame
			Update(event);
			AnimateClear();
		};
		
		view.onResize = function(event) {
			onResize(event);
		};

		// ------------------------------------------------------------------------
		var tool = new Tool();
		tool.onMouseUp = function(event) {
			onMouseUp(event);
		};
		
		tool.onMouseDown = function(event) {
			onMouseDown(event);
		};
		
		tool.onMouseMove = function(event) {
			onMouseMove(event);
		};
		
		tool.onMouseDrag = function(event) {
			onMouseDrag(event);
		};


		// ------------------------------------------------------------------------
		tool.onKeyDown = function(event) {
			onKeyDown(event);
		};

		tool.onKeyUp = function(event) {
			onKeyUp(event);
		};
		
		
		// ------------------------------------------------------------------------
		view.draw(); // draw the screen



		/**
		 *
		 *	Supporting Methods
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
			Setup();
			// re-initiate draw
			Draw();

			// make sure view does its draw
			view.draw();
		};

		// ------------------------------------------------------------------------
		var resizeTimeout;
		$(window).resize(function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resizeCanvas, 100);
		});
		resizeCanvas();

	};

// })();
