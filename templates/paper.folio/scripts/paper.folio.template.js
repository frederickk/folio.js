console.log('Script Loaded');
/**
*	FolioTemplate 0.8.14
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://kennethfrederick.de/
*	http://blog.kennethfrederick.de/
*
*
*	This template was created to mimic the structure
*	of other popular programming tools for artists/designers
*	such as Processing and OpenFrameworks
*
*	The idea is to make getting Paper.js up and running quicker
*	with a simple template which is contextually similar
*	to other tools.
*
*	By using the accompanying FolioTemplate.html you can
*	simply code everything within this file and all of the
*	necessary callbacks are already implemented in the HTML
*
*	This template takes advantage of Paper.js directly connected
*	to the DOM, so that JavaScript variables created in
*	the HTML can be accessed here and visa versa.
*
*	Feel free to rename this file and HTML template file,
*	but be sure to uppdate the HTML in FolioTemplate.html
*
*/



// ------------------------------------------------------------------------
//
// Properties
//
// ------------------------------------------------------------------------
/*
 *	Add all local properties here
 */




// ------------------------------------------------------------------------
//
// Methods
//
// ------------------------------------------------------------------------
/*
 *	Just like in Processing or OpenFrameworks, the
 *	Setup() is called once upon initial loading
 */
function Setup() {
}

/*
 *	Update() is called every frame
 */
function Update(event) {
}

/*
 *	Draw() is the main method which is called to Draw
 *	elements to the screen, similar to Processing's Draw()
 */
function Draw() {
}

// ------------------------------------------------------------------------
/*
 *	Any additional Methods/Functions needed for this
 *	script can be added here
 */




// ------------------------------------------------------------------------
//
// Events
//
// ------------------------------------------------------------------------
/*
 *	onResize() is called when the browser window's size changes
 *
 *	http://paperjs.org/reference/view#onresize
 */
function onResize(event) {
	view.size = event.size; // currently seems to only work with the nightly-build
}


// ------------------------------------------------------------------------
/*
 *	All of the mouse/touch methods
 *
 *	http://paperjs.org/reference/tool#onmouseup
 *	http://paperjs.org/reference/tool#onmousedown
 *	http://paperjs.org/reference/tool#onmousemove
 *	http://paperjs.org/reference/tool#onmousedrag
 */
function onMouseUp(event) {
}

function onMouseDown(event) {
}

function onMouseMove(event) {
}

function onMouseDrag(event) {
}


// ------------------------------------------------------------------------
/*
 *	All of the keyboard methods
 *
 *	http://paperjs.org/reference/tool#onkeydown
 *	http://paperjs.org/reference/tool#onkeyup
 */
function onKeyDown(event) {
}

function onKeyUp(event) {
}
