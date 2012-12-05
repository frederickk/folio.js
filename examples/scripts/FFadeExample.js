/**
 *	FFade Example
 *	Speak Up
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	A conversation of fading bubbles
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = Frederickk;
var fshape = f.FShape;

var animate = new FrederickkPaper.FFade();
var fade = new FrederickkPaper.FFade();
var blend = new FrederickkPaper.FFade();

var bAnimate = true;

var bubble;

var colors = [

];


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// FFade
	animate.setFadeSeconds(1);
	fade.setFadeSeconds(0.5);
	blend.setFadeSeconds(10);

	// speech bubble
	bubble = new fshape.FBubble(400,200, 'CENTER');
	bubble.fillColor = 'white';
	bubble.position = view.bounds.center;
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	// animate
	animate.init(event.time);
	if (bAnimate) animate.fadeIn();
	else if (!bAnimate) animate.fadeOut();

	// fade
	fade.init(event.time);
	if (bFade) fade.fadeIn();
	else if (!bFade) fade.fadeOut();

	// blend
	blend.init(event.time);
	if (bBlend) blend.fadeIn();
	else if (!bBlend) blend.fadeOut();


	if(animate.alpha <= 0.0) {
		// bubble = new fshape.FBubble(400,200, 'CENTER');
		// bubble.fillColor = 'white';
	}
	else {
		Draw();
	}	
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// bubble.opacity = animate.alpha;

	bubble.position.x = FrederickkPaper.lerp(
		view.bounds.leftCenter.x + bubble.bounds.width,
		view.bounds.rightCenter.x - bubble.bounds.width, 
		animate.alpha
	);

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function reset() {
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
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
	if(event.key == '1') {
		bAnimate = !bAnimate;
	}
	if(event.key == '2') {
		bFade = !bFade;
	}
	if(event.key == '3') {
		bBlend = !bBlend;
	}
};

function onKeyUp(event) {
};






