console.log( 'FBubble Example Loaded' );
/**
 *	FBubble Example
 *	The Debate
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	A unending philosophical debate amongst the heavyweights
 *
 */


// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// load folio
var f = folio;

//values
var values = {
	bubbleWidth:	100,
	bubbleHeight:	100,

	tagWidth: 		10,
	tagHeight: 		10,
	tagDirection: 	'CENTER'
};

//components
var components = {
	bubble: {
		type: 'text',
		label: 'Bubble',
	},
	bubbleWidth: {
		type: 'number',
		label: 'Width'
	},
	bubbleHeight: {
		type: 'number',
		label: 'Height'
	},


	rule: {
		type: 'ruler',
		fullSize: true,
	},


	tag: {
		type: 'text',
		label: 'Tag',
	},
	tagWidth: {
		type: 'number',
		label: 'Width'
	},
	tagHeight: {
		type: 'number',
		label: 'Height'
	},
	tagDirection: {
		label: 'Direction',
		options: ['LEFT','CENTER','RIGHT','RANDOM']
	},

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// initialize the dialog box
	var dialog = new Dialog.prompt('Object Range Scaler 0.0', components, values);

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
	// create bubble
	var bubble = new Path.FBubble(
		new Point(0,0),
		new Size( values.bubbleWidth, values.bubbleHeight ),
		new Size( values.tagWidth, values.tagHeight ),
		values.tagDirection
	);
 	bubble.fillColor = new GrayColor(1.0);
 	bubble.strokeColor = null;
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Draw();





