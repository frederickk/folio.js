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

test('println', function() {
	paper.println('test');
	equals(true, true);
});

test('boolToInt(false)', function() {
	var f = paper.boolToInt(false);
	equals(f, 0);
});
test('boolToInt(true)', function() {
	var t = paper.boolToInt(true);
	equals(t, 1);
});

test('numToBool(0)', function() {
	var f = paper.numToBool(0);
	equals(f, false);
});
test('numToBool(1)', function() {
	var t = paper.numToBool(1);
	equals(t, true);
});

test('getType', function() {
	var rect = new Path.Rectangle(0,0, 100,100);
	var output = paper.getType(rect);
	equals(output, 'Path');

	var point = new Point(0,0);
	var output = paper.getType(point);
	equals(output, 'Point');

	var arr = [0, 1, 2, 3];
	var output = paper.getType(arr);
	equals(output, 'Array');

	var obj = {item: 1, property: 'number', misc: true};
	var output = paper.getType(obj);
	equals(output, 'Object');
});


test('findByName', function() {
	var item1 = new Path.Rectangle(0,0, 100,100);
	item1.name = 'Golf';

	var item2 = new Path.Rectangle(100,100, 100,100);
	item2.name = 'Oscar';

	var item3 = new Path.Rectangle(300,300, 100,100);
	item3.name = 'November';

	var group = new Group(item1, item2, item3);
	var output = paper.findByName(group.children, 'Oscar');
	compareItems(output, item2);
});

test('findById', function() {
	var item1 = new Path.Rectangle(0,0, 100,100);
	item1.name = 'Golf';

	var item2 = new Path.Rectangle(100,100, 100,100);
	item2.name = 'Oscar';

	var item3 = new Path.Rectangle(300,300, 100,100);
	item3.name = 'November';

	var group = new Group(item1, item2, item3);
	var output = paper.findById(group.children, item2.id);
	compareItems(output, item2);
});


