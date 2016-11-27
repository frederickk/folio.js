/*
 *
 * FPath.js
 *
 * A collection of shapes for paper.Path and methods for paper.Item
 *
 * FArrow
 * FBubble
 * FChain
 * FCross
 * FDrip
 * FTriangle
 *
 */


/*
 *
 * paper.Item
 *
 */
paper.Item.inject({
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    enumerable: true,
    _prevAngle: 0,
    _prevPosition: {x: 0, y: 0},
    _prevHor: 1.0,
    _prevVer: 1.0,



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
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
        // this.position = pt;
        this.position.snap(scale, options);
    },


    // -----------------------------------------------------------------------------
    /**
     *
     * @return {Number} the distance between the item and the center of the canvas/artboard
     *
     */
    getDistanceToCenter: function() {
        if (this._position != undefined) {
            var dx = this._position.x - view.bounds.center.x;
            var dy = this._position.y - view.bounds.center.y;
            return (dx * dx + dy * dy) + 1;
            // return this._position.getDistance(view.bounds.center);
        }
    },


    // -----------------------------------------------------------------------------
    /**
     * converts a CompoundPath into a Group otherwise returns original Item
     *
     * @return {Group}
     *
     * @example
     * var path = new CompoundPath({
     *  children: [
     *      new Path.Circle({
     *          center: new Point(50, 50),
     *          radius: 30
     *      }),
     *      new Path.Circle({
     *          center: new Point(50, 50),
     *          radius: 10
     *      })
     *  ]
     * });
     * var group = path.toGroup();
     *
     */
    toGroup: function() {
        if (paper.getType(this) === 'CompoundPath') {
            return new Group(this.children);
        }
        else {
            return this;
        }
    },

    /**
     * Rotation that doesn't accumulate
     *
     * @param  {Number} angle
     *
     * @return {Item}
     */
    setRotation: function(angle, center) {
        center = center || this.point;
        this.rotate(
            -(angle - this._prevAngle),
            center
        );
        this._prevAngle = angle;
        return this;
    },

    /**
     * Translation that doesn't accumulate
     *
     * @param  {Point} delta
     *
     * @return {Item}
     */
    setTranslation: function(delta) {
        delta = new Point(delta);
        this.translate(new Point(
            (delta.x - this._prevPosition.x),
            (delta.y - this._prevPosition.y)
        ));
        this._prevPosition = delta;
        return this;
    },

    /**
     * Scaling that doesn't accumulate
     *
     * @param  {Number} arg0  horizontal and vertical scale factor
     *
     * @return {Item}
     */
    /**
     * @param  {Number} arg0  horizontal scale factor
     * @param  {Number} arg1  vertical scale factor
     *
     * @return {Item}
     */
     /**
      * @param  {Number} arg0  horizontal and vertical scale factor
      * @param  {Point}  arg1  scale from
      *
      * @return {Item}
      */
     /**
      * @param  {Number} arg0  horizontal scale factor
      * @param  {Number} arg1  vertical scale factor
      * @param  {Point}  arg2  scale from
      *
      * @return {Item}
      */
     setScaling: function(arg0, arg1, arg2) {
         var hor;
         var ver;
         var pos;
         if (arguments.length === 0) {
             return;
         }
         if (arguments.length === 2) {
             hor = arg0;
             if (arg1 instanceof Point) {
                ver = hor;
                pos = arg1;
             }
             else {
                 ver = arg1;
                 pos = this.position;
             }
         }
         if (arguments.length === 3) {
             hor = arg0;
             ver = arg1;
             pos = arg2;
         }

         this.scale(
             1.0 + (hor - this._prevHor),
             1.0 + (ver - this._prevVer),
             pos
         );
         this._prevHor = hor;
         this._prevVer = ver;
         return this;
     }
});



paper.Path.inject({
    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------

    /*
     *
     * Center Methods
     * TODO: finish adding center methods
     *
     */

    /**
     * Returns the Centroid of Path
     * http://stackoverflow.com/questions/2792443/finding-the-centroid-of-a-polygon
     *
     * @return {Point}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var centroid = triangle.getCentroid(); // { x:60, y:180 }
     *
     */
    getCentroid: function() {
        var centroid = new Point(0,0);

        var signedArea = 0.0;
        var a = 0.0;

        var points = [];
        for (var i = 0; i < this._segments.length-1; ++i) {
            points[0] = this._segments[i].point;
            points[1] = this._segments[i+1].point;

            a = points[0].x*points[1].y - points[1].x*points[0].y;
            signedArea += a;

            centroid.x += (points[0].x + points[1].x)*a;
            centroid.y += (points[0].y + points[1].y)*a;
        }

        // Do last vertex
        points[0] = this._segments[i].point;
        points[1] = this._segments[0].point;

        a = points[0].x*points[1].y - points[1].x*points[0].y;
        signedArea += a;

        centroid.x += (points[0].x + points[1].x)*a;
        centroid.y += (points[0].y + points[1].y)*a;

        signedArea *= 0.5;

        centroid.x /= (6.0*signedArea);
        centroid.y /= (6.0*signedArea);

        return centroid;
    },

    /**
     * Returns the Circumcenter of a triangle
     *
     * TODO: adjust formula to return Circumcenter of any polygon
     *
     * @return {Point}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var circumcenter = triangle.getCircumcenter(); // { x:0, y:180 }
     *
     */
    // getCircumcenter: function() {
    //  var len = this._segments.length;

    //  var points = [];
    //  for (var i = 0; i < len; i++) {
    //      var point = this._segments[i].point
    //      points.push(point);
    //  }
    //  points.sort(FSort.distanceToCenter);

    //  for (var i = 0; i < points.length; i++) {
    //      var point = points[i];
    //      console.log(point.getDistanceToCenter());
    //  }
    //  console.log(points);
    //  console.log(' --------- ');

    //  var l = new Path.Line(
    //      points[0],
    //      points[points.length-1]
    //  );
    //  l.strokeColor = new Color('00ffc7');


    //  return point;
    //  // console.log(this._segments);
    //  // var points = [];
    //  // points = points.sort(FSort.distanceToCenter());
    //  // console.log(points);
    //  // console.log('---------');

    //  // var arr1 = this._segments[0].point.getPerpendicularBisector(this._segments[2].point);
    //  // var arr2;
    //  // if (len === 3) {
    //  //  // triangle
    //  //  arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[2].point);
    //  // }
    //  // else {
    //  //  // polygon...
    //  //  // TODO: get points that are furthest from each other
    //  //  arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[3].point);
    //  // }

    //  // var o = intersection(arr1, arr2);
    //  // // if (o.length < 1) {
    //  // //   err_fail_to_find_center = 1;
    //  // //   // continue;
    //  // // }

    //  // var r  = this._segments[0].point.getDistance(o);
    //  // var r1 = this._segments[1].point.getDistance(o);
    //  // if (r >= r1){
    //  //  rIdx = 0;
    //  // }
    //  // else {
    //  //  rIdx = 1;
    //  //  r = r1;
    //  // }

    //  // function intersection(p, q) {
    //  //  var d = p[0] * q[1] - p[1] * q[0];
    //  //  if (d == 0) return [];
    //  //  return new Point(
    //  //      (q[2] * p[1] - p[2] * q[1])/d,
    //  //      (p[2] * q[0] - q[2] * p[0])/d
    //  //  );
    //  // };


    //  // // var pi = activeDocument.activeLayer.pathItems.ellipse(o[1] + r, o[0] - r, r * 2, r * 2);
    //  // var pi = new Path.Circle(new Point(
    //  //  o.x - r/2,
    //  //  o.y + r/2
    //  // ), r);
    //  // // console.log(pi.position);
    //  // return pi.position;
    // },

    getCircumcenter: function() {
        var len = this._segments.length;
        var pointsX = [],
            pointsY = [];

        var j;
        var k;
        var point;
        for (var i = 0; i < len; i++) {
            j = (i + 1 >= len)
                ? 0
                : i + 1;
            k = (i + 2 >= len)
                ? 1
                : i + 2;

            point = calculate(
                this._segments[i].point,
                this._segments[j].point,
                this._segments[k].point
            );
            pointsX.push(point.x);
            pointsY.push(point.y);
        }

        function calculate(p1, p2, p3) {
            var A = p2.x - p1.x;
            var B = p2.y - p1.y;
            var C = p3.x - p1.x;
            var D = p3.y - p1.y;

            var E = A*(p1.x + p2.x) + B*(p1.y + p2.y);
            var F = C*(p1.x + p3.x) + D*(p1.y + p3.y);

            var G = 2.0*(A*(p3.y - p2.y)-B*(p3.x - p2.x));

            if (Math.abs(G) < Numerical.EPSILON) {
                var arrx = [p1.x, p2.x, p3.x];
                var arry = [p1.y, p2.y, p3.y];

                var minx = arrx.min();
                var miny = arry.min();
                var maxx = arrx.max();
                var maxy = arry.max();

                return new Point((arrx[minx] + arrx[maxx])/2, (arry[miny] + arry[maxy])/2);
            }
            else {
                var cx = (D * E - B * F) / G;
                var cy = (A * F - C * E) / G;
                return new Point(cx, cy);
            }
        };

        return new Point(pointsX.median(), pointsY.median());
    },

    /*
     *
     * TODO: add additional "center" formulas (for polygons)
     * http://mathforum.org/library/drmath/view/57665.html
     *
     */

    /**
     * Returns the Circumcircle of a polygon
     *
     * TODO: fix for triangles...
     *
     * @return {Path.Circle}
     */
    getCircumcircle: function() {
        var that = this;
        var circumradius = 0;
        var arr = this._segments.slice();

        function getDistanceToCentroid(segment) {
            var point = segment.point;
            var x = point.x - that.getCircumcenter().x,
                y = point.y - that.getCircumcenter().y,
                d = x * x + y * y;
            return Math.sqrt(d);
        };
        arr.sort(function(a, b) {
            return getDistanceToCentroid(a) - getDistanceToCentroid(b);
        });

        circumradius = getDistanceToCentroid(arr[arr.length - 1]) + getDistanceToCentroid(arr[arr.length - 2]);
        circumradius /= 2;

        // // for (var i = 0; i < arr.length; i++) {
        // //   var seg = arr[i].point;
        // //   if (seg.getDistance(this.getCentroid()) > circumradius) {
        // //       circumradius = seg.getDistance(this.getCentroid());
        // //   }
        // // }

        return Shape.Circle(
            // that.getCentroid(),
            that.getCircumcenter(),
            // that.getCenterOfPolygon(),
            circumradius
        );
    },

    /**
     * Returns the Incircle of a polygon
     *
     * @return {Path.Circle}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var incircle = triangle.getIncircle(); // new Path.Circle(new Point(60, 180), 120));
     *
     */
    getIncircle: function() {
        var incircleradius = Number.MAX_VALUE;

        for (var i = 0; i < this._segments.length; i++) {
            var seg = this._segments[i].point;
            if (seg.getDistance(this.getCentroid() ) < incircleradius) {
                incircleradius = seg.getDistance(this.getCentroid());
            }
        }

        return Shape.Circle(
            this.getCentroid(),
            incircleradius
        );
    },

    // TODO: currently implementation returns false point
    // getIncenter : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var circum = a + b + c;

    //      return new Point(
    //          (a* p1.x + b * p2.x + c * p3.x) / circum,
    //          (a * p1.y + b * p2.y + c * p3.y) / circum
    //      );
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },

    /**
     * @param {} xb
     *      array of barycentric coordinates
     */
    // TODO: currently implementation returns false point
    // toCartesian : function(bary) {
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      // var area = 0.5 * (p1.x * (p2.y - p3.y) +
    //      //                p2.x * (p3.y - p1.y) +
    //      //                p3.x * (p1.y - p2.y));

    //      // var r = 2 * area / (a + b + c);
    //      // var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

    //      // var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

    //      // var cosC = Math.cos(angleC);
    //      // var sinC = Math.sin(angleC);

    //      // var x =  (k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
    //      // var y =  k*bary[0] - r;

    //      // return new Point(
    //      //  x + this.getIncenter().x,
    //      //  y + this.getIncenter().y
    //      // );

    //      return new Point(
    //          bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
    //          bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
    //      );
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },


    // TODO: currently implementation returns false point
    // getOrthocenter : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var bary = [
    //          this.sec(a),
    //          this.sec(b),
    //          this.sec(c)
    //      ];
    //      return this.toCartesian(bary);
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },


    // TODO: currently implementation returns false point
    // getSchifflerPoint : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var bary = [
    //          1/(Math.cos(b) + Math.cos(c)),
    //          1/(Math.cos(c) + Math.cos(a)),
    //          1/(Math.cos(a) + Math.cos(b))
    //      ];
    //      return this.toCartesian(bary, p1,p2,p3);
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },



    // -----------------------------------------------------------------------------
    statics: new function() {
        return {
            /**
             *
             * FArrow
             * Create simple arrow
             *
             * @param {Point} headPoint
             *          the head of the arrow
             * @param {Point} tailPoint
             *          the tail of the arrow
             * @param {Size} arrowHeadSize
             *          (optional) length of the arrow head
             *
             * @example
             * var headPoint = new Point(9,9);
             * var tailPoint = new Point(90,90);
             * var arrowHeadSize = new paper.Size(18,18);
             * var farrow = new paper.Path.FArrow(headPoint, tailPoint, arrowHeadSize);
             *
             */
            FArrow: function(headPoint, tailPoint, arrowHeadSize) {
                // the line part
                var path = new Path.Line(headPoint, tailPoint);

                // the arrow head
                var arrowHeadSize = arrowHeadSize || new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

                // rotate arrow head around to correct position
                var a = Math.atan2(headPoint.x-tailPoint.x, tailPoint.y-headPoint.y);

                // slight "hack" to get strokCap correct
                var arrowHead = [];
                arrowHead[0] = new Path.Line(new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height));
                arrowHead[1] = new Path.Line(new Point(0,0), new Point(arrowHeadSize.width,-arrowHeadSize.height));
                for (var i = 0; i < arrowHead.length; i++) {
                    arrowHead[i].rotate(180+paper.degrees(a), new Point(0,0));
                    arrowHead[i].translate(headPoint);
                }

                var group = new Group([ path, arrowHead[0], arrowHead[1] ]);
                group.name = 'arrow';
                return group;
            },


            /**
             *
             * FBubble
             * Create a simple speech bubble
             *
             * @param {Point} bubblePoint
             *          the position of the bubble
             * @param {Size} bubbleSize
             *          the size of the bubble
             * @param {Size} bubbleTagSize
             *          the size of the tag
             * @param {String} bubbleTagCenter
             *          (optional)
             *          'RANDOM'    randomly x-position the point (default)
             *          'LEFT'      left align the x-position of the point
             *          'CENTER'    center align the x-position of the point
             *          'RIGHT'     right align the x-position of the point
             *
             * @example
             * var bubblePoint = new Point(45,45);
             * var bubbleSize = new paper.Size(90,60);
             * var bubbleTagSize = new paper.Size(9,9);
             * var bubbleTagCenter = 'CENTER';
             * var bubble = new paper.Path.FBubble(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter);
             *
             */
            FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
                var path = new Path();
                path.name = 'bubble';

                var bubbleTagSize = bubbleTagSize || defaultFBubbleTagSize;
                if (bubbleSize.width < 10) {
                    bubbleSize.width = 10;
                    bubbleTagSize = new Size(10,10);
                }
                var bubbleTagCenter = bubbleTagCenter || 'RANDOM';

                // left side of bubble
                path.add(new Point(0,0));
                var angle = 180;
                var through = new Point(
                    bubbleSize.height/2 + Math.cos(paper.radians(angle) ) * (bubbleSize.height),
                    bubbleSize.height/2 + Math.sin(paper.radians(angle) ) * (bubbleSize.height)
                );
                path.arcTo(through, new Point(0,bubbleSize.height));

                // middle bottom
                // create tag space somewhere along the bottom of the bubble
                var tagStart = paper.randomInt(0,bubbleSize.width-bubbleTagSize.width);

                // create tag
                path.add(new Point(tagStart,bubbleSize.height));

                var tx, ty;
                if (bubbleTagCenter == 'LEFT') {
                    tx = tagStart;
                }
                else if (bubbleTagCenter == 'CENTER') {
                    tx = tagStart + (bubbleTagSize.width/2);
                }
                else if (bubbleTagCenter == 'RIGHT') {
                    tx = tagStart+bubbleTagSize.width;
                }
                else { // if (bubbleTagCenter == 'RANDOM') {
                    tx = paper.randomInt(tagStart,tagStart+bubbleTagSize.width);
                }

                // the length of the tag
                ty = bubbleSize.height + bubbleTagSize.height;
                path.add(new Point(tx,ty));

                // continue bottom
                path.add(new Point(tagStart+bubbleTagSize.width,bubbleSize.height));
                path.add(new Point(bubbleSize.width,bubbleSize.height));


                // right side of bubble
                angle = 0;
                through = new Point(
                    bubbleSize.height/2 + Math.cos(paper.radians(angle) ) * (bubbleSize.height/2),
                    bubbleSize.height/2 + Math.sin(paper.radians(angle) ) * (bubbleSize.height/2)
                );
                path.arcTo(new Point(bubbleSize.width,0), false);

                // middle top
                path.closed = true;

                // center the bubble
                // compensated for the tag's length
                path.position = new Point(bubblePoint.x,bubblePoint.y+(bubbleTagSize.height/2));

                return path;
            },


            /**
             * FChain
             * Create simple chain (a line with different endpoint sizes)
             *
             * @param {Point} arg0
             *          point1 The first point (endpoint1)
             * @param {Number} arg1
             *          radius of endpoint1
             * @param {Point} arg2
             *          point2 The second point (endpoint2)
             * @param {Number} arg3
             *          radius of endpoint2
             *
             * @example
             * var point1 = new Point(9,9);
             * var radius1 = 9;
             * var point2 = new Point(90,90);
             * var radius2 = 90;
             * var fchain = new paper.Path.FChain(point1, radius1, point2, radius2);
             *
             */
            /**
             *
             * @param {Path} arg0
             *          PathItem (endpoint1)
             * @param {Path} arg1
             *          PathItem (endpoint2)
             *
             * @example
             * var path1 = new paper.Path.Circle(new Point(9,9), 9);
             * var path2 = new paper.Path.Circle(new Point(90,90), 90);
             * var fchain = new paper.Path.FChain(path1, path2);
             *
             */
            FChain: function(arg0, arg1, arg2, arg3) {
                var obj1, obj2;

                // check for the type of arguments being passed
                if (paper.getType(arg0) === 'Point') {
                    obj1 = new Path.Circle(arg0, arg1);
                    obj2 = new Path.Circle(arg2, arg3);
                }
                else {
                    obj1 = arg0;
                    obj2 = arg1;
                }

                var tangents = paper.getCommonTangents(obj1, obj2);
                var path = new Path();
                if (tangents != null) {
                    path.name = 'chain';
                    path.add(tangents[0]);
                    path.add(tangents[1]);

                    // determine position of chain around endpoint2
                    if (obj2.position.x > obj1.position.x) {
                        angle = 0;
                    }
                    else if (obj2.position.y < obj1.position.y) {
                        angle = -90;
                    }
                    else if (obj2.position.y > obj1.position.y) {
                        angle = 90;
                    }
                    else {
                        angle = 180;
                    }
                    var tp2 = new Point(
                        obj2.position.x + Math.cos(paper.radians(angle) ) * (obj2.bounds.width/2),
                        obj2.position.y + Math.sin(paper.radians(angle) ) * (obj2.bounds.height/2)
                    );
                    path.arcTo(tp2, tangents[2]);

                    path.add(tangents[2]);
                    path.add(tangents[3]);

                    // determine position of chain around endpoint1
                    if (obj1.position.x > obj2.position.x) {
                        angle = 0;
                    }
                    else if (obj1.position.y < obj2.position.y) {
                        angle = -90;
                    }
                    else if (obj1.position.y > obj2.position.y) {
                        angle = 90;
                    }
                    else {
                        angle = 180;
                    }
                    var tp1 = new Point(
                        obj1.position.x + Math.cos(paper.radians(angle) ) * (obj1.bounds.width/2),
                        obj1.position.y + Math.sin(paper.radians(angle) ) * (obj1.bounds.height/2)
                    );
                    path.arcTo(tp1, tangents[0]);
                    path.closed = true;
                }
                return path;

            },


            /**
             *
             * FCross
             * Create a cross
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Size} size
             *          size [width,height] of cross
             * @param {Number} strokeWidth
             *          thickness of the cross
             * @param {String} crossType (optional)
             *          'SHARP'     sharp edged cross (fill)
             *          'LINE'      simple built of lines (stroke)
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var size = new paper.Size(45,45);
             * var strokeWidth = 18;
             * var crossType = 'LINE';
             * var fcross = new paper.Path.FCross(centerPoint, size, strokeWidth, crossType);
             *
             */
            FCross: function(centerPoint, size, strokeWidth, crossType) {
                var strokeWidth = strokeWidth || 1.0;
                var crossType = crossType || 'LINE';

                // var centerPoint = new Point(_x,_y);
                // var size = new Size(_width,_height);
                var line1, line2;

                if (crossType == 'LINE') {
                    line1 = new Path.Line(
                        centerPoint.x + size.width, centerPoint.y - size.height,
                        centerPoint.x - size.width, centerPoint.y + size.height
                    );
                    line1.strokeWidth = strokeWidth;
                    line2 = new Path.Line(
                        centerPoint.x + size.width, centerPoint.y + size.height,
                        centerPoint.x - size.width, centerPoint.y - size.height
                    );
                    line2.strokeWidth = strokeWidth;
                }
                else if (crossType == 'SHARP') {
                    line1 = new Path();
                    line1.add(new Point(centerPoint.x + size.width, centerPoint.y - size.height ));
                    line1.add(new Point(centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) ));
                    line1.add(new Point((centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height ));
                    line1.add(new Point(centerPoint.x - size.width, centerPoint.y + size.height ));
                    line1.add(new Point(centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) ));
                    line1.add(new Point((centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height ));
                    line1.closed = true;

                    line2 = new Path();
                    line2.add(new Point(centerPoint.x - size.width, centerPoint.y - size.height ));
                    line2.add(new Point((centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height ));
                    line2.add(new Point(centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) ));
                    line2.add(new Point(centerPoint.x + size.width, centerPoint.y + size.height ));
                    line2.add(new Point((centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height ));
                    line2.add(new Point(centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) ));
                    line2.closed = true;
                }

                var group = new Group([ line1, line2 ]);
                group.name = 'cross';
                return group;
            },


            /**
             * FDrip
             * Create a (tear)drop
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Number} arg1
             *          scale drop, maintains intended proportion
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var scale = 45;
             * var fdrop = new paper.Path.FDrip(centerPoint, scale);
             *
             */
            /**
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Size} arg1
             *          scale drop, custom proportion
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var scale = new paper.Size(30,61.8);
             * var fdrop = new paper.Path.FDrip(centerPoint, scale);
             *
             */
            FDrip: function(centerPoint, arg1) {
                var path = new Path();
                path.name = 'drop';

                // segments added from top counter-clockwise
                path.add(new Segment(
                    new Point(-0.01, 0.01),
                    new Point(0, -0.0055078),
                    new Point(0, 0.643042)
                ));
                path.add(new Segment(
                    new Point(-0.65, 1.6381104),
                    new Point(0, -0.6109619),
                    new Point(0, 0.3694434)
                ));
                path.add(new Segment(
                    new Point(0, 2.31),
                    new Point(-0.3578369, 0),
                    new Point(0.3578369, 0)
                ));
                path.add(new Segment(
                    new Point(0.65, 1.6381104),
                    new Point(0, 0.3694434),
                    new Point(0, -0.6109619)
                ));
                path.add(new Segment(
                    new Point(0.01, 0.01),
                    new Point(0, 0.643042),
                    new Point(0, -0.0055078)
                ));
                path.add(new Segment(
                    new Point(0, -0),
                    new Point(0.0055078, 0),
                    new Point(-0.0055078, 0)
                ));
                path.closed = true;
                path.position = centerPoint;

                // check for the type of arguments being passed
                // default scale is from center (position)
                if (typeof arg1 == 'Size') {
                    path.scale(arg1.width, arg1.height);
                }
                else {
                    path.scale(arg1);
                }

                return path;
            },


            /**
             * FTriangle
             * Create a triangle
             *
             * @param {Point} arg0
             *          first point of triangle
             * @param {Point} arg1
             *          second point of triangle
             * @param {Point} arg2
             *          third point of triangle
             *
             * @example
             * var p1 = new Point(9, 9);
             * var p2 = new Point(90, 45);
             * var p3 = new Point(45, 90);
             * var ftriangle = new paper.Path.FTriangle(p1, p2, p3);
             *
             */
             /**
              *
              * @param {Point} arg0
              *          center point of triangle
              * @param {Number} arg1
              *          radius of triangle
              *
              * @example
              * var p1 = new Point(45, 45);
              * var radius = 90;
              * var ftriangle = new paper.Path.FTriangle(p1, radius);
              *
              */
            FTriangle: function(arg0, arg1, arg2) {
                var path;
                if (arguments.length === 3) {
                    path = new Path();
                    path.add(arg0);
                    path.add(arg1);
                    path.add(arg2);
                }
                else if (arguments.length === 2) {
                    path = new Path.RegularPolygon(arg0, 3, arg1);
                }
                else {
                    return;
                }
                path.closed = true;
                path.name = 'triangle';

                return path;
            }
        }; // end return


    } // end statics:
});
