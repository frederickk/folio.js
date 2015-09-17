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
var Matrix3D = function( n11, n12, n13, n14,
                         n21, n22, n23, n24,
                         n31, n32, n33, n34,
                         n41, n42, n43, n44) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    this.n11 = n11 || 1.0;  this.n12 = n12 || 0.0;  this.n13 = n13 || 0.0;  this.n14 = n14 || 0.0;
    this.n21 = n21 || 0.0;  this.n22 = n22 || 1.0;  this.n23 = n23 || 0.0;  this.n24 = n24 || 0.0;
    this.n31 = n31 || 0.0;  this.n32 = n32 || 0.0;  this.n33 = n33 || 1.0;  this.n34 = n34 || 0.0;
    this.n41 = n41 || 0.0;  this.n42 = n42 || 0.0;  this.n43 = n43 || 0.0;  this.n44 = n44 || 1.0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    this.clone = function() {
        return new Matrix3D( this.n11, this.n12, this.n13, this.n14,
                             this.n21, this.n22, this.n23, this.n24,
                             this.n31, this.n32, this.n33, this.n34,
                             this.n41, this.n42, this.n43, this.n44 );
    };

    // ------------------------------------------------------------------------
    this.concat = function(m) {

        this.init({
            n11: this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41,
            n12: this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42,
            n13: this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43,
            n14: this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44,

            n21: this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41,
            n22: this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42,
            n23: this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43,
            n24: this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44,

            n31: this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41,
            n32: this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42,
            n33: this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43,
            n34: this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44,

            n41: this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41,
            n42: this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42,
            n43: this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43,
            n44: this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44
        });

        // this.init(values);
    };

    // ------------------------------------------------------------------------
    this.init = function(values) {
        for (var i in values) {
            this[i] = values[i];
        }
    };

    // ------------------------------------------------------------------------
    this.createBox = function(  scalex, scaley, scalez,
                                rotationx, rotationy, rotationz,
                                tx, ty, tz) {
        this.identity();
        if (rotationx != 0) {
            this.rotateX( rotationx );
        }
        if (rotationy != 0) {
            this.rotateY( rotationy );
        }
        if (rotationz != 0) {
            this.rotateZ( rotationz );
        }
        if (scalex != 1 || scaley != 1 || scalez != 1) {
            this.scale( scalex, scaley, scalez );
        }
        if (tx != 0 || ty != 0 || tz != 0) {
            this.translate( tx, ty, tz );
        }
    };


    // ------------------------------------------------------------------------
    this.identity = function() {
        this.init({ n11:1, n12:0, n13:0, n14:0,
                          n21:0, n22:1, n23:0, n24:0,
                          n31:0, n32:0, n33:1, n34:0,
                          n41:0, n42:0, n43:0, n44:1 });
    };


    // ------------------------------------------------------------------------
    /*
     *
     * Rotation
     *
     */
    this.rotateX = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1)
        );
    };

    this.rotateY = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1)
        );
    };

    this.rotateZ = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            cos,  -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1)
        );
    };

    /**
     *
     * @param {FPoint3} axis
     *          FPoint3 xyz
     * @param {Number} angle
     *          rotation angle in degrees
     *
     */
    this.setRotateAxis = function(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp

        var cos = Math.cos( angle );
        var sin = Math.sin( angle );

        var t = 1 - cos;

        var x = axis.x();
        var y = axis.y();
        var z = axis.z();

        var tx = t * x;
        var ty = t * y;

        this.concat(
            tx * x + cos,       tx * y - sin * z,   tx * z + sin * y,   0,
            tx * y + sin * z,   ty * y + cos,       ty * z - sin * x,   0,
            tx * z - sin * y,   ty * z + sin * x,   t * z * z + cos,    0,
            0, 0, 0, 1
        );
    };


    // ------------------------------------------------------------------------
    /*
     * Scaling
     */
    this.scale = function(sx, sy, sz) {
        this.concat(new Matrix3D(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0,  1)
        );
    };


    // ------------------------------------------------------------------------
    /*
     * Translating
     */
    this.translate = function(dx, dy, dz) {
        this.n41 += dx;
        this.n42 += dy;
        this.n43 += dz;
    };


    // ------------------------------------------------------------------------
    /*
     * Transforming
     */
    this.transformPoint = function(point) {
        return new Vertex3D(
            this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41,
            this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42,
            this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
        );
    };

    this.transformArray = function(arr) {
        var rVal=[];
        var numPoints=arr.length/3;

        for (var i = 0; i < numPoints; i++) {
            var i3 = i*3;
            var x = arr[i3];
            var y = arr[i3+1];
            var z = arr[i3+2];

            rVal[i3]   = this.n11 * x + this.n21 * y + this.n31 * z + this.n41;
            rVal[i3+1] = this.n12 * x + this.n22 * y + this.n32 * z + this.n42;
            rVal[i3+2] = this.n13 * x + this.n23 * y + this.n33 * z + this.n43;
        }
        return rVal;
    };


    // ------------------------------------------------------------------------
    /*
     * Position
     */
    this.getPosition = function() {
        return [ this.n12, this.n13, this.n14 ];
    };

    /**
     *
     * @param {FPoint3} fpoint3
     *          FPoint3 xyz
     *
     */
    this.setPosition = function(fpoint3) {
        this.n12 = fpoint3.x;
        this.n13 = fpoint3.y;
        this.n14 = fpoint3.z;
        return this;
    };

    /*
     *
     * Frustrum
     * https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
     *
     */
    this.makeFrustum = function(left, right, bottom, top, near, far) {
        var x = 2 * near / ( right - left );
        var y = 2 * near / ( top - bottom );

        var a = ( right + left ) / ( right - left );
        var b = ( top + bottom ) / ( top - bottom );
        var c = - ( far + near ) / ( far - near );
        var d = - 2 * far * near / ( far - near );

        this.concat({
            n11: x,   n12: 0,   n13: a,   n14: 0,
            n21: 0,   n22: y,   n23: b,   n24: 0,
            n31: 0,   n32: 0,   n33: c,   n34: d,
            n41: 0,   n42: 0,   n43: -1,  n44: 0
        });

        // this.init(values);
    };

    /*
     *
     * Presets modified from Three.js
     * https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
     *
     */
    // ------------------------------------------------------------------------
    this.makePerspective = function(fov, aspect, near, far) {
        var ymax = near * Math.tan( fov * Math.PI / 360 );
        var ymin = - ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
    };

    // ------------------------------------------------------------------------
    this.makeOrtho = function(left, right, top, bottom, near, far) {
        var w = right - left;
        var h = top - bottom;
        var p = far - near;

        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;

        this.concat({
            n11: 2/w,   n12: 0,     n13: 0,     n14: -x,
            n21: 0,     n22: 2/h,   n23: 0,     n24: -y,
            n31: 0,     n32: 0,     n33: -2/p,  n34: -z,
            n41: 0,     n42: 0,     n43: 0,     n44: 1
        });

        // this.init(values);
    };


    // ------------------------------------------------------------------------
    this.toString = function() {
        return  this.n11 + ',' + this.n12 + ',' + this.n13 + ',' + this.n14 + ',' +
                this.n21 + ',' + this.n22 + ',' + this.n23 + ',' + this.n24 + ',' +
                this.n31 + ',' + this.n32 + ',' + this.n33 + ',' + this.n34 + ',' +
                this.n41 + ',' + this.n42 + ',' + this.n43 + ',' + this.n44;
    };

};








