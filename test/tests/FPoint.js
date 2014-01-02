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


module('FPoint');

// test('snap', function() {
// });

test('interpolateTo', function() {
	var point = new Point(0, 0);
	var arg0 = new Point(100, 100);
	var output = point.interpolateTo(arg0, 0.5);
	comparePoints(output, {x: 50, y: 50});

	var start = new Point(0, 30);
	var end = new Point(360, 90);
	var interpolate = Point.interpolateTo(start, end, 0.5);
	comparePoints(interpolate, { x: 180, y: 60 });
});

// test('getDistanceToCenter', function() {
// });

test('getHeading', function() {
	var point = new Point(0, 90);
	var output = point.getHeading();
	equals(paper.degrees(output), 90);
});

test('getAngle', function() {
	var point1 = new Point(0, 90);
	var point2 = new Point(90, 180);
	var output = point1.getAngle(point2);
	equals(paper.degrees(output), 45);
});

test('norm', function() {
	var point = new Point(30, 270);
	var start = new Point(90, 180);
	var stop = new Point(180, 360);
	var output = point.norm(start, stop);
	comparePoints(output, {x: -0.6666666666666666, y: 0.5});
});

// test('limit', function() {
// });

test('magSq', function() {
	var point = new Point(0, 90);
	var output = point.magSq();
	equals(output, 8100);
});

test('random', function() {
	var point = new Point.random(90, 90);
	equals(function() {
		return point.x <= 90 && point.y <= 90;
	}, true);
});


