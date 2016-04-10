/*
 *
 * FPoint.js
 *
 * A collection of extensions for paper.Point
 *
 */


/**
 *
 * paper.Point
 *
 */
paper.Point.inject({
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    name: null,
    data: {},



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * http://gmc.yoyogames.com/index.php?showtopic=290349
     *
     * @param {Size} spacing
     *          scale.width  = x scale of the grid.
     *          scale.height = y scale of the grid.
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    /**
     *
     * @param {Number} scale
     *          scale of the grid
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    snap: function(scale, options) {
        var options = (options != undefined)
            ? options
            : { grid: true, isometric: false };
        var scale = (scale.type === 'Size')
            ? scale
            : new Size(scale,scale);

        var ix, iy;
        if (options.isometric === true) {
            ix = Math.round(this.y/(16*scale.height) - this.x/(32*scale.width));
            iy = Math.round(this.y/(16*scale.height) + this.x/(16*scale.width));
            this.x = (iy - ix)/2*(32*scale.width);
            this.y = (iy + ix)/2*(16*scale.height);
        }
        else {
            ix = Math.round(this.y/scale.height - this.x/scale.width);
            iy = Math.round(this.y/scale.height + this.x/scale.width);
            this.x = (iy - ix)/2*scale.width;
            this.y = (iy + ix)/2*scale.height;
        }

        return this;
    },

    /**
     *
     * https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
     *
     * @param {Point} arg0
     *      interpolates the point towards a given target point
     * @param {Number} arg1
     *      (0.0 - 1.0) interpolation factor
     * @return {Point} interpolated Point
     *
     * @example
     * var point = new Point(0, 0);
     * var arg0 = new Point(100, 100);
     * point.interpolateTo(arg0, 0.5); // {x: 50, y: 50}
     *
     */
    interpolateTo: function(arg0, arg1) {
        // this.x += ((arg0.x - this.x) * arg1);
        // this.y += ((arg0.y - this.y) * arg1);
        // return this;
        return new Point(
            this.x + ((arg0.x - this.x) * arg1),
            this.y + ((arg0.y - this.y) * arg1)
        );
    },

    /**
     * Flip the X axis
     *
     * @return {Point}
     *
     */
    invertX: function() {
        this.x = view.bounds.width - this.x;
        return this;
    },

    /**
     * Flip the Y axis
     *
     * @return {Point}
     *
     */
    invertY: function() {
        this.y = view.bounds.height - this.y;
        return this;
    },

    /**
     * Returns the distance between the point and the center of the canvas
     *
     * @return {Number}
     *
     */
    getDistanceToCenter: function() {
        // var dx = this.x - view.bounds.center.x;
        // var dy = this.y - view.bounds.center.y;
        // return (dx * dx + dy * dy) + 1;
        return this.getDistance( view.bounds.center );
    },

    /**
     * Returns the mid between two points
     *
     * @return {Point}
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getMid(point2); // { x: 45, y: 135 }
     *
     */
    getMid: function(point) {
        return new Point((this.x + point.x) / 2, (this.y + point.y) / 2);
    },

    /**
     * Returns the perpendicular bisector of two points
     * TODO: test! test! test!
     *
     * @param  {Point} point
     * @param  {Number} scale (default: 1.0)
     *
     * @return {Object}
     * {
     *  start : {Point}, // starting point of bisector
     *  mid   : {Point}, // mid point of bisector
     *  end   : {Point}  // end point of bisector
     * }
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getPerpendicularBisector(point2);
     *
     */
    /**
     * @param  {Point} point
     * @param  {String} scale 'fit' will scale the bisector to fit view
     *
     * @return {Object}
     * {
     *  start : {Point}, // starting point of bisector
     *  mid   : {Point}, // mid point of bisector
     *  end   : {Point}  // end point of bisector
     * }
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getPerpendicularBisector(point2, 'fit');
     *
     */
    getPerpendicularBisector: function(point, scale) {
       var line = new Path.Line(this, point);
       line.setRotation(90);

       scale = scale || 1.0;
       if (scale === 'fit') {
           scale = view.size.getArea() / line.bounds.size.getArea();
       }
       line.setScaling(scale, scale);

       var result = {
           start : line.segments[0].point,
           mid   : line.position,
           end   : line.segments[1].point
       }
       line.remove();

       return result;
    },

    /**
     * Returns slope of two points
     * TODO: slope ratio?
     *
     * @param  {Point} point
     *
     * @return {Number} slope ratio
     *
     */
    getSlope: function(point) {
        return paper.slopeRatio(this, point);
    },

    /**
     *
     * Returns the heading angle (radians) of a point
     *
     * @return {Number} vector heading of Point
     *
     * @example
     * var point = new Point(0, 90);
     * var result = point.getHeading();
     * console.log( paper.degrees(result) ); // 90
     *
     */
    getHeading: function() {
        return -1 * (Math.atan2(-this.y, this.x));
    },

    /**
     * Get the vector angle (radians) of two points
     *
     * @param {Point} point1
     *      first point
     * @param {Point} point2
     *      second point
     *
     * @return {Number} vector angle (radians)
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getAngle(point2);
     * console.log( paper.degrees(result) ); // 45
     *
     */
    getAngle: function(point2) {
        var point2 = point2 || new Point(0, 0);
        return Math.atan2(point2.y - this.y, point2.x - this.x);
    },

    /**
     * Normalize a point between two other points (start and end).
     *
     * @param {Point} start
     *          start Point
     * @param {Point} stop
     *          stop Point
     *
     * @return {Point} normalized Point
     *
     * @example
     * var point = new Point(30, 270);
     * var start = new Point(90, 180);
     * var stop = new Point(180, 360);
     * point.norm(start, stop); // { x: -0.66667, y: 0.5 }')
     *
     */
    norm: function(start, stop) {
        this.x = paper.normalize(this.x, start.x, stop.x);
        this.y = paper.normalize(this.y, start.y, stop.y);
        return this;
    },

        // /**
    //  *
    //  * @return {Point} limit Point
    //  *
    //  */
    // limit: function(lim) {
    //  if (this.magSq() > lim * lim) {
    //      this.normalize();
    //      this.mult * lim;
    //      return this;
    //  }
    //  return this;
    // },

    /**
     * @return {Number} vector mag squared
     *
     * @example
     * var point = new Point(0, 90);
     * var result = point.magSq();
     * console.log(result); // 8100
     *
     */
    magSq: function() {
        return this.x * this.x + this.y * this.y;
    },

    statics: {
        /**
         * @param {Point} arg0
         *      starting Point
         * @param {Point} arg1
         *      ending Point
         * @param {Number} arg2
         *      (0.0 - 1.0) interpolate factor
         *
         * @return {Point} new interpolated Point
         *
         * @example
         * var start = new Point(0, 30);
         * var end = new Point(360, 90);
         * var interpolate = new Point.interpolateTo( start, end, 0.5 );
         * console.log( interpolate ); // { x: 180, y: 60 }
         *
         */
        interpolateTo: function(arg0, arg1, arg2) {
            return arg0.interpolateTo(arg1, arg2);
        },

        /**
         * Flip the X axis
         *
         * @param {Point} point
         *
         * @return {Point}
         *
         */
        invertX: function(point) {
            var point = new Point(point);
            return point.invertX();
        },

        /**
         * Flip the Y axis
         *
         * @param {Point} point
         *
         * @return {Point}
         *
         */
        invertY: function(point) {
            var point = new Point(point);
            return point.invertY();
        },

        /**
         * @param {Array} arg0
         *          range for x values
         * @param {Array} arg1
         *          range for y values
         *
         * @return {Point} random point
         *
         * @example
         * var point = new Point.random([0, 90],[0, 90]);
         * console.log(point); // {x: 34, y: 56}
         *
         */
        /**
         * @param {Number} arg0
         *          max x value
         * @param {Number} arg1
         *          max y value
         *
         * @return {Point} random Point
         *
         * @example
         * var point = new Point.random(90, 90);
         * console.log(point); // {x: 34, y: 56}
         *
         */
        random: function(arg0, arg1) {
            var x = ( typeof arg0 === 'array' )
                ? paper.random(arg0[0], arg0[1])
                : paper.random(arg0);
            var y = ( typeof arg0 === 'array' )
                ? paper.random(arg1[0], arg1[1])
                : paper.random(arg1);

            return new Point(x,y);
        }
    }

});
