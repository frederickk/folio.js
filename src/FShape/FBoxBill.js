/**
 *  
 *	FBoxBill.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBoxBill
 *
 *	Create a Max Bill shapes box
 *	http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
 *
 */
// Frederickk.FShape.FBoxBill = Frederickk.FShape.FBox.extend({
// 	// Properties
// 	// private
// 	whdTemp: new Frederickk.F3D.FPoint3(),
// 	rotation: new Frederickk.F3D.FPoint3(),

// 	bContainer: true,
// 	bRotation: false,

// 	// face number
// 	face:	0,

// 	// face numbers
// 	FRONT	: 0,
// 	TOP 	: 1,
// 	BOTTOM	: 2,
// 	LEFT	: 3,
// 	RIGHT	: 4,
// 	BACK	: 5,
	

// 	pointsMatrix: [],
// 	verticesArr: [],



// 	// Methods
// 	init : function() {
// 		// consecutive points for shapes
// 		pointsMatrix = [
// 			pointsTOP[0],
// 			pointsTOP[1],
// 			pointsTOP[2],
// 			pointsTOP[3],
// 			pointsTOP[4],
// 			pointsTOP[5],
// 			pointsTOP[6],
// 			pointsTOP[7],
			
// 			pointsLEFT[3],

// 			pointsRIGHT[3],

// 			pointsFRONT[3],
// 			pointsFRONT[7],

// 			pointsBOTTOM[0],
// 			pointsBOTTOM[1],
// 			pointsBOTTOM[2],
// 			pointsBOTTOM[3],
// 			pointsBOTTOM[4],
// 			pointsBOTTOM[5],
// 			pointsBOTTOM[6],
// 			pointsBOTTOM[7]
// 		];		
// 	},

// // 	this.draw = function() {
// // 		// if( verticesArr == null) {
// // 		// 	drawMatrix();
// // 		// }
// // 		// else {
// // 			draw(verticesArr);
// // 		// }
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	/**
// // 	 *
// // 	 *	TODO: add a way to translate shapes in 3D
// // 	 *
// // 	 */
// // 	var drawMatrix = function() {
// // 		if( whd != null) {
// // 			for(i=0; i<pointsMatrix.length; i++) {
// // 				var color = Frederickk.HSVtoColor( 
// // 					Frederickk.norm(i,0,pointsMatrix.length), 1.0, 1.0
// // 				);
// // 				color.alpha = 0.5;
// // // 
// // 				// translate( pointsMatrix[i].x*whd.x, pointsMatrix[i].y*whd.y, pointsMatrix[i].z*whd.z );
// // 				// sphere(15);
// // 			}
// // 		}
// // 	};


// // 	// ------------------------------------------------------------------------
// // 	var draw = function(_verticesArr) {
// // 		verticesArr = _verticesArr;
// // // 		
// // // 		pushMatrix();
// // // 		translate(sz*2, sz*2, sz*2);
// // // 		if(bRotation) {
// // // 			rotateX(rotation.x);
// // // 			rotateY(rotation.y);
// // // 			rotateZ(rotation.z);
// // // 		}
// // // 		
// // // 		translate(-sz*2, -sz*2, -sz*2);
// // 		var path = new Frederickk.F3D.FPath3();
// // 		path.name = this.name;
// // 		for(i=0; i<verticesArr.length; i++) {
// // 			path.addPoints3( 
// // 				new Frederickk.F3D.FPoint3(
// // 					pointsMatrix[ verticesArr[i] ].x()*whd.x(),
// // 					pointsMatrix[ verticesArr[i] ].y()*whd.y(),
// // 					pointsMatrix[ verticesArr[i] ].z()*whd.z()
// // 				)
// // 			);
// // 		}
// // 		path.fillColor = this.fillColor;
// // 		path.strokeColor = this.strokeColor;
// // 		path.closed = this.closed;

// // 		scene.addItem( path );

// // // 		path.translate( )
// // 		return path.draw();
// // 	};



// // 	// Sets
// // 	this.setWHD = function(w, h, d) {
// // 		if(whdTemp.x == 0) {
// // 			whdTemp.set( 
// // 				w*2,
// // 				parseInt(h*2),
// // 				parseInt(d*2)
// // 			);
// // 		}
// // 		whd.set( 
// // 			parseInt(w*2),
// // 			parseInt(h*2),
// // 			parseInt(d*2)
// // 		);
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.reset = function() {
// // 		this.setFace(0);
// // 		whd.x = whdTemp.x;
// // 		whd.y = whdTemp.y;
// // 		whd.z = whdTemp.z;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	/**
// // 	 *	@param num
// // 	 *				0 = front
// // 	 *				1 = top
// // 	 *				2 = bottom
// // 	 *				3 = left
// // 	 *				4 = right
// // 	 *				5 = back (same as front really...)
// // 	 */
// // 	this.setFace = function(num) {
// // 		face = num;
// // 	};
	
// // 	// ------------------------------------------------------------------------
// // 	this.setVertices = function(_verticesArr) {
// // 		verticesArr = _verticesArr;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.showContainer = function(val) {
// // 		bContainer = val;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.Rotation = function(val, rads) {
// // 		bRotation = val;
// // 		rotation = rads;
// // 	};



// // 	// Gets
// // 	this.getWHD = function() {
// // 		return whdTemp;
// // 	};

// });


