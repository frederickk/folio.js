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


module('FConversions');

test('PIXEL_TO_MM', function() {
	var result = 1 * FConversions.PIXEL_TO_MM;
	equals( paper.round(result,2), 0.35);
});
test('MM_TO_PIXEL', function() {
	var result = 1 * FConversions.MM_TO_PIXEL;
	equals( paper.round(result,2), 2.83);
});

test('POINT_TO_MM', function() {
	var result = 1 * FConversions.POINT_TO_MM;
	equals( paper.round(result,2), 0.35);
});
test('MM_TO_POINT', function() {
	var result = 1 * FConversions.MM_TO_POINT;
	equals( paper.round(result,2), 2.83);
});

test('PIXEL_TO_CM', function() {
	var result = 1 * FConversions.PIXEL_TO_CM;
	equals( paper.round(result,2), 0.04);
});
test('CM_TO_PIXEL', function() {
	var result = 1 * FConversions.CM_TO_PIXEL;
	equals( paper.round(result,2), 28.35);
});

test('POINT_TO_CM', function() {
	var result = 1 * FConversions.POINT_TO_CM;
	equals( paper.round(result,2), 0.04);
});
test('CM_TO_POINT', function() {
	var result = 1 * FConversions.CM_TO_POINT;
	equals( paper.round(result,2), 28.35);
});

test('PIXEL_TO_INCH', function() {
	var result = 72 * FConversions.PIXEL_TO_INCH;
	equals( paper.round(result,2), 1.0);
});
test('INCH_TO_PIXEL', function() {
	var result = 1 * FConversions.INCH_TO_PIXEL;
	equals( paper.round(result,2), 72);
});

test('POINT_TO_INCH', function() {
	var result = 72 * FConversions.POINT_TO_INCH;
	equals( paper.round(result,2), 1.0);
});
test('INCH_TO_POINT', function() {
	var result = 1 * FConversions.INCH_TO_POINT;
	equals( paper.round(result,2), 72);
});

test('PIXEL_TO_PICA', function() {
	var result = 12 * FConversions.PIXEL_TO_PICA;
	equals( paper.round(result,2), 1);
});
test('PICA_TO_PIXEL', function() {
	var result = 1 * FConversions.PICA_TO_PIXEL;
	equals( paper.round(result,2), 12);
});

test('POINT_TO_PICA', function() {
	var result = 12 * FConversions.POINT_TO_PICA;
	equals( paper.round(result,2), 1);
});
test('PICA_TO_POINT', function() {
	var result = 1 * FConversions.PICA_TO_POINT;
	equals( paper.round(result,2), 12);
});
