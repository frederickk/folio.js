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


module('FSize');

test('getArea', function() {
	var size = new Size(10, 20);
	var result = size.getArea();
	equals(result, 200);
});

test('getCircumarea', function() {
	var size = new Size(10, 20);
	var result = size.getCircumarea();
	equals(result, 392.69908169872417);
});

test('getIncirclearea', function() {
	var size = new Size(10, 20);
	var result = size.getIncirclearea();
	equals(result, 78.53981633974483);
});

test('getCircumradius', function() {
	var size = new Size(10, 20);
	var result = size.getCircumradius();
	equals(result, 11.180339887498949);
});

test('getIncircleradius', function() {
	var size = new Size(10, 20);
	var result = size.getIncircleradius();
	equals(result, 5);
});

test('getSlopeAngle', function() {
	var size = new Size(10, 20);
	var result = size.getSlopeAngle();
	equals(paper.degrees(result), 26.565051177077994);
});
