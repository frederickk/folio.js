/*
 *
 * Easing.js
 *
 * Easing Functions
 * originally inspired from http://gizma.com/easing/
 * https://gist.github.com/gre/1650294
 *
 * KeySpline Function
 * use bezier curve for transition easing function
 * as inspired from Firefox's nsSMILKeySpline.cpp
 * https://gist.github.com/gre/1926947#file-keyspline-js
 * http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
 *
 * Copyright (c) 2012
 *
 * Gaetan Renaudeau
 * renaudeau.gaetan@gmail.com
 *
 *
 * modified and augemented for usage with Paper.js
 *
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */


folio.FTime.Ease = function() {
    /*
     *
     * values of classic easing functions, similar to CSS
     *
     */
    var splineValues = {
        ease:       [ 0.25, 0.1, 0.25, 1.0 ],
        linear:     [ 0.00, 0.0, 1.00, 1.0 ],
        // in:          [ 0.42, 0.0, 1.00, 1.0 ],
        out:        [ 0.00, 0.0, 0.58, 1.0 ],
        inOut:      [ 0.42, 0.0, 0.58, 1.0 ]
    };


    /**
     *
     * use bezier curve for transition easing function
     *
     * @param {Array} arg0
     *              an array (4) of normalized X,Y values [ x1, y1, x2, y2 ]
     *
     * @example
     * var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
     * spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
     *
     */
    /**
     *
     * use bezier curve for transition easing function
     *
     * @param {Point} arg0
     *              Point 1
     * @param {Point} arg1
     *              Point 2
     *
     * @example
     * var spline = new KeySpline(
     *  new Point( 80, 80 ),
     *  new Point( 10, 45 )
     * );
     * spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
     *
     * @return {Array}
     *
     */
    function KeySpline(arg0, arg1) {
        var values;
        if (arg0 instanceof Array) {
            values = arg0;
        }
        else {
            arg0 = arg0.normalize();
            arg1 = arg1.normalize();
            values = [arg0.x, arg0.y, arg1.x, arg1.y];
        }

        function A(arg0, arg1) { return 1.0 - 3.0 * arg1 + 3.0 * arg0; };
        function B(arg0, arg1) { return 3.0 * arg1 - 6.0 * arg0; };
        function C(arg0) { return 3.0 * arg0; };


        //
        // TODO: push these to be global?
        //
        /**
         * @param {Number} t
         *              a float from 0.0 - 1.0
         * @param {Number} arg0
         *              x1 or y1
         * @param {Number} arg1
         *              x2 or y2
         *
         * @return {Number} x(t)
         *
         */
        function CalcBezier(t, arg0, arg1) {
            return ((A(arg0, arg1)*t + B(arg0, arg1))*t + C(arg0))*t;
        };

        /**
         * @param {Number} t
         *              a float from 0.0 - 1.0
         * @param {Number} arg0
         *              x1 or y1
         * @param {Number} arg1
         *              x2 or y2
         *
         * @return {Number} dx/dt
         *
         */
        function GetSlope(t, arg0, arg1) {
            return 3.0 * A(arg0, arg1)*t*t + 2.0 * B(arg0, arg1) * t + C(arg0);
        };

        function GetTForX(t) {
            // Newton raphson iteration
            var aGuessT = t;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = GetSlope(aGuessT, values[0], values[2]);
                if (currentSlope == 0.0) return aGuessT;
                var currentX = CalcBezier(aGuessT, values[0], values[2]) - t;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        };


        function get(t) {
            // normalize();
            if (values[0] == values[1] && values[2] == values[3]) return t; // linear
            return CalcBezier(GetTForX(t), values[1], values[3]);
        };


        return {
            get: get
        };

    };


    return {
        /*
         * see http://easings.net/de for visual examples
         * of each spline method
         */
        linear     : function(t) { return t },

        inQuad     : function(t) { return t*t },
        outQuad    : function(t) { return t*(2-t) },
        inOutQuad  : function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

        inCubic    : function(t) { return t*t*t },
        outCubic   : function(t) { return (--t)*t*t+1 },
        inOutCubic : function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

        inQuart    : function(t) { return t*t*t*t },
        outQuart   : function(t) { return 1-(--t)*t*t*t },
        inOutQuart : function(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

        inQuint    : function(t) { return t*t*t*t*t },
        outQuint   : function(t) { return 1+(--t)*t*t*t*t },
        inOutQuint : function(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

        inSine     : function(t) { return -1*Math.cos(t*(Math.PI/2))+1 },
        outSine    : function(t) { return 1*Math.sin(t*(Math.PI/2)) },
        inOutSine  : function(t) { return -0.5*(Math.cos(Math.PI*t)-1) },

        inExpo     : function(t) { return 1*Math.pow(2, 10*(t-1)) },
        outExpo    : function(t) { return 1*(-Math.pow(2, -10*t)+1 ) },
        inOutExpo  : function(t) { t /= 0.5; if (t < 1) return 0.5 * Math.pow(2, 10*(t-1)); t--; return 0.5 * (-Math.pow(2, -10*t)+2); },

        inCirc     : function(t) { return -1*(Math.sqrt(1-t*t)-1) },
        outCirc    : function(t) { t--; return 1*Math.sqrt(1-t*t); },
        inOutCirc  : function(t) { t /= 0.5; if (t<1) { return -0.5*(Math.sqrt(1-t*t)-1); }else{ t-=2; return 0.5*(Math.sqrt(1-t*t)+1); } },


        spline     : KeySpline
        // values     : splineValues
    };

};
