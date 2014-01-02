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


module('FCalculate');

test('random', function() {
	var rand = paper.random(30, 90);
	equals(rand, rand);
});

test('randomInt', function() {
	var randInt = paper.randomInt(30, 90);
	equals(randInt, randInt);
});

// test('randomBias', function() {
// });

test('clamp', function() {
	var clamped = paper.clamp(120, 0, 90);
	equals(clamped, 90);
});

test('normalize', function() {
	var normalized = paper.normalize(45, 0, 90);
	equals(normalized, 0.5);
});

test('map', function() {
	var mapped = paper.map(180, 0, 360, 0.0, 2.0);
	equals(mapped, 1);
});

test('round', function() {
	var rounded = paper.round(0.586, 2);
	equals(rounded, 0.59);

	var rounded = paper.round(0.586, 1);
	equals(rounded, 0.6);
});

test('roundMultiple', function() {
	var rounded = paper.roundMultiple(19, 3);
	equals(rounded, 21);

	var rounded = paper.roundMultiple(11, 2);
	equals(rounded, 12);
});

test('snap', function() {
	var snapped = paper.snap(0.66, 0.2);
	equals(snapped, 0.6);

	var snapped = paper.snap(0.66, 0.5);
	equals(snapped, 0.5);
});

test('interpolate', function() {
	var interpolated = paper.interpolate(0, 100, 0.5);
	equals(interpolated, 50);
});

test('divisor', function() {
	var d = paper.divisor(1);
	compareArrays(d, [1]);

	var d = paper.divisor(5);
	compareArrays(d, [1, 5]);

	var d = paper.divisor(12);
	compareArrays(d, [1, 2, 3, 4, 6, 12]);
});

test('degrees', function() {
	var deg = paper.degrees(Math.PI);
	equals(deg, 180);
});

test('radians', function() {
	var rad = paper.radians(180);
	equals(rad, Math.PI);
});

test('sec', function() {
	var s = paper.sec(180);
	equals(s, -1.6709552595117616);
});

test('cosec', function() {
	var cs = paper.cosec(180);
	equals(cs, -1.2482015977941976);
});

test('slope', function() {
	var s = paper.slope(45, 180);
	comparePoints(s, new Point(127.27922061357856, 127.27922061357854));

	var s = paper.slope(30, 90);
	comparePoints(s, new Point(77.94228634059948, 44.99999999999999));
});

test('slopeRatio', function() {
	var s = paper.slopeRatio(
		new Point(0, 0),
		new Point(100, 100)
	);
	equals(s, 1);

	var s = paper.slopeRatio(
		new Point(0, 0),
		new Point(60, 220)
	);
	equals(s, 3.6666666666666665);
});

test('slopeAngle', function() {
	var s = paper.slopeAngle(new Point(100, 100));
	equals(s, 45);
});

test('sq', function() {
	var squared = paper.sq(30);
	equals(squared, 900);
});

// test('getCommonTangents', function() {
// });
