// ------------------------------------------------------------------------
/**!
 *
 * REQUIRED LIBRARIES!
 *
 * Paper.js @ http://paperjs.org/
 *
 */


/**
 *
 * Initialize Structure
 *
 */
// TODO: should these be added to the global namespace instead?
// e.g. Folio.setup = function() {
//  ...do stuff
// }
// create methods
// drawing
var Setup = function() {};
var Draw = function() {};
var Update = function() {};

// TODO: implement animation methods for better animation management
// var Animate = function(event, callback) {};
// var AnimateAdd = function(object, order) {};
// var AnimateClear = function() {};

// events
// mouse
var onMouseUp = function() {};
var onMouseDown = function() {};
var onMouseMove = function() {};
var onMouseDrag = function() {};

// keyboard
var onKeyDown = function() {};
var onKeyUp = function() {};



// TODO: add ability to pass global parameters
// var folio = folio(parameters) || {};
(function() {
    'use strict';

    var root = (typeof global !== 'undefined' && global !== null)
        ? global
        : this;

    /*
     *
     * static namespace for library
     *
     */
    var Folio = {
        body  : document.body,
        html  : document.documentElement,

        F3D   : {},
        FIO   : {},
        FTime : {}
    };


    // ------------------------------------------------------------------------
    (function() {
        paper.install(window);
    })();


    // ------------------------------------------------------------------------
@INCLUDES


    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    // once the DOM is ready, setup everything needed for
    // Paper.js and Folio.js
    window.addEventListener('DOMContentLoaded', function() {
        Folio.body = Folio.body || document.body;
        Folio.html = Folio.html || document.documentElement;

        //
        // Initialize Canvas
        //
        var canvases = document.getElementsByTagName('canvas');
        var canvas;
        if (canvases.length === 0) {
            // create container for canvas
            var container = document.createElement('div');
            container.id = 'container';
            container.style.position = 'absolute';
            container.style.top = 0;
            container.style.left = 0;
            container.style.width  = '100%';
            container.style.height = '100%';
            Folio.body.appendChild(container);

            // create canvas element
            canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            canvas.resize = true;
            canvas.style.backgroundColor = 'transparent';
            canvas.style.webkitUserDrag = 'none';
            canvas.style.webkitUserSelect = 'none';
            canvas.style.webkitTapHighlightColor = 'transparent';
            container.appendChild(canvas);
        }
        else {
            // use first canvas found
            canvas = canvases[0];
        }
        if (canvas.style.width === '') {
            canvas.style.width  = '100%';
        }
        if (canvas.style.height === '') {
            canvas.style.height = '100%';
        }
        canvas.classList.add('folio-canvas');

        paper.setup(canvas);



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

        // function Animate(callback) {
        //     for (var i = 0; i < AnimationGroup.children.length; i++) {
        //         if (callback) {
        //             callback(AnimationGroup.children[i]);
        //         }
        //     }
        // }
        // function AnimateAdd(object, order) {
        //     // object must be a valid paper.js item
        //     // default is to add object to top
        //     if (order === 'bottom') {
        //         AnimationGroup.appendBottom(object);
        //     }
        //     else {
        //         AnimationGroup.appendTop(object);
        //     }
        // }
        // function AnimateClear() {
        //     if (project.activeLayer.children.__AnimationGroup) {
        //         project.activeLayer.children.__AnimationGroup.remove();
        //     }
        // }



        // ------------------------------------------------------------------------
        //
        // Events
        //
        // ------------------------------------------------------------------------
        view.onFrame = function(event) {
            if (typeof Update === 'function') {
                Update(event);
            }
            // AnimateClear();
            if (view) {
                view.update();
            }
        };

        // TODO: make this functionality toggleable
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
        function resizeCanvas() {
            // set canvas width and height
            if (canvas.getContext) {
                view.viewSize.width = window.innerWidth
                    ? window.innerWidth
                    : Folio.html.clientWidth;
                view.viewSize.height = window.innerHeight
                    ? window.innerHeight
                    : Folio.html.clientHeight;

                // resetup canvas
                // paper.setup(canvas);
            }

            // clear out view
            paper.clear();

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
        console.log('Folio.js is go!');
    });


    // ------------------------------------------------------------------------
    root.folio = Folio;


}).call(this);
