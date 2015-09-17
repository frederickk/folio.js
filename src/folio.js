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


var body = document.body;
var html = document.documentElement;


/**
 *
 * Initialize Structure
 *
 */
// create methods
// drawing
var Setup = function() {};
var Draw = function() {};
var Update = function(event) {};

var Animate = function(object) {};
var AnimateClear = function() {};

// events
// mouse
var onMouseUp = function(event) {};
var onMouseDown = function(event) {};
var onMouseMove = function(event) {};
var onMouseDrag = function(event) {};

// keyboard
var onKeyDown = function(event) {};
var onKeyUp = function(event) {};


/**
 *
 * Initialize Canvas
 *
 */
var container = document.createElement('div');
container.id = 'container';
container.style.position = 'absolute';
container.style.width    = '100%'; //Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth ) + 'px'; // '100%';
container.style.height   = '100%'; //Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) + 'px'; // '100%';
document.body.appendChild( container );

var canvases = document.getElementsByTagName('canvas');
var canvas;
if (canvases.length === 0) {
    // create canvas element
    canvas = document.createElement('canvas');
    canvas.id     = 'canvas';
    canvas.width  = '100%';
    canvas.height = '100%';
    canvas.resize = true;
    canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.0)'; //#ffffff';
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
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    if (typeof Setup === 'function') {
        Setup();
    }
    if (typeof Draw === 'function') {
        Draw();
    }


    // ------------------------------------------------------------------------
    var AnimationGroup = new Group();
    AnimationGroup.name = '__AnimationGroup';

    function Animate(object, order) {
        // object must be a valid paper.js item
        // default is to add object to top
        if (order === 'bottom') {
            AnimationGroup.appendBottom(object);
        }
        else {
            AnimationGroup.appendTop(object);
        }
    }
    function AnimateClear() {
        if (project.activeLayer.children['__AnimationGroup']) {
            project.activeLayer.children['__AnimationGroup'].remove();
        }
    }



    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    view.onFrame = function(event) {
        // TODO:    add a method which clears an "animation group" each frame
        if (typeof Update === 'function') {
            Update(event);
        }
        AnimateClear();
        view.update();
    };

    view.onResize = function(event) {
        if (typeof onResize === 'function') {
            onResize(event);
        }
    };

    // ------------------------------------------------------------------------
    var tool = new Tool();
    tool.onMouseUp = function(event) {
        if (typeof onMouseUp === 'function') {
            onMouseUp(event);
        }
    };

    tool.onMouseDown = function(event) {
        if (typeof onMouseDown === 'function') {
            onMouseDown(event);
        }
    };

    tool.onMouseMove = function(event) {
        if (typeof onMouseMove === 'function') {
            onMouseMove(event);
        }
    };

    tool.onMouseDrag = function(event) {
        if (typeof onMouseDrag === 'function') {
            onMouseDrag(event);
        }
    };


    // ------------------------------------------------------------------------
    tool.onKeyDown = function(event) {
        if (typeof onKeyDown === 'function') {
            onKeyDown(event);
        }
    };

    tool.onKeyUp = function(event) {
        if (typeof onKeyUp === 'function') {
            onKeyUp(event);
        }
    };



    // ------------------------------------------------------------------------
    view.draw(); // draw the screen
    view.update();



    // ------------------------------------------------------------------------
    function resizeCanvas(event) {
        // set canvas width and height
        if (canvas.getContext) {
            view.viewSize.width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth;
            view.viewSize.height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight;

            // resetup canvas
            // paper.setup(canvas);
        }

        // clear out view
        // paper.clear();

        // re-initiate setup
        if (typeof Setup === 'function') {
            Setup();
        }
        // re-initiate draw
        if (typeof Draw === 'function') {
            Draw();
        }

        // make sure view does its draw
        view.draw();
        // view.update();
    }
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);



    // ------------------------------------------------------------------------
    // resizeCanvas();
    console.log('Folio.js is go!');
};


