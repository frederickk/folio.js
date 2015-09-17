/*
 *
 * FColor.js
 *
 * A collection of extensions for paper.Color
 *
 */


/**
 *
 * paper.Color
 *
 */
paper.Color.inject({
    data: null,

    // ------------------------------------------------------------------------
    /**
     *
     * @return {Number} value of input color as integer
     *
     */
    toInt: function() {
        var RgbInt = this.red;
        RgbInt = RgbInt << 8;
        RgbInt |= this.green;
        RgbInt = RgbInt << 8;
        RgbInt |= this.blue;
        return RgbInt;
    },

    /**
     *
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     *
     * @return {String} hex value of input color as string
     *
     */
    toHex: function() {
        function c2h(e) {
            var t = e.toString(16);
            return t.length === 1
                ? '0' + t
                : t;
        }

        return '#' +
            c2h(this.red*255) +
            c2h(this.green*255) +
            c2h(this.blue*255);
    },

    // ------------------------------------------------------------------------
    /**
     * desaturate a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to desaturate color
     *
     * @return {Color} desaturated Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var desaturated = color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    desaturate: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * saturate a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to saturate color
     *
     * @return {Color} saturated Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var saturated = color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    saturate: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation + (this.saturation * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * darken a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to darken color
     *
     * @return {Color} darkened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var darkened = color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    darken: function(amt) {
        var color = new Color(this);
        color.lightness = paper.clamp(this.lightness - (this.lightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * dim a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to dim color
     *
     * @return {Color} dimmed Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var dimmed = color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    dim: function(amt) {
        var color = new Color(this);
        color.brightness = paper.clamp(this.brightness - (this.brightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * lighten a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to lighten color
     *
     * @return {Color} lightened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var lightened = color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    lighten: function(amt) {
        var color = new Color(this);
        // color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.lightness = paper.clamp(this.lightness + (this.lightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * brighten a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to brighten color
     *
     * @return {Color} brightened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var brightened = color.brighten(0.2);
     *
     */
    brighten: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.brightness = paper.clamp(this.brightness + (this.brightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * increase color contrast (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to increase contrast
     *
     * @return {Color} Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var contrasted = color.contrast(0.2);
     *
     */
    contrast: function(amt) {
        var color = new Color(this);
        color.setType(this.type);
        return color.lightness < 0.5
            ? color.darken(amt)
            : color.lighten(amt);
    },

    /**
     * invert color
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @return {Color} inverted Color
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var inverted = color.invert();
     *
     */
    invert: function() {
        var color = new Color(this);
        color.hue += 180;
        color.setType(this.type);
        return color;
    },

    /**
     * rotate color around hsb/l color wheel other components remain the same
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} degree
     *      (0.0 - 360.0) rotation degree
     *
     * @return {Color} rotated Color
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var compliment = color.rotate(180);
     *
     * var color = new Color(0.0, 1.0, 0.7);
     * var triad = [
     *  color,
     *  color.rotate(120),
     *  color.rotate(240)
     * ];
     *
     */
    rotate: function(degree) {
        var color = new Color(this);
        color.hue += degree;
        color.setType(this.type);
        return color;
    },

    /**
     * interpolate color
     *
     * @param {Color} from
     *      start color
     * @param {Color} to
     *      end color
     * @param {Number} amt
     *      float: between 0.0 and 1.0
     *
     * @return {Color} interpolated color
     *
     * @example
     * var color1 = new Color(0.0, 1.0, 0.7);
     * var color2 = new Color(0.0, 0.7, 1.0);
     * var interpolateColor = new Color().interpolate(color1, color2, 0.5);
     *
     */
    /**
     *
     * @param {Color} to
     *      end color
     * @param {Number} amt
     *      float: between 0.0 and 1.0
     *
     * @return {Color} interpolated color
     *
     * @example
     * var color1 = new Color(0.0, 1.0, 0.7);
     * var color2 = new Color(0.0, 0.7, 1.0);
     * var interpolateColor = color1.interpolate(color2, 0.5);
     *
     */
    //
    //  TODO: would interpolateTo make more sense?
    //
    // interpolateTo: function(toColor, amt) {
    //  var color = new Color(this);
    //  for (var i = 0; i < color._components.length; i++) {
    //      color._components[i] += ((toColor._components[i] - color._components[i]) * amt);
    //  }
    //  return color;
    // },
    interpolate: function(arg0, arg1, arg2) {
        var color = new Color(this);

        if (typeof arg1 === 'number') {
            var to = arg0.getComponents();
            for (var i = 0; i < color._components.length; i++) {
                // color._components[i] += ((to[i] - color._components[i]) * arg1);
                color._components[i] = paper.interpolate(color._components[i], to[i], arg1);
            }
        }
        else {
            var from = arg0.getComponents();
            var to = arg1.getComponents();
            for (var i = 0; i < color._components.length; i++) {
                // color._components[i] += ((to[i] - from[i]) * arg2);
                color._components[i] = paper.interpolate(from[i], to[i], arg2);
            }
        }

        color.setType(this.type);
        return color;
    },


    statics: {
        /**
         *
         * @return {Color} random Color based on initialization arguments
         *
         * @example
         * var color = new Color.random();
         * // all values between 0.0 and 1.0
         * // [ red: 0.1, green: 0.5, blue: 1.0 ]
         *
         * var color = new Color.random(0.5);
         * // value between 0.5 and 1.0
         * // [ gray: 0.7 ]
         *
         * var color = new Color.random(0.3, 0.6, 0.9);
         * // red value between 0.4 and 1.0, etc.
         * // [ red: 0.4, green: 0.7, blue: 1.0 ]
         *
         * var color = new Color.random(90, 1, 0.8);
         * // hue value between 90 and 360, etc.
         * // [ hue: 154, saturation: 1, brightness: 0.9 ]
         *
         * var color = new Color.random([45, 90], [0.7, 1.0], [0.5, 0.8]);
         * // hue value between 90 and 360, etc.
         * // [ hue: 274, saturation: 1, lightness: 0.9 ]
         *
         */
        random: function(arg0, arg1, arg2, arg3) {
            var components;

            if (paper.getType(arg0) === 'String') {
                var hex = arg0.substring(1);
                return new Color.random(
                    parseInt(hex.slice(0,2), 16)/255,
                    parseInt(hex.slice(2,4), 16)/255,
                    parseInt(hex.slice(4,6), 16)/255
                );
            }
            else if (paper.getType(arg0) === 'Object') {
                components = {};
                for (var key in arg0) {
                    if (paper.getType(arg0[key]) === 'Array') {
                        components[key] = paper.random(arg0[key][0], arg0[key][1]);
                    }
                    else {
                        components[key] = paper.random(0.0, arg0[key]);
                    }
                }
            }
            else {
                components = [];
                var len = (arguments.length > 0)
                    ? arguments.length
                    : 4;

                for (var i = 0; i < len; i++) {
                    if (paper.getType(arguments[i]) === 'Array') {
                        components.push(paper.random(arguments[i][0], arguments[i][1] ));
                    }
                    else if (paper.getType(arguments[i]) === 'Number') {
                        components.push(paper.random(0.0, arguments[i] ));
                    }
                    else {
                        components.push(paper.random(1.0));
                    }
                }
            }

            var c = new Color(components);
            c.data = (arg0 === 'hex')
                ? components
                : null;
            c.alpha = 1.0;
            c.setType((components[0] > 1.0)
                ? 'hsb'
                : 'rgb'
            );
            return c;
        },

        // ------------------------------------------------------------------------
        /**
         *
         * @param {Number} RgbInt
         *      value as integer
         *
         * @return {Color} value of integer as Color
         *
         */
        integer: function(RgbInt) {
            return new Color(
                (RgbInt >> 16) & 255,
                (RgbInt >> 8) & 255,
                RgbInt & 255
            );
        },

        /**
         *
         * @param {Number} arg0
         *      red as byte value (0-255)
         * @param {Number} arg1
         *      green as byte value (0-255)
         * @param {Number} arg2
         *      blue as byte value (0-255)
         * @param {Number} arg3
         *      alpha as byte value (0-255)
         *
         * @return {Color}
         *
         */
        bytes: function(arg0, arg1, arg2, arg3) {
            if (arguments.length === 4) {
                return new Color(
                    arg0/255,
                    (arg1 != undefined) ? arg1/255 : arg0/255,
                    (arg2 != undefined) ? arg2/255 : arg0/255,
                    (arg3 != undefined) ? arg3/255 : 1.0
                );
            }
            else {
                return new Color(
                    arg0/255,
                    (arg1 != undefined) ? arg1/255 : arg0/255,
                    (arg2 != undefined) ? arg2/255 : arg0/255
                );
            }
        },
    }


});


