/*
 *
 * FPath3Constuctors.js
 *
 * A collection of primitive 3D shapes for folio.F3D.FPath3
 *
 * FBox
 * FSphere
 *
 */



folio.F3D.FPath3.inject({

    // -----------------------------------------------------------------------------
    statics: new function() {
        return {

            /**
             *
             * FBox
             * Create simple box
             *
             * @param {folio.F3D.FScene3D} scene
             *          the scene to attach the Box to
             * @param {folio.F3D.FPoint3} fpoint3
             *          the position of the Box
             * @param {folio.F3D.FSize3} fsize3
             *          the size of the Box
             *
             */
            FBox: function(scene, fpoint3, fsize3) {
                this._position3 = (fpoint3 != undefined)
                    ? fpoint3
                    : new folio.F3D.FPoint3( 0,0,0 );

                this._size = (fsize3 != undefined)
                    ? fsize3
                    : new folio.F3D.FSize3( 10,10,10 );

                var sides = [6];
                var faceFRONT = [
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5), // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceTOP = [
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5) // corner
                ],
                    faceBOTTOM = [
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5), // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceLEFT = [
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceRIGHT = [
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5)  // corner
                ],
                    faceBACK = [
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5)    // corner
                ];

                var faces = [
                    ['front',   faceFRONT],
                    ['top',     faceTOP],
                    ['bottom',  faceBOTTOM],
                    ['left',    faceLEFT],
                    ['right',   faceRIGHT],
                    ['back',    faceBACK]
                ];

                var vertices = [];
                for (var i = 0; i < faces.length; i++) {
                    sides[i] = new folio.F3D.FPath3();
                    // sides[i].name = faces[i][0];
                    sides[i].name = 'Z-TOP'; // hack until FScene3D is fixed

                    vertices = faces[i][1];
                    for (var j = 0; j < vertices.length; j++) {
                        sides[i].add3( new folio.F3D.FPoint3(
                            vertices[j].x * this._size.width,
                            vertices[j].y * this._size.height,
                            vertices[j].z * this._size.depth
                        ));
                    }

                    // sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
                    sides[i].closed = true;
                    sides[i].translate( fpoint3 );

                    scene.addItem( sides[i] );
                }

                return new Group(sides);
            },

            /**
             *
             * FSphere
             * Create simple sphere
             *
             * @param {folio.F3D.FScene3D} scene
             *          the scene to attach the Sphere to
             * @param {folio.F3D.FPoint3} fpoint3
             *          the position of the Sphere
             * @param {folio.F3D.FSize3} radius
             *          the radius of the Sphere
             * @param {Array} detail (optional)
             *          the longitude and latitude detail
             *          default: [6,6]
             *          *** anything over [21,21] and you should probably be using Three.js ***
             *
             */
            FSphere: function(scene, fpoint3, radius, detail) {
                this._position3 = (fpoint3 != undefined)
                    ? fpoint3
                    : new folio.F3D.FPoint3( 0,0,0 );

                this._size = (radius != undefined)
                    ? new folio.F3D.FSize3( radius, radius, radius )
                    : new folio.F3D.FSize3( 10,10,10 );

                var _c = 0.5;

                var latlon;
                if (detail != undefined) {
                    if (detail instanceof Array) {
                        latlon = detail;
                    }
                    else {
                        latlon = [detail, detail];
                    }
                }
                else {
                    latlon = [6,6];
                }


                var vertices = [];
                for (var i = 0; i <= latlon[0]; i++) {
                    var lat0 = (Math.PI * (-_c + ( (i-1)/latlon[0]) ));
                    var z0   = Math.sin(lat0);
                    var zr0  = Math.cos(lat0);

                    var lat1 = (Math.PI * (-_c + ( i/latlon[0]) ));
                    var z1   = Math.sin(lat1);
                    var zr1  = Math.cos(lat1);

                    for (var j = 0; j <= latlon[1]; j++) {
                        var lng = ((Math.PI*2) * ( (j-1)/latlon[1] ));
                        var x = Math.cos(lng);
                        var y = Math.sin(lng);

                        vertices.push( new folio.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
                        vertices.push( new folio.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
                    } // _longs
                } // _lats
                var sides = [vertices.length-2];

                for (var i = 0; i < vertices.length-2; i++) {
                    sides[i] = new folio.F3D.FPath3();
                    sides[i].name = 'face'+i;

                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i].x*(this._size.width*0.5),
                        vertices[i].y*(this._size.height*0.5),
                        vertices[i].z*(this._size.depth*0.5)
                    ));
                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i+1].x*(this._size.width*0.5),
                        vertices[i+1].y*(this._size.height*0.5),
                        vertices[i+1].z*(this._size.depth*0.5)
                    ));
                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i+2].x*(this._size.width*0.5),
                        vertices[i+2].y*(this._size.height*0.5),
                        vertices[i+2].z*(this._size.depth*0.5)
                    ));

                    // sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
                    sides[i].closed = true;
                    sides[i].translate( fpoint3 );

                    scene.addItem( sides[i] );
                }

                return new Group(sides);
            }


        }; // end return

    } // end statics:
});

