/*
 *
 * Pattern.js
 *
 * A Pattern class
 *
 * FHatch
 * Polka Dot
 *
 */


/*
 *
 * paper.Style
 *
 */
// paper.Style.inject({
//     enumerable: true,
//     defaults.fillPattern: undefined,
//
//     hasPattern: function() {
//         return !!this.getFillPattern();
//     }
// });


/**
 * Pattern
 *
 * @param  {Object} options
 * {
 *     max         : 100,     // maximum no. of lines
 *     min         : 10,      // minimum no. of lines
 *     density     : 0.1,     // density 0.0 - 1.0
 *     strokeWidth : 2,       // width of stroke
 *     strokeColor : 'white', // color of stroke
 *     fillColor   : 'blue',  // color of background
 * }
 *
 * @return {Object}
 *
 */
var Pattern = Base.extend({
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    _class: 'Pattern',



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    initialize: function Pattern(options) {
        this._id = Pattern._id = (Pattern._id || 0) + 1;
        if (!this._path) {
            this.setPath(options.path || null);
        }
        if (!this._min) {
            this.setMin(options.min || 0);
        }
        if (!this._max) {
            this.setMax(options.max || 100);
        }
        this.setDensity(options.density || 1.0);
        this.setStrokeWidth(options.strokeWidth || null);
        this.setStrokeColor(options.strokeColor || null);
        this.setFillColor(options.FillColor || null);
    },

    _serialize: function(options, dictionary) {
        return Base.serialize([
            this._path,
            this._min,
            this._max,
            this._density,
            this._strokeWidth,
            this._strokeColor,
            this._fillColor
        ], options, true, dictionary);
    },

    _changed: function() {
        if (this._owner) {
            this._owner._changed(65);
        }
    },

    setPath: function(path) {
        this._path = path;
        this._changed();
    },

    setMin: function(min) {
        this._min = min;
        this._changed();
    },

    setMax: function(max) {
        this._max = max;
        this._changed();
    },

    setDensity: function(density) {
        this._density = (Math.round(this._max * density) < this._min)
            ? this._min
            : Math.round(this._max * density);
        this._changed();
    },

    setStrokeWidth: function(strokeWidth) {
        this._strokeColor = strokeWidth;
        this._changed();
    },

    setStrokeColor: function(color) {
        this._strokeColor = Color.read(arguments);
        if (this._strokeColor === color) {
            this._strokeColor = color.clone();
        }
        this._strokeColor._owner = this;
        this._changed();
    },

    setFillColor: function(color) {
        this._fillColor = Color.read(arguments);
        if (this._fillColor === color) {
            this._fillColor = color.clone();
        }
        this._fillColor._owner = this;
        this._changed();
    },

});


Pattern.inject({ statics: new function() {
    return {
        /**
         * [function description]
         * @return {[type]} [description]
         */
        FPolkaDot: function() {

        },

        /**
         * [function description]
         *
         * @return {[type]} [description]
         */
        FHatch: function() {
            var options = Base.readNamed(arguments)

            console.log('FHatch OPTIONS', options);
            console.log('this._strokeColor', options.strokeColor);
            console.log('this._min', options.min);

            var groupHatch = new Group();

            // // gather points
            // var points = [];
            // for (var i = 0; i < this._segments.length; i++) {
            //     points.push(this._segments[i].point);
            // }
            //
            // // distances
            // var distances = [];
            // for (var i = 0, j = points.length - 1; i < points.length; i++, j--) {
            //     distances.push(points[i].getDistance(points[j]));
            // }
            //
            // // draw hatch lines
            // var ratio;
            // var line;
            // var linePt1, linePt2;
            // var m;
            // for (var j = 0; j < density; j++) {
            //     ratio = (j / density);
            //     linePt1 = new Point();
            //     linePt2 = new Point();
            //
            //     m = parseInt(Math.max.apply(Math, distances));
            //     switch(m % 3) {
            //         case 0:
            //             linePt1.x = (points[0].x + (points[2].x - points[0].x) * ratio);
            //             linePt1.y = (points[0].y + (points[2].y - points[0].y) * ratio);
            //             linePt2.x = (points[1].x + (points[2].x - points[1].x) * ratio);
            //             linePt2.y = (points[1].y + (points[2].y - points[1].y) * ratio);
            //             break;
            //
            //         case 1:
            //             linePt1.x = (points[1].x + (points[0].x - points[1].x) * ratio);
            //             linePt1.y = (points[1].y + (points[0].y - points[1].y) * ratio);
            //             linePt2.x = (points[2].x + (points[0].x - points[2].x) * ratio);
            //             linePt2.y = (points[2].y + (points[0].y - points[2].y) * ratio);
            //             break;
            //
            //         case 2:
            //             linePt1.x = (points[0].x + (points[1].x - points[0].x) * ratio);
            //             linePt1.y = (points[0].y + (points[1].y - points[0].y) * ratio);
            //             linePt2.x = (points[2].x + (points[1].x - points[2].x) * ratio);
            //             linePt2.y = (points[2].y + (points[1].y - points[2].y) * ratio);
            //             break;
            //     }
            //
            //     line = new Path.Line(
            //         linePt1,
            //         linePt2
            //     );
            //     line.strokeWidth = properties.strokeWidth || 1;
            //     line.strokeColor = (properties.strokeColor != undefined)
            //         ? properties.strokeColor
            //         : (properties.background)
            //             ? null
            //             : this.strokeColor;
            //
            //     line.strokeCap = 'square';
            //     line.fillColor = null;
            //
            //     groupHatch.appendTop(line);
            // }
            //
            // // create mask
            // var mask = this.clone();
            // mask.name = '__mask';
            // mask.fillColor = (properties.fillColor != undefined)
            //     ? properties.fillColor
            //     : (properties.background)
            //         ? null
            //         : this.fillColor;
            // mask.strokeColor = (properties.strokeColor != undefined)
            //     ? properties.strokeColor
            //     : (properties.background)
            //         ? null
            //         : this.strokeColor;
            // mask.strokeWidth = properties.strokeWidth || 1;
            // groupHatch.appendBottom(mask);
            //
            // // clear path
            // this.remove();

            return groupHatch;
        }
    };

}});



/*
 *
 * paper.Item
 *
 */
// paper.Path.inject({
//     // -----------------------------------------------------------------------------
//     //
//     // Properties
//     //
//     // -----------------------------------------------------------------------------
//     enumerable: true,
//
//     // fillPattern: {
//     //     statics: new Pattern({
//     //         path        : Base,
//     //         strokeWidth : this._strokeWidth,
//     //         strokeColor : this._strokeColor,
//     //         fillColor   : this._fillColor,
//     //     }),
//     //     FHatch: Pattern.FHatch,
//     //     FPolkaDot: Pattern.FPolkaDot
//     // }
//
//     getPath: function() {
//         // console.log('getPath', this);
//         return 'boom';
//     },
//
//     fillPattern: {
//         FHatch: new function(options) {
//             console.log('FHATCH', this.getPath());
//             return new Pattern.FHatch(options);
//         },
//         FPolkaDot: null
//     }
//
//
// });
