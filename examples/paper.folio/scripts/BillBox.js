/**
 *
 *	FBillBox.js
 *	v0.5
 *
 *	11. August 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FBillBox
 *
 *	Create Max Bill shapes
 *	http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
 *
 */



folio.F3D.FPath3.inject({

	//-----------------------------------------------------------------------------
	statics: new function() {
		return {

			/**
			 *
			 *	FBox
			 *	Create simple box
			 *
			 *	@param {folio.F3D.FScene3D} scene
			 *				the scene to attach the Box to
			 *	@param {folio.F3D.FPoint3} fpoint3
			 *		  		the position of the Box
			 *	@param {folio.F3D.FSize3} fsize3
			 *				the size of the Box
			 *	@param {Array} vertices
			 *		  		an array of vertice numbers [1,9,15,17,11,7]
			 *
			 */
			BillBox: function(scene, fpoint3, fsize3, vertices) {
				this._position3 = (fpoint3 != undefined)
					? fpoint3
					: new folio.F3D.FPoint3( 0,0,0 );

				this._size = (fsize3 != undefined)
					? fsize3
					: new folio.F3D.FSize3( 10,10,10 );

				var pointsFRONT = [
					new folio.F3D.FPoint3(-0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	-0.5,	-0.5),
					new folio.F3D.FPoint3( 0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.0,	-0.5),
					new folio.F3D.FPoint3( 0.5,	0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	0.5,	-0.5),
					new folio.F3D.FPoint3(-0.5,	0.5,	-0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.0,	-0.5)
				],
				pointsTOP = [
					new folio.F3D.FPoint3(-0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	-0.5,	0.5),
					new folio.F3D.FPoint3( 0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	-0.5,	0.0),
					new folio.F3D.FPoint3( 0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	-0.5,	-0.5),
					new folio.F3D.FPoint3(-0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	-0.5,	0.0)
				],
				pointsBOTTOM = [
					new folio.F3D.FPoint3(-0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.0, 0.5,	0.5),
					new folio.F3D.FPoint3( 0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, 0.5,	0.0),
					new folio.F3D.FPoint3( 0.5, 0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.0, 0.5,	-0.5),
					new folio.F3D.FPoint3(-0.5, 0.5,	-0.5),	// corner
					new folio.F3D.FPoint3(-0.5, 0.5,	0.0)
				],
				pointsLEFT = [
					new folio.F3D.FPoint3(-0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	-0.5,	0.0),
					new folio.F3D.FPoint3(-0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.0,	0.5),
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5,	0.0),
					new folio.F3D.FPoint3(-0.5,	0.5,	-0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.0,	-0.5)
				],
				pointsRIGHT = [
					new folio.F3D.FPoint3( 0.5,	-0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	-0.5,	0.0),
					new folio.F3D.FPoint3( 0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.0,	0.5),
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5,	0.0),
					new folio.F3D.FPoint3( 0.5,	0.5,	-0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.0,	-0.5),
				],
				pointsBACK = [
					new folio.F3D.FPoint3(-0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	-0.5,	0.5),
					new folio.F3D.FPoint3( 0.5,	-0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.0,	0.5),
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.0,	0.5,	0.5),
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.0,	0.5),
				];

				// consecutive points for shapes
				var pointsMatrix = [
					pointsTOP[0],
					pointsTOP[1],
					pointsTOP[2],
					pointsTOP[3],
					pointsTOP[4],
					pointsTOP[5],
					pointsTOP[6],
					pointsTOP[7],

					pointsLEFT[3],

					pointsRIGHT[3],

					pointsFRONT[3],
					pointsFRONT[7],

					pointsBOTTOM[0],
					pointsBOTTOM[1],
					pointsBOTTOM[2],
					pointsBOTTOM[3],
					pointsBOTTOM[4],
					pointsBOTTOM[5],
					pointsBOTTOM[6],
					pointsBOTTOM[7]
				];

				// bill shape
				var path = new folio.F3D.FPath3();
				for(i=0; i<vertices.length; i++) {
					path.add3(
						new folio.F3D.FPoint3(
							pointsMatrix[ vertices[i] ].x*this._size.width,
							pointsMatrix[ vertices[i] ].y*this._size.height,
							pointsMatrix[ vertices[i] ].z*this._size.depth
						)
					);
				}

				path.translate(fpoint3);
				path.closed = true;

				scene.addItem( path );

				var box = new folio.F3D.FPath3.FBox(
					scene,
					fpoint3,
					fsize3
				);
				box.fillColor = null;
				box.strokeColor = 'black';
				box.strokeWidth = 1.8;
				// box.name = 'Z-TOP';

				return new Group(box,path);
			}


		}; // end return

	} // end statics:
});



/**
 *
 *	create default red shape (rectangle)
 *
 */
var BillRed = function(scene, fpoint3, fsize3) {
	var bbox = new folio.F3D.FPath3.BillBox(
		scene, fpoint3, fsize3,
		[2,14,18,6]
	);
	bbox.children[1].fillColor = new Color(0.9, 0.26, 0.14);
	bbox.children[1].strokeColor = null;
	return bbox;
};

/**
 *
 *	create default yellow shape (diamond)
 *
 */
var BillYellow = function(scene, fpoint3, fsize3) {
	var bbox = new folio.F3D.FPath3.BillBox(
		scene, fpoint3, fsize3,
		[8,9,10,11]
	);
	bbox.children[1].fillColor = new Color(0.99, 0.84, 0);
	bbox.children[1].strokeColor = null;
	return bbox;
};

/**
 *
 *	create default blue shape (hexagon)
 *
 */
var BillBlue = function(scene, fpoint3, fsize3) {
	var bbox = new folio.F3D.FPath3.BillBox(
		scene, fpoint3, fsize3,
		[1,9,15,17,11,7]
	);
	bbox.children[1].fillColor = new Color(0.04, 0.5, 0.74);
	bbox.children[1].strokeColor = null;
	return bbox;
};


