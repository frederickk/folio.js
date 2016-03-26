/**!
 * FTriangulate
 *
 * Delaunay Triangulation
 * Joshua Bell
 * inexorabletash@hotmail.com
 *
 * http://www.travellermap.com/
 * Inspired by: http://www.codeguru.com/cpp/data/mfc_database/misc/article.php/c8901/
 *
 *
 * Modifications for specific use with Paper.js/Scriptographer
 *
 * Ken Frederick
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * Credit given where credit is due
 *
 *
 * This work is hereby released into the Public Domain. To view a copy of the public
 * domain dedication, visit http://creativecommons.org/licenses/publicdomain/ or send
 * a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco,
 * California, 94105, USA.
 *
 */



// ------------------------------------------------------------------------
//
// Constants
//
// ------------------------------------------------------------------------
var EPSILON = 1.0e-6;



/**
 * FTriangulate
 *
 * @param {Array} points
 *      input vertices (Points)
 *
 * @return {Array}
 *
 * @example
 * var triangulate = new FTriangulate( points );
 *
 * // draw faces
 * for (var i = 0; i < triangulate.length; i++) {
 *  var triangle = triangulate[i];
 *
 *  // draw triangle
 *  face = new Path();
 *  face.add( triangle.p1 );
 *  face.add( triangle.p2 );
 *  face.add( triangle.p3 );
 *  face.closed = true;
 *  face.strokeColor = 'white';
 *
 * }
 */
folio.FTriangulate = function(points) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var _triangles;
    var _points = points;
    var _pointsNew = [];



    // -----------------------------------------------------------------------------
    //
    // Classes
    //
    // -----------------------------------------------------------------------------
    /**
     * Triangle
     *
     * @param {Point} p1
     *          first Point of Triangle
     * @param {Point} p2
     *          second Point of Triangle
     * @param {Point} p3
     *          third Point of Triangle
     */
    // TODO: remove this and rely on Path.Triangle
    var Triangle = function( p1, p2, p3) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var _p1 = p1;
        var _p2 = p2;
        var _p3 = p3;



        // -----------------------------------------------------------------------------
        //
        // Methods
        //
        // -----------------------------------------------------------------------------
        /**
         * vertex (Edge) sharing
         *
         * @param {Triangle} other
         *          the triangle to check for vertex (Edge) sharing
         *
         * @return {Triangle} the triangle that shares the given vertex (Edge)
         */
        function sharesVertex(other) {
            return p1 == other.p1 || p1 == other.p2 || p1 == other.p3 ||
            p2 == other.p1 || p2 == other.p2 || p2 == other.p3 ||
            p3 == other.p1 || p3 == other.p2 || p3 == other.p3;
        };

        /**
         * @return {Point} circle
         *      Point of the circle center
         */
        function circumcenter() {
            var circle = new Point();
            var m1, m2;
            var mx1, mx2;
            var my1, my2;

            if (Math.abs(_p2.y-_p1.y) < EPSILON) {
                m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
                mx2 = (_p2.x + _p3.x) / 2.0;
                my2 = (_p2.y + _p3.y) / 2.0;
                circle.x = (_p2.x + _p1.x) / 2.0;
                circle.y = m2 * (circle.x - mx2) + my2;

            }
            else if (Math.abs(_p3.y-_p2.y) < EPSILON) {
                m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
                mx1 = (_p1.x + _p2.x) / 2.0;
                my1 = (_p1.y + _p2.y) / 2.0;
                circle.x = (_p3.x + _p2.x) / 2.0;
                circle.y = m1 * (circle.x - mx1) + my1;

            }
            else {
                m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
                m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
                mx1 = (_p1.x + _p2.x) / 2.0;
                mx2 = (_p2.x + _p3.x) / 2.0;
                my1 = (_p1.y + _p2.y) / 2.0;
                my2 = (_p2.y + _p3.y) / 2.0;
                circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
                circle.y = m1 * (circle.x - mx1) + my1;
            }

            return circle;
        };

        // -----------------------------------------------------------------------------
        /**
         * @return {Point} the centroid center
         *
         * http://www.mathwords.com/c/centroid_formula.htm
         */
        function centroid() {
            return new Point(
                (_p1.x + _p2.x + _p3.x)/3,
                (_p1.y + _p2.y + _p3.y)/3
            );
        };

        // -----------------------------------------------------------------------------
        /**
         * @return {Array} a sorted array (Edge) of the Triangle's Edges (shortest to longest)
         */
        function distances() {
            var distances = [];
            distances[0] = new Edge(_p1, _p2);
            distances[1] = new Edge(_p1, _p3);
            distances[2] = new Edge(_p3, _p2);

            distances.sort();
            return distances;
        };

        // -----------------------------------------------------------------------------
        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle width
         */
        function width() {
            var x1 = 0;
            if (_p1.x < _p2.x && _p1.x < _p3.x) x1 = _p1.x;
            else if (_p2.x < _p1.x && _p2.x < _p3.x ) x1 = _p2.x;
            else if (_p3.x < _p1.x && _p3.x < _p2.x) x1 = _p3.x;

            var x2 = 0;
            if (_p1.x > _p2.x && _p1.x > _p3.x) x2 = _p1.x;
            else if (_p2.x > _p1.x && _p2.x > _p3.x ) x2 = _p2.x;
            else if (_p3.x > _p1.x && _p3.x > _p2.x) x2 = _p3.x;

            var f = Math.abs(x2 - x1);
            return f;
        };

        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle height
         */
        function height() {
            var y1 = 0;
            if (_p1.y < _p2.y && _p1.y < _p3.y) y1 = _p1.y;
            else if (_p2.y < _p1.y && _p2.y < _p3.y ) y1 = _p2.y;
            else if (_p3.y < _p1.y && _p3.y < _p2.y) y1 = _p3.y;

            var y2 = 0;
            if (_p1.y > _p2.y && _p1.y > _p3.y) y2 = _p1.y;
            else if (_p2.y > _p1.y && _p2.y > _p3.y ) y2 = _p2.y;
            else if (_p3.y > _p1.y && _p3.y > _p2.y) y2 = _p3.y;

            var g = Math.abs(y2 - y1);
            return g;
        };

        // -----------------------------------------------------------------------------
        function area() {
            var area = 0;
            area += (_p1.x + _p3.x) * (_p3.y - _p1.y);
            area += (_p2.x + _p1.x) * (_p1.y - _p2.y);
            area += (_p3.x + _p2.x) * (_p2.y - _p3.y);
            return area/2;
        };



        //
        // Gets
        //
        /**
         * @return {Array} the points of the triangle as a Point array
         */
        function get() {
            var points = [_p1, _p2, _p3];
            return points;
        };



        // -----------------------------------------------------------------------------
        return {
            p1: _p1,
            p2: _p2,
            p3: _p3,

            sharesVertex: sharesVertex,
            getCentroid: centroid,

            getArea: area,
            getWidth: width,
            getHeight: height,

            getPoints: get
        };

    };

    /**
     * Edge
     * TODO: replace with paper.Segment
     *
     * @param {Point} p1
     *          first Point of Edge
     * @param {Point} p2
     *          second Point of Edge
     */
    var Edge = function( p1, p2) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var _p1 = p1;
        var _p2 = p2;
        var _dist = _p1.getDistance(_p2);



        // -----------------------------------------------------------------------------
        //
        // Methods
        //
        // -----------------------------------------------------------------------------
        /**
         * sorts edge by shortest to longest
         *
         * @param {Edge} other
         *          Edge to compare against
         *
         * @return {Number}
         */
        function compareTo(other) {
            return _dist < other.dist ? -1 : _dist > other.dist ? 1 : 0;
        };



        //
        // Gets
        //

        /**
         *
         * @return {Array} the points of the edge as a Point array
         *
         */
        function get() {
            var points = [_p1, _p2];
            return points;
        };



        // -----------------------------------------------------------------------------
        return {
            p1: _p1,
            p2: _p2,
            dist: _dist,

            getPoints: get
        };

    };



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    /**
     * Triangulation subroutine
     *
     * Returned is a list of triangular faces in the Array triangles
     * These triangles are arranged in a consistent clockwise order.
     *
     * @return {Array} triangles
     *      return Array of Triangles in clockwise order
     *
     */
    function init() {
        _triangles = [];

        if (_points.length != null) {
            // remove duplicate points
            _points = uniquePoints( _points );

            // sort vertex array in increasing x values
            _points.sort( sortLeftToRight );
            // _points.sort( sortTopToBottom );


            // Find the maximum and minimum vertex bounds.
            // This is to allow calculation of the bounding triangle
            var xmin = (_points[0]).x;
            var ymin = (_points[0]).y;
            var xmax = xmin;
            var ymax = ymin;

            // z is used for storing misc. info i.e. normalized brightness data
            var z = (_points[0]).z;

            for (var i = 0; i < _points.length; i++) {
                var p = _points[i];
                if (p.x < xmin) xmin = p.x;
                if (p.x > xmax) xmax = p.x;
                if (p.y < ymin) ymin = p.y;
                if (p.y > ymax) ymax = p.y;
            }

            var dx = xmax - xmin;
            var dy = ymax - ymin;
            var dmax = (dx > dy) ? dx : dy;
            var xmid = (xmax + xmin) / 2.0;
            var ymid = (ymax + ymin) / 2.0;

            _triangles = [];
            var complete = new HashSet(); // for complete Triangles


            // Set up the super triangle
            // This is a triangle which encompasses all the sample points.
            // The super triangle coordinates are added to the end of the
            // vertex list. The super triangle is the first triangle in
            // the triangle list.
            var superTriangle = new Triangle(
                new Point( xmid - 2.0 * dmax, ymid - dmax ),
                new Point( xmid, ymid + 2.0 * dmax ),
                new Point( xmid + 2.0 * dmax, ymid - dmax )
            );
            _triangles.push( superTriangle );


            // Include each point one at a time into the existing mesh
            var edges = [];
            for (var i = 0; i < _points.length; i++) {
                var p = _points[i];
                edges = [];


                // Set up the edge buffer.
                // If the point (xp,yp) lies inside the circumcircle then the
                // three edges of that triangle are added to the edge buffer
                // and that triangle is removed.
                var circle = new Point();

                for (var j=_triangles.length-1; j>=0; j--) {
                    var t = _triangles[j];
                    if (complete.contains(t)) {
                        continue;
                    }

                    var inside = circumCircle( p, t, circle );

                    if (circle.x + circle.z < p.x) {
                        complete.add(t);
                    }
                    if (inside) {
                        edges.push( new Edge(t.p1, t.p2) );
                        edges.push( new Edge(t.p2, t.p3) );
                        edges.push( new Edge(t.p3, t.p1) );
                        _triangles.splice(j, 1);
                    }
                }

                // remove duplicate edges
                edges = uniqueEdges( edges );

                // Tag multiple edges
                // Note: if all triangles are specified anticlockwise then all
                // interior edges are opposite pointing in direction.
                for (var j = 0; j < edges.length-1; j++) {
                    var e1 = edges[j];
                    for (var k=j+1; k<edges.length; k++) {
                        var e2 = edges[k];
                        if (e1.p1 == e2.p2 && e1.p2 == e2.p1) {
                            e1.p1 = null;
                            e1.p2 = null;
                            e2.p1 = null;
                            e2.p2 = null;
                        }
                        // Shouldn't need the following, see note above
                        if (e1.p1 == e2.p1 && e1.p2 == e2.p2) {
                            e1.p1 = null;
                            e1.p2 = null;
                            e2.p1 = null;
                            e2.p2 = null;
                        }
                    }
                }

                // Form new triangles for the current point
                // Skipping over any tagged edges.
                // All edges are arranged in clockwise order.
                for (var j = 0; j < edges.length; j++) {
                    var e = edges[j];
                    if (e.p1 == null || e.p2 == null) {
                        continue;
                    }
                    // determine if point in triangle is new
                    // if it is mark it as so
                    for (var k = 0; k < _pointsNew.length; k++) {
                        if (e.p1 == _pointsNew[k] ) e.p1.name = '__new';
                        else e.p1.name = null;

                        if (e.p2 == _pointsNew[k] ) e.p2.name = '__new';
                        else e.p2.name = null;

                        if (p == _pointsNew[k] ) p.name = '__new';
                        else p.name = null;
                    }
                    _triangles.push( new Triangle(e.p1, e.p2, p) );
                }

            }

            // Remove triangles with super triangle vertices
            for (var i=_triangles.length-1; i>=0; i--) {
                var t = _triangles[i];
                if (t.sharesVertex(superTriangle)) {
                    _triangles.splice(i, 1);
                }
            }

        }

        // return _triangles;
    };
    init();

    // -----------------------------------------------------------------------------
    /**
     * Return TRUE if a point (xp,yp) is inside the circumcircle made up
     * of the points (x1,y1), (x2,y2), (x3,y3)
     * The circumcircle center is returned in (xc,yc) and the radius r
     * NOTE: A point on the edge is inside the circumcircle
     *
     * @param {Point} p
     *          Point to check
     * @param {Triangle} t
     *          Triangle to check
     * @param {Item} circle
     *          circle to check
     *
     */
    function circumCircle( p, t, circle) {
        var m1, m2;
        var mx1, mx2;
        var my1, my2;
        var dx, dy;

        var rsqr;
        var drsqr;

        // Check for coincident points
        if (Math.abs(t.p1.y-t.p2.y) < EPSILON && Math.abs(t.p2.y-t.p3.y) < EPSILON) {
            //System.err.println("CircumCircle: Points are coincident.");
            return false;
        }

        if (Math.abs(t.p2.y-t.p1.y) < EPSILON) {
            m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (t.p2.x + t.p1.x) / 2.0;
            circle.y = m2 * (circle.x - mx2) + my2;
        }
        else if (Math.abs(t.p3.y-t.p2.y) < EPSILON) {
            m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            circle.x = (t.p3.x + t.p2.x) / 2.0;
            circle.y = m1 * (circle.x - mx1) + my1;
        }
        else {
            m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
            m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            circle.y = m1 * (circle.x - mx1) + my1;
        }

        dx = t.p2.x - circle.x;
        dy = t.p2.y - circle.y;
        rsqr = dx*dx + dy*dy;
        circle.z = Math.sqrt(rsqr);

        dx = p.x - circle.x;
        dy = p.y - circle.y;
        drsqr = dx*dx + dy*dy;

        return drsqr <= rsqr;
    };

    // -----------------------------------------------------------------------------
    /**
     * findClosest Triangle
     *
     * Returns the closest Triangle based on the input Triangle
     *
     * @param {Triangle} other
     *      the input Triangle to find it's closest neighbor
     *
     * @return {Triangle} closest Triangle
     */
    function findClosest(other) {
        var result;

        for (var i = 0; i < _triangles.length; i++) {
            var iFind = _triangles[i];
            var d1 = other.getCentroid.getDistance( iFind.getCentroid );

            for (var j = 0; j < _triangles.length; j++) {
                // var jFind = _triangles[i];
                var jFind = _triangles[j];
                var d2 = other.getCentroid.getDistance( jFind.getCentroid );

                if (d2 < d1) {
                    result = jFind;
                    break;
                }

            }
        }

        return result;
    };

    // -----------------------------------------------------------------------------
    /**
     *
     * sort Point rray from left to right
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortLeftToRight(a,b) {
        if (a.x < b.x) return 1;
        else if (a.x > b.x) return -1;
        else return 0;
    };

    /**
     *
     * sort Point array from top to bottom
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortTopToBottom(a,b) {
        if (a.y < b.y) return 1;
        else if (a.y > b.y) return -1;
        else return 0;
    };

    /**
     *
     * remove Point duplicates
     *
     * @param {Array} arr
     *      array to remove duplicate points from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniquePoints(arr){
        arr.sort();
        for (var i=1; i<arr.length; ){
            if (arr[i-1].x == arr[i].x && arr[i-1].y == arr[i].y ) arr.splice(i, 1);
            else i++;
        }
        return arr;
    };

    /**
     *
     * remove Edge duplicates
     *
     * @param {Array} arr
     *      array to remove duplicate edges from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniqueEdges(arr) {
        arr.sort();
        for (var i=1; i<arr.length; ){
            if (arr[i-1].p1 == arr[i].p1 && arr[i-1].p2 == arr[i].p2 ||
                arr[i-1].p1 == arr[i].p2 && arr[i-1].p2 == arr[i].p2 ) arr.splice(i, 1);
            else i++;
        }
        return arr;

        // TODO: This is O(n^2), make it O(n) with a hash or some such
        // var uniqueEdges = [];
        // for (var i = 0; i < edges.length; i++) {
        //  var edge1 = edges[i];
        //  var unique = true;

        //  for (var j = 0; j < edges.length; j++) {
        //      if (i != j) {
        //          var edge2 = edges[j];
        //          if (( edge1.p1 == edge2.p1 && edge1.p2 == edge2.p2 ) ||
        //              ( edge1.p1 == edge2.p2 && edge1.p2 == edge2.p1 )) {
        //              unique = false;
        //              break;
        //          }
        //      }
        //  }

        //  if (unique) {
        //      uniqueEdges.push( edge1 );
        //  }
        // }

        // return uniqueEdges;
    };


    // -----------------------------------------------------------------------------

    //
    // Sets
    //

    /**
     * add point(s) to Triangulation
     *
     * @param {Point} point
     *      a single Point or array of Points
     *
     */
    function addPoint(point) {
        _pointsNew = [];

        if (point instanceof Array) {
            _pointsNew = point;
            // add points to points array
            _points = _points.concat( point );
        }
        else {
            _pointsNew[0] = point;
            // add point to points array
            _points.push( point );
        }

        // check for duplicate points
        _points = uniquePoints( _points );

        // console.log( _pointsNew );
        // create (new) triangulation
        init();
    };

    //
    // Gets
    //
    /**
     * @param {Number} index
     *      index of Triangle to return (optional)
     *
     * @return {Array} the Triangles as array
     */
    function getTriangles(index) {
        if (index != null) {
            return _triangles[index];
        }
        else {
            return _triangles;
        }
    };

    /**
     * @param {Number} index
     *      index of Point to return (optional)
     *
     * @return {Array} the points as a Point array
     */
    function getPoints(index) {
        if (index != null) {
            return _points[index];
        }
        else {
            return _points;
        }
    };



    // -----------------------------------------------------------------------------
    return {
        // sets
        add: addPoint,

        // gets
        getTriangles: getTriangles,
        getPoints: getPoints,
        getClosest: findClosest
    };


};



/*Ô
 *
 * HashSet
 * Phùng Văn Huy
 * huyphungvan@gmail.com
 *
 * http://code.huypv.net/2010/04/hashset-implementation-in-javascript.html
 *
 *
 * Modifications
 *
 * Ken Frederick
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */
var HashSet = function() {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var arr = [];



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    function add(e) {
        var arr = arr;
        var i = arr.indexOf(e);
        if (i == -1) {
            arr.push(e);
        }
    }

    function get(i) {
        return arr[i];
    }

    function size(i) {
        return arr.length;
    }

    function remove(e) {
        var arr =arr;
        var i = arr.indexOf(e);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }

    function contains(o) {
        var b = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === o) {
                b = true;
                // break;
            }
        }
        return b;
    };


    //
    // Gets
    //
    function toString() {
        return arr.join(',');
    };



    // -----------------------------------------------------------------------------
    return {
        add      : add,
        get      : get,
        size     : size,
        remove   : remove,
        contains : contains,
        toString : toString
    };

};
