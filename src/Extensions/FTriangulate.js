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
 * var triangulate = new FTriangulate(points);
 *
 * // draw faces
 * var triangle;
 * for (var i = 0; i < triangulate.length; i++) {
 *    triangle = triangulate[i];
 *
 *    // draw triangle
 *    face = new Path();
 *    face.add(triangle.p1);
 *    face.add(triangle.p2);
 *    face.add(triangle.p3);
 *    face.closed = true;
 *    face.strokeColor = 'white';
 * }
 *
 *
 * @example
 * var triangulate = new FTriangulate(points);
 *
 * // draw faces
 * var triangle;
 * for (var i = 0; i < triangulate.length; i++) {
 *    triangle = triangulate[i];
 *
 *    // draw triangle
 *    face = new Path.FTriangle(
 *        triangle.p1,
 *        triangle.p2,
 *        triangle.p3
 *    );
 *    face.closed = true;
 *    face.strokeColor = 'white';
 * }
 *
 */
folio.FTriangulate = function(points) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    if (points === undefined) {
        return;
    }
    var triangles;
    var pointsNew = [];



    // -----------------------------------------------------------------------------
    //
    // Classes
    //
    // -----------------------------------------------------------------------------
    /**
     * Triangle
     *
     * @param {Point} arg0
     *          first Point of Triangle
     * @param {Point} arg1
     *          second Point of Triangle
     * @param {Point} arg2
     *          third Point of Triangle
     */
    /**
     *
     * @param {Path} arg0
     *          3-sided Path (or FTriangle)
     */
    var Triangle = function(arg0, arg1, arg2) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var p1, p2, p3;
        if (arguments.length === 3) {
            p1 = arg0;
            p2 = arg1;
            p3 = arg2;
        }
        else if (arguments.length === 1 && arg0.segments.length === 3) {
            p1 = arg0.segments[0].point;
            p2 = arg0.segments[1].point;
            p3 = arg0.segments[2].point;
        }
        else {
            return;
        }



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
        }

        /**
         * @return {Point} circle
         *      Point of the circle center
         */
        function circumcenter() {
            var circle = new Point();
            var m1, m2;
            var mx1, mx2;
            var my1, my2;

            if (Math.abs(p2.y - p1.y) < EPSILON) {
                m2 = - (p3.x - p2.x) / (p3.y - p2.y);
                mx2 = (p2.x + p3.x) / 2.0;
                my2 = (p2.y + p3.y) / 2.0;
                circle.x = (p2.x + p1.x) / 2.0;
                circle.y = m2 * (circle.x - mx2) + my2;
            }
            else if (Math.abs(p3.y - p2.y) < EPSILON) {
                m1 = - (p2.x - p1.x) / (p2.y - p1.y);
                mx1 = (p1.x + p2.x) / 2.0;
                my1 = (p1.y + p2.y) / 2.0;
                circle.x = (p3.x + p2.x) / 2.0;
                circle.y = m1 * (circle.x - mx1) + my1;
            }
            else {
                m1 = - (p2.x - p1.x) / (p2.y - p1.y);
                m2 = - (p3.x - p2.x) / (p3.y - p2.y);
                mx1 = (p1.x + p2.x) / 2.0;
                mx2 = (p2.x + p3.x) / 2.0;
                my1 = (p1.y + p2.y) / 2.0;
                my2 = (p2.y + p3.y) / 2.0;
                circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
                circle.y = m1 * (circle.x - mx1) + my1;
            }

            return circle;
        }

        // -----------------------------------------------------------------------------
        /**
         * @return {Point} the centroid center
         *
         * http://www.mathwords.com/c/centroid_formula.htm
         */
        function centroid() {
            return new Point(
                (p1.x + p2.x + p3.x) / 3,
                (p1.y + p2.y + p3.y) / 3
            );
        }

        // -----------------------------------------------------------------------------
        /**
         * @return {Array} a sorted array (Edge) of the Triangle's Edges (shortest to longest)
         */
        function distances() {
            var distances = [];
            distances[0] = new Edge(p1, p2);
            distances[1] = new Edge(p1, p3);
            distances[2] = new Edge(p3, p2);

            distances.sort();
            return distances;
        }

        // -----------------------------------------------------------------------------
        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle width
         */
        function width() {
            var x1 = 0;
            if (p1.x < p2.x && p1.x < p3.x) {
                x1 = p1.x;
            }
            else if (p2.x < p1.x && p2.x < p3.x) {
                x1 = p2.x;
            }
            else if (p3.x < p1.x && p3.x < p2.x) {
                x1 = p3.x;
            }

            var x2 = 0;
            if (p1.x > p2.x && p1.x > p3.x) {
                x2 = p1.x;
            }
            else if (p2.x > p1.x && p2.x > p3.x) {
                x2 = p2.x;
            }
            else if (p3.x > p1.x && p3.x > p2.x) {
                x2 = p3.x;
            }

            var f = Math.abs(x2 - x1);

            return f;
        }

        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle height
         */
        function height() {
            var y1 = 0;
            if (p1.y < p2.y && p1.y < p3.y) {
                y1 = p1.y;
            }
            else if (p2.y < p1.y && p2.y < p3.y) {
                y1 = p2.y;
            }
            else if (p3.y < p1.y && p3.y < p2.y) {
                y1 = p3.y;
            }

            var y2 = 0;
            if (p1.y > p2.y && p1.y > p3.y) {
                y2 = p1.y;
            }
            else if (p2.y > p1.y && p2.y > p3.y) {
                y2 = p2.y;
            }
            else if (p3.y > p1.y && p3.y > p2.y) {
                y2 = p3.y;
            }

            var g = Math.abs(y2 - y1);

            return g;
        }

        // -----------------------------------------------------------------------------
        // TODO: add this to FCalculate.js
        function area() {
            var area = 0;
            area += (p1.x + p3.x) * (p3.y - p1.y);
            area += (p2.x + p1.x) * (p1.y - p2.y);
            area += (p3.x + p2.x) * (p2.y - p3.y);
            return area / 2;
        }



        //
        // Gets
        //
        /**
         * @return {Array} the points of the triangle as a Point array
         */
        function get() {
            return [p1, p2, p3];
        }


        // -----------------------------------------------------------------------------
        return {
            p1           : p1,
            p2           : p2,
            p3           : p3,

            sharesVertex : sharesVertex,
            getCentroid  : centroid,

            getArea      : area,
            getWidth     : width,
            getHeight    : height,

            getPoints    : get
        };

    };

    /**
     * Edge
     *
     * @param {Point} p1
     *          first Point of Edge
     * @param {Point} p2
     *          second Point of Edge
     */
     /**
      *
      * @param {Path} p1
      *          first Point of Edge
      * @param {Point} p2
      *          second Point of Edge
      */
    var Edge = function(arg0, arg1) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var p1, p2;
        if (arguments.length === 2) {
            p1 = arg0;
            p2 = arg1;
        }
        else if (arguments.length === 1 && arg0.segments.length === 2) {
            p1 = arg0.segments[0].point;
            p2 = arg0.segments[1].point;
        }
        else {
            return;
        }
        var dist = p1.getDistance(p2);



        // -----------------------------------------------------------------------------
        //
        // Methods
        //
        // -----------------------------------------------------------------------------
        /*
         * sorts edge by shortest to longest
         */
        function compareTo(other) {
            return dist < other.dist
                ? -1
                : dist > other.dist
                    ? 1
                    : 0;
        }

        /**
         *
         * @return {Array} the points of the edge as a Point array
         *
         */
        function get() {
            return [p1, p2];
        }


        // -----------------------------------------------------------------------------
        return {
            p1        : p1,
            p2        : p2,
            dist      : dist,

            getPoints : get
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
        triangles = [];

        if (points.length != null) {
            // remove duplicate points
            points = uniquePoints(points);

            // sort vertex array in increasing x values
            points.sort(sortLeftToRight);
            // points.sort(sortTopToBottom);


            // Find the maximum and minimum vertex bounds.
            // This is to allow calculation of the bounding triangle
            var xmin = (points[0]).x;
            var ymin = (points[0]).y;
            var xmax = xmin;
            var ymax = ymin;

            // z is used for storing misc. info i.e. normalized brightness data
            var z = (points[0]).z;

            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                if (p.x < xmin) {
                    xmin = p.x;
                }
                if (p.x > xmax) {
                    xmax = p.x;
                }
                if (p.y < ymin) {
                    ymin = p.y;
                }
                if (p.y > ymax) {
                    ymax = p.y;
                }
            }

            var dx = xmax - xmin;
            var dy = ymax - ymin;
            var dmax = (dx > dy) ? dx : dy;
            var xmid = (xmax + xmin) / 2.0;
            var ymid = (ymax + ymin) / 2.0;

            triangles = [];
            var complete = new HashSet(); // for complete Triangles


            // Set up the super triangle
            // This is a triangle which encompasses all the sample points.
            // The super triangle coordinates are added to the end of the
            // vertex list. The super triangle is the first triangle in
            // the triangle list.
            var superTriangle = new Triangle(
                new Point(xmid - 2.0 * dmax, ymid - dmax),
                new Point(xmid, ymid + 2.0 * dmax),
                new Point(xmid + 2.0 * dmax, ymid - dmax)
            );
            triangles.push(superTriangle);


            // Include each point one at a time into the existing mesh
            var edges = [];
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                edges = [];


                // Set up the edge buffer.
                // If the point (xp,yp) lies inside the circumcircle then the
                // three edges of that triangle are added to the edge buffer
                // and that triangle is removed.
                var circle = new Point();

                for (var j = triangles.length - 1; j >= 0; j--) {
                    var t = triangles[j];
                    if (complete.contains(t)) {
                        continue;
                    }

                    var inside = circumCircle(p, t, circle);

                    if (circle.x + circle.z < p.x) {
                        complete.add(t);
                    }
                    if (inside) {
                        edges.push(new Edge(t.p1, t.p2));
                        edges.push(new Edge(t.p2, t.p3));
                        edges.push(new Edge(t.p3, t.p1));
                        triangles.splice(j, 1);
                    }
                }

                // remove duplicate edges
                edges = uniqueEdges(edges);

                // Tag multiple edges
                // Note: if all triangles are specified anticlockwise then all
                // interior edges are opposite pointing in direction.
                for (var j = 0; j < edges.length - 1; j++) {
                    var e1 = edges[j];
                    for (var k = j + 1; k < edges.length; k++) {
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
                    for (var k = 0; k < pointsNew.length; k++) {
                        if (e.p1 == pointsNew[k]) {
                            e.p1.name = '__new';
                        }
                        else {
                            e.p1.name = null;
                        }

                        if (e.p2 == pointsNew[k]) {
                            e.p2.name = '__new';
                        }
                        else {
                            e.p2.name = null;
                        }

                        if (p == pointsNew[k]) {
                            p.name = '__new';
                        }
                        else {
                            p.name = null;
                        }
                    }
                    triangles.push(new Triangle(e.p1, e.p2, p));
                }

            }

            // Remove triangles with super triangle vertices
            for (var i = triangles.length - 1; i >= 0; i--) {
                var t = triangles[i];
                if (t.sharesVertex(superTriangle)) {
                    triangles.splice(i, 1);
                }
            }

        }

        // return triangles;
    }
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
    function circumCircle(p, t, circle) {
        var m1, m2;
        var mx1, mx2;
        var my1, my2;
        var dx, dy;

        var rsqr;
        var drsqr;

        // Check for coincident points
        if (Math.abs(t.p1.y - t.p2.y) < EPSILON && Math.abs(t.p2.y - t.p3.y) < EPSILON) {
            //System.err.println("CircumCircle: Points are coincident.");
            return false;
        }

        if (Math.abs(t.p2.y - t.p1.y) < EPSILON) {
            m2 = - (t.p3.x - t.p2.x) / (t.p3.y - t.p2.y);
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (t.p2.x + t.p1.x) / 2.0;
            circle.y = m2 * (circle.x - mx2) + my2;
        }
        else if (Math.abs(t.p3.y - t.p2.y) < EPSILON) {
            m1 = - (t.p2.x - t.p1.x) / (t.p2.y - t.p1.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            circle.x = (t.p3.x + t.p2.x) / 2.0;
            circle.y = m1 * (circle.x - mx1) + my1;
        }
        else {
            m1 = - (t.p2.x - t.p1.x) / (t.p2.y - t.p1.y);
            m2 = - (t.p3.x - t.p2.x) / (t.p3.y - t.p2.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            circle.y = m1 * (circle.x - mx1) + my1;
        }

        dx = t.p2.x - circle.x;
        dy = t.p2.y - circle.y;
        rsqr = dx * dx + dy * dy;
        circle.z = Math.sqrt(rsqr);

        dx = p.x - circle.x;
        dy = p.y - circle.y;
        drsqr = dx * dx + dy * dy;

        return drsqr <= rsqr;
    }

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

        for (var i = 0; i < triangles.length; i++) {
            var iFind = triangles[i];
            var d1 = other.getCentroid.getDistance(iFind.getCentroid);

            for (var j = 0; j < triangles.length; j++) {
                // var jFind = triangles[i];
                var jFind = triangles[j];
                var d2 = other.getCentroid.getDistance(jFind.getCentroid);

                if (d2 < d1) {
                    result = jFind;
                    break;
                }

            }
        }

        return result;
    }

    // -----------------------------------------------------------------------------
    /**
     *
     * sort Point rray from left to right
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortLeftToRight(a, b) {
        if (a.x < b.x) {
            return 1;
        }
        else if (a.x > b.x) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     *
     * sort Point array from top to bottom
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortTopToBottom(a, b) {
        if (a.y < b.y) {
            return 1;
        }
        else if (a.y > b.y) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * remove Point duplicates
     * TODO: add FCalculate.js (if it doesn't exist already)
     *
     * @param {Array} arr
     *      array to remove duplicate points from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniquePoints(arr){
        arr.sort();
        for (var i = 1; i < arr.length;){
            if (arr[i - 1].x == arr[i].x && arr[i - 1].y == arr[i].y) {
                arr.splice(i, 1);
            }
            else {
                i++;
            }
        }
        return arr;
    }

    /**
     * remove Edge duplicates
     * TODO: add FCalculate.js (if it doesn't exist already)
     *
     * @param {Array} arr
     *      array to remove duplicate edges from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniqueEdges(arr) {
        arr.sort();
        for (var i = 1; i<arr.length;){
            if (arr[i - 1].p1 == arr[i].p1 && arr[i - 1].p2 == arr[i].p2 ||
                arr[i - 1].p1 == arr[i].p2 && arr[i - 1].p2 == arr[i].p2 ) {
                    arr.splice(i, 1);
            }
            else {
                i++;
            }
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
        //          if ((edge1.p1 == edge2.p1 && edge1.p2 == edge2.p2) ||
        //              (edge1.p1 == edge2.p2 && edge1.p2 == edge2.p1)) {
        //              unique = false;
        //              break;
        //          }
        //      }
        //  }

        //  if (unique) {
        //      uniqueEdges.push(edge1);
        //  }
        // }

        // return uniqueEdges;
    }


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
        pointsNew = [];

        if (point instanceof Array) {
            pointsNew = point;
            points = points.concat(point);
        }
        else {
            pointsNew[0] = point;
            points.push(point);
        }

        points = uniquePoints(points);

        init();
    }

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
            return triangles[index];
        }
        else {
            return triangles;
        }
    }

    /**
     * @param {Number} index
     *      index of Point to return (optional)
     *
     * @return {Array} the points as a Point array
     */
    function getPoints(index) {
        if (index != null) {
            return points[index];
        }
        else {
            return points;
        }
    }



    // -----------------------------------------------------------------------------
    return {
        add          : addPoint,

        getTriangles : getTriangles,
        getPoints    : getPoints,
        getClosest   : findClosest
    };


};



/**
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
    }


    //
    // Gets
    //
    function toString() {
        return arr.join(',');
    }



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
