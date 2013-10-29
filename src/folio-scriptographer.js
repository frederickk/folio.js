// ------------------------------------------------------------------------
// Global Properties
// ------------------------------------------------------------------------
/*
 *	the Path.Rectangle of the artboard
 *	mimic Paper.js
 */
var view = artboard = activeDocument.activeArtboard;

/*
 *	holder for Raster
 */
var raster;

/*
 *	shim for using same code base for
 *	both versions of folio.js
 */
var paper = PaperScope = global;



/*
 *	Note from the Scriptographer.org Team
 *
 *	In Scriptographer 2.9, we switched to a top-down coordinate system and
 *	degrees for angle units as an easier alternative to radians.
 *
 *	For backward compatibility we offer the possibility to still use the old
 *	bottom-up coordinate system and radians for angle units, by setting the two
 *	values bellow. Read more about this transition on our website:
 *	http://scriptographer.org/news/version-2.9.064-arrived/
 */

script.coordinateSystem = 'top-down';
script.angleUnits = 'degrees';



/*
 *
 *	Scriptographer Global Scope
 *
 * 	The following are components that I have included within my
 * 	unsupported fork of Paper.js, which are not available natively
 * 	within Scriptogpraher
 *
 *
 */
// Script.inject({
global.inject({
	enumerable: true,


	/*
	 *
	 *	These are specific methods for the
	 *	Scriptographer version of folio.js
	 *
	 */

	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	// constants
	EPSILON: 1.0e-6,

	// have to keep frameRate low... because well...
	// it's illustrator, don't be greedy
	// formula:
	// 1/12 = 0.08333 (fps -> seconds)
	// 0.08333 * 1000 = 83.33 (seconds -> ms)
	FRAMERATE: 12, // 500 == 2 ms

	// event holder for animations events
	// mimics Paper.js
	_event: {
		count: 0, // number of frames
		time: 0.0,  // seconds elapsed
		delta: 0.0  // difference since last frame
	},



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/*
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},


	//-----------------------------------------------------------------------------
	/*
	 *	animation function that mimics Paper.js
	 */
	/*
	 *	@param {Boolean} isOn
	 *				true if we want to use animations
	 *	@param {Number} frameRate
	 *				the frame rate for the animatons default is 12
	 */
	Animate: function(isOn, frameRate) {
		frameRate = (frameRate === undefined) ? FRAMERATE : frameRate;
		var interval = parseInt((1/frameRate)*1000);

		if( isOn ) {
			var updater = setInterval( function() {
				onFrame(interval, Update)
				},
				interval
			);
		}
	},

	/*
	 *	@param {Number} interval
	 *				how often in MS to fire event - defaul: 83
	 */
	onFrame: function(interval, func) {
		interval = (interval === undefined) ? 2 : interval;

		_event.count++;
		_event.time += (interval * 0.001);
		_event.delta -= _event.time;

		if (func != undefined) func(_event);

		_event.delta = _event.time;
	},

});


// ------------------------------------------------------------------------
var folio = folio || {};

