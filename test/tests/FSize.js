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
	var output = size.getArea();
	equals(output, 200);
});

test('getCircumarea', function() {
	var size = new Size(10, 20);
	var output = size.getCircumarea();
	equals(output, 392.69908169872417);
});

test('getIncirclearea', function() {
	var size = new Size(10, 20);
	var output = size.getIncirclearea();
	equals(output, 78.53981633974483);
});

test('getCircumradius', function() {
	var size = new Size(10, 20);
	var output = size.getCircumradius();
	equals(output, 11.180339887498949);
});

test('getIncircleradius', function() {
	var size = new Size(10, 20);
	var output = size.getIncircleradius();
	equals(output, 5);
});

test('getSlopeAngle', function() {
	var size = new Size(10, 20);
	var output = size.getSlopeAngle();
	equals(paper.degrees(output), 26.565051177077994);
});
