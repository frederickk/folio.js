/**
 *
 * Matrix3D
 *
 * forked from daijimachine's "Matrix3D(lib)"
 * http://jsdo.it/daijimachine/matrix3d
 *
 * @author Masayuki Daijima (ARCHETYP Inc.)
 * http://www.daijima.jp/blog/
 * http://twitter.com/daijimachine
 *
 *
 * expanded and modified with inspiration from three.js
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 */



/*
 *
 * Matrix3D
 *
 */
var Matrix3D = function(n11, n12, n13, n14,
                        n21, n22, n23, n24,
                        n31, n32, n33, n34,
                        n41, n42, n43, n44) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var n11 = n11 || 1.0;  var n12 = n12 || 0.0;  var n13 = n13 || 0.0;  var n14 = n14 || 0.0;
    var n21 = n21 || 0.0;  var n22 = n22 || 1.0;  var n23 = n23 || 0.0;  var n24 = n24 || 0.0;
    var n31 = n31 || 0.0;  var n32 = n32 || 0.0;  var n33 = n33 || 1.0;  var n34 = n34 || 0.0;
    var n41 = n41 || 0.0;  var n42 = n42 || 0.0;  var n43 = n43 || 0.0;  var n44 = n44 || 1.0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    function init(values) {
        for (var i in values) {
            this[i] = values[i];
        }
    }

    // ------------------------------------------------------------------------
    function clone() {
        return new Matrix3D(n11, n12, n13, n14,
                            n21, n22, n23, n24,
                            n31, n32, n33, n34,
                            n41, n42, n43, n44);
    }

    // ------------------------------------------------------------------------
    function concat(m) {
        var values = {};

        values.n11 = n11 * m.n11 + n12 * m.n21 + n13 * m.n31 + n14 * m.n41;
        values.n12 = n11 * m.n12 + n12 * m.n22 + n13 * m.n32 + n14 * m.n42;
        values.n13 = n11 * m.n13 + n12 * m.n23 + n13 * m.n33 + n14 * m.n43;
        values.n14 = n11 * m.n14 + n12 * m.n24 + n13 * m.n34 + n14 * m.n44;

        values.n21 = n21 * m.n11 + n22 * m.n21 + n23 * m.n31 + n24 * m.n41;
        values.n22 = n21 * m.n12 + n22 * m.n22 + n23 * m.n32 + n24 * m.n42;
        values.n23 = n21 * m.n13 + n22 * m.n23 + n23 * m.n33 + n24 * m.n43;
        values.n24 = n21 * m.n14 + n22 * m.n24 + n23 * m.n34 + n24 * m.n44;

        values.n31 = n31 * m.n11 + n32 * m.n21 + n33 * m.n31 + n34 * m.n41;
        values.n32 = n31 * m.n12 + n32 * m.n22 + n33 * m.n32 + n34 * m.n42;
        values.n33 = n31 * m.n13 + n32 * m.n23 + n33 * m.n33 + n34 * m.n43;
        values.n34 = n31 * m.n14 + n32 * m.n24 + n33 * m.n34 + n34 * m.n44;

        values.n41 = n41 * m.n11 + n42 * m.n21 + n43 * m.n31 + n44 * m.n41;
        values.n42 = n41 * m.n12 + n42 * m.n22 + n43 * m.n32 + n44 * m.n42;
        values.n43 = n41 * m.n13 + n42 * m.n23 + n43 * m.n33 + n44 * m.n43;
        values.n44 = n41 * m.n14 + n42 * m.n24 + n43 * m.n34 + n44 * m.n44;

        init(values);
    }

    // ------------------------------------------------------------------------
    // TODO: paper.js-ify the arguments
    function createBox(scalex, scaley, scalez, rotationx, rotationy, rotationz, tx, ty, tz) {
        identity();

        if (rotationx != 0) {
            rotateX(rotationx);
        }
        if (rotationy != 0) {
            rotateY(rotationy);
        }
        if (rotationz != 0) {
            rotateZ(rotationz);
        }
        if (scalex != 1 || scaley != 1 || scalez != 1) {
            scale(scalex, scaley, scalez);
        }
        if (tx != 0 || ty != 0 || tz != 0) {
            translate(tx, ty, tz);
        }
    }


    // ------------------------------------------------------------------------
    function identity() {
        init({
            n11 : 1, n12 : 0, n13 : 0, n14 : 0,
            n21 : 0, n22 : 1, n23 : 0, n24 : 0,
            n31 : 0, n32 : 0, n33 : 1, n34 : 0,
            n41 : 0, n42 : 0, n43 : 0, n44 : 1
        });
    }


    // ------------------------------------------------------------------------
    //
    // Rotation
    //

    function rotateX(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        concat(new Matrix3D(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1)
        );
    }

    function rotateY(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        concat(new Matrix3D(
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1)
        );
    }

    function rotateZ(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        concat(new Matrix3D(
            cos,  -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1)
        );
    }

    /**
     *
     * @param {FPoint3} axis
     *          FPoint3 xyz
     * @param {Number} angle
     *          rotation angle in degrees
     *
     */
    function setRotateAxis(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp

        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var t = 1 - cos;

        var x = axis.x();
        var y = axis.y();
        var z = axis.z();

        var tx = t * x;
        var ty = t * y;

        concat(
            tx * x + cos,       tx * y - sin * z,   tx * z + sin * y,   0,
            tx * y + sin * z,   ty * y + cos,       ty * z - sin * x,   0,
            tx * z - sin * y,   ty * z + sin * x,   t * z * z + cos,    0,
            0, 0, 0, 1
        );
    }


    // ------------------------------------------------------------------------
    //
    // Scaling
    //

    /**
     * Scale
     *
     * @param  {Number} sx [description]
     * @param  {Number} sy [description]
     * @param  {Number} sz [description]
     *
     * @return {Object}    [description]
     */
    function scale(sx, sy, sz) {
        concat(new Matrix3D(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0,  1)
        );
    }


    // ------------------------------------------------------------------------
    //
    // Translating
    //

    /**
     * Translate
     *
     * @param  {Number} dx [description]
     * @param  {Number} dy [description]
     * @param  {Number} dz [description]
     *
     * @return {Object}    [description]
     */
    function translate(dx, dy, dz) {
        n41 += dx;
        n42 += dy;
        n43 += dz;
    }


    // ------------------------------------------------------------------------
    //
    // Transforming
    //

    /**
     * Transform Point
     *
     * @param  {Point} point [description]
     *
     * @return {Vertex3D}       [description]
     */
    function transformPoint(point) {
        return new Vertex3D(
            n11 * point.x + n21 * point.y + n31 * point.z + n41,
            n12 * point.x + n22 * point.y + n32 * point.z + n42,
            n13 * point.x + n23 * point.y + n33 * point.z + n43
        );
    }

    function transformArray(arr) {
        var rVal = [];
        var numPoints = arr.length / 3;

        for (var i = 0; i < numPoints; i++) {
            var i3 = i*3;
            var x = arr[i3];
            var y = arr[i3 + 1];
            var z = arr[i3 + 2];

            rVal[i3]   = n11 * x + n21 * y + n31 * z + n41;
            rVal[i3+1] = n12 * x + n22 * y + n32 * z + n42;
            rVal[i3+2] = n13 * x + n23 * y + n33 * z + n43;
        }
        return rVal;
    }


    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     *
     * @param {FPoint3} fpoint3
     *          FPoint3 xyz
     *
     */
    function setPosition(fpoint3) {
        n12 = fpoint3.x;
        n13 = fpoint3.y;
        n14 = fpoint3.z;
        return this;
    }



    //
    // Gets
    //
    /**
     * Position
     *
     * @return {Array} [description]
     */
    var getPosition = function() {
        return [n12, n13, n14];
    }

    var toString = function() {
        return  n11 + ',' + n12 + ',' + n13 + ',' + n14 + ',' +
                n21 + ',' + n22 + ',' + n23 + ',' + n24 + ',' +
                n31 + ',' + n32 + ',' + n33 + ',' + n34 + ',' +
                n41 + ',' + n42 + ',' + n43 + ',' + n44;
    }



    // ------------------------------------------------------------------------
    //
    // Presets modified from Three.js
    // https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
    //

    /**
     * Frustrum
     * https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
     *
     * @param  {Number} left   [description]
     * @param  {Number} right  [description]
     * @param  {Number} bottom [description]
     * @param  {Number} top    [description]
     * @param  {Number} near   [description]
     * @param  {Number} far    [description]
     */
    function makeFrustum(left, right, bottom, top, near, far) {
        var values = {};

        var x = 2 * near / (right - left);
        var y = 2 * near / (top - bottom);

        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = - (far + near) / (far - near);
        var d = - 2 * far * near / (far - near);

        values.n11 = x; values.n12 = 0; values.n13 = a;     values.n14 = 0;
        values.n21 = 0; values.n22 = y; values.n23 = b;     values.n24 = 0;
        values.n31 = 0; values.n32 = 0; values.n33 = c;     values.n34 = d;
        values.n41 = 0; values.n42 = 0; values.n43 = - 1;   values.n44 = 0;

        concat(values);
        // init(values);
    };

    function makePerspective(fov, aspect, near, far) {
        var ymax = near * Math.tan(fov * Math.PI / 360);
        var ymin = - ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        makeFrustum(xmin, xmax, ymin, ymax, near, far);
    };

    function makeOrtho(left, right, top, bottom, near, far) {
        var values = {};

        var w = right - left;
        var h = top - bottom;
        var p = far - near;

        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;

        values.n11 = 2/w;   values.n12 = 0;     values.n13 = 0;     values.n14 = -x;
        values.n21 = 0;     values.n22 = 2/h;   values.n23 = 0;     values.n24 = -y;
        values.n31 = 0;     values.n32 = 0;     values.n33 = -2/p;  values.n34 = -z;
        values.n41 = 0;     values.n42 = 0;     values.n43 = 0;     values.n44 = 1;

        concat(values);
        // init(values);
    };


    // ------------------------------------------------------------------------
    return {
        // init:  init,

        clone:           clone,
        concat:          concat,

        createBox:       createBox,
        identity:        identity,

        rotateX:         rotateX,
        rotateY:         rotateY,
        rotateZ:         rotateZ,
        setRotateAxis:   setRotateAxis,
        scale:           scale,
        translate:       translate,
        transformPoint:  transformPoint,
        transformArray:  transformArray,

        makeFrustum:     makeFrustum,
        makePerspective: makePerspective,
        makeOrtho:       makeOrtho,

        setPosition:     setPosition,
        getPosition:     getPosition,

        toString:        toString
    }

};
