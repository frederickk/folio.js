/*
 *
 * FSize.js
 *
 * A collection of extensions for paper.Size
 *
 */


/**
 *
 * paper.Size
 *
 */
paper.Size.inject({
    /**
     *
     * @return {Number} area
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getArea(); // 200
     *
     */
    getArea: function() {
        return (this.width * this.height);
    },

    /**
     *
     * @return {Number} area of Item circumcircle
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getCircumarea(); // 200
     *
     */
     getCircumarea: function() {
        var r = this.getCircumradius();
        return Math.PI * (r*r);
    },

    /**
     *
     * @return {Number} area of Item incircle
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getIncirclearea(); // 200
     *
     */
     getIncirclearea: function() {
        var r = this.getIncircleradius();
        return Math.PI * (r*r);
    },

    /**
     *
     * @return {Number} the circumcircle radius of the Size bounding box
     *
     * @example
     * var size = new Size(10, 20);
     * var r = size.getCircumradius(); // 11.180339887498949
     *
     */
    getCircumradius: function() {
        var a = this.width;
        var b = this.height;
        return (Math.sqrt(a * a + b * b) / 2);
    },

    /**
     *
     * @return {Number} the incircle radius of the Size bounding box
     *
     * @example
     * var size = new Size(10, 20);
     * var r = size.getIncircleradius();
     * console.log( r ); // XX
     *
     */
    getIncircleradius: function() {
        return ( this.width < this.height )
            ? this.width/2
            : this.height/2;
    },

    /**
     *
     * Slope is expressed as rise (x) over run (y)
     *
     * @return {Number} angle in radians
     *
     * @example
     * var slope = new Size(10, 20);
     * var result = size.getSlopeAngle();
     * console.log( paper.degrees(result) ); // 26.56
     *
     */
    getSlopeAngle: function() {
        return Math.atan( this.width/this.height );
    }

});
