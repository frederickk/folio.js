/**!
 *
 * folio.js
 * https://github.com/frederickk/folio.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


module('FPath');

// test('snapGrid', function() {
// });

// test('snapIso', function() {
// });

// test('getDistanceToCenter', function() {
// });

test('toGroup', function() {
	var path = new CompoundPath({
		children: [
			new Path.Circle({
				center: new Point(50, 50),
				radius: 30
			}),
			new Path.Circle({
				center: new Point(50, 50),
				radius: 10
			})
		]
	});
	equals(path.toGroup().type, 'group');
});

test('getCentroid', function() {
	var triangle = new Path(
		new Point(0, 0),
		new Point(180, 180),
		new Point(0, 360)
	);
	var centroid = triangle.getCentroid();
	comparePoints(centroid, { x:60, y:180 });
});

test('getCircumcenter', function() {
	var triangle = new Path(
		new Point(0, 0),
		new Point(180, 180),
		new Point(0, 360)
	);
	var circumcenter = triangle.getCircumcenter();
	comparePoints(circumcenter, { x:0, y:180 });
});

// test('getCircumcircle', function() {
// });

test('getIncircle', function() {
	var triangle = new Path(
		new Point(0, 0),
		new Point(180, 180),
		new Point(0, 360)
	);
	var incircle = triangle.getIncircle();
	compareItems(incircle, new Path.Circle(new Point(60, 180), 120));
});

// test('getIncenter ', function() {
// });

// test('toCartesian ', function() {
// });

// test('getOrthocenter ', function() {
// });

// test('getSchifflerPoint ', function() {
// });

test('FArrow', function() {
	var headPoint = new Point( 9,9 );
	var tailPoint = new Point( 90,90 );
	var arrowHeadSize = new Size( 18,18 );
	var farrow = new Path.FArrow( headPoint, tailPoint, arrowHeadSize );
	equals(farrow.type, 'group');
});

test('FBubble', function() {
	var bubblePoint = new Point( 45,45 );
	var bubbleSize = new Size( 90,60 );
	var bubbleTagSize = new Size( 9,9 );
	var bubbleTagCenter = 'CENTER';
	var bubble = new Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
	equals(bubble.type, 'path');
});

test('FChain', function() {
	var point1 = new Point(9, 9);
	var radius1 = 9;
	var point2 = new Point(90, 90);
	var radius2 = 90;
	var fchain = new Path.FChain( point1, radius1, point2, radius2 );
	equals(fchain.type, 'path');

	var path1 = new Path.Circle( new Point(9,9), 9 );
	var path2 = new Path.Circle( new Point(90,90), 90 );
	var fchain = new Path.FChain( path1, path2 );
	equals(fchain.type, 'path');
});

test('FCross', function() {
	var centerPoint = new Point( 45,45 );
	var size = new Size( 45,45 );
	var strokeWidth = 18;
	var crossType = 'LINE';
	var fcross = new Path.FCross( centerPoint, size, strokeWidth, crossType );
	equals(fcross.type, 'group');
});

test('FDrop', function() {
	var centerPoint = new Point( 45,45 );
	var scale = 45;
	var fdrop = new Path.FDrop( centerPoint, scale );
	equals(fdrop.type, 'path');

	var centerPoint = new Point( 45,45 );
	var scale = new Size( 30,61.8 );
	var fdrop = new Path.FDrop( centerPoint, scale );
	equals(fdrop.type, 'path');
});

test('FTriangle', function() {
	var p1 = new Point( 9,9 );
	var p2 = new Point( 90,45 );
	var p3 = new Point( 45,90 );
	var ftriangle = new Path.FTriangle( p1, p2, p3 );
	equals(ftriangle.type, 'path');
});
