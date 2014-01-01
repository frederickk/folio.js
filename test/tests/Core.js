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


module('Core');

test('println', function(obj) {
});

test('boolToInt(false)', function(val) {
	var f = paper.boolToInt(false);
	equals(f, 0);
});
test('boolToInt(true)', function(val) {
	var t = paper.boolToInt(true);
	equals(t, 1);
});

test('numToBool(0)', function(val) {
	var f = paper.numToBool(0);
	equals(f, false);
});
test('numToBool(1)', function(val) {
	var t = paper.numToBool(1);
	equals(t, true);
});

test('getType', function(obj) {
});

test('findByName', function(items, name) {
});

test('findById', function(items, id) {
});


