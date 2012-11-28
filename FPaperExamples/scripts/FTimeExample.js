console.log( 'FTime Example Loaded' );
/**
*	FTime Example 0.0
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = Frederickk;
var ftime = new f.FTime();

var stopwatch = new StopWatch();

var time = {
	start: null,
	elapsed: null
}


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	time.elapsed = new PointText( view.bounds.center );
	time.elapsed.justification = 'center';
	time.elapsed.characterStyle = {
		fontSize: 72,
		fillColor: 'black'
	};
	time.elapsed.content = '00:00';
}



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	time.elapsed.content = ftime.get( stopwatch.get(), new Array(false,true,true) );
}



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
}



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
}


// ------------------------------------------------------------------------
function onMouseUp(event) {
}

// ------------------------------------------------------------------------
function onMouseDown(event) {
}

// ------------------------------------------------------------------------
function onMouseMove(event) {
}

// ------------------------------------------------------------------------
function onMouseDrag(event) {
}


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'space') {
		stopwatch.StartStop();
	}

}

// ------------------------------------------------------------------------
function onKeyUp(event) {
}
