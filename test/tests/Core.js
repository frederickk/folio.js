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

// ------------------------------------------------------------------------
test('print', function() {
    paper.print('paper.print() success');
    equals(true, true);
});

// ------------------------------------------------------------------------
test('println', function() {
    paper.println('paper.println() success');
    equals(true, true);
});

// ------------------------------------------------------------------------
test('boolToInt(false)', function() {
    var f = paper.boolToInt(false);
    equals(f, 0);
});
test('boolToInt(true)', function() {
    var t = paper.boolToInt(true);
    equals(t, 1);
});

// ------------------------------------------------------------------------
test('numToBool(0)', function() {
    var f = paper.numToBool(0);
    equals(f, false);
});
test('numToBool(1)', function() {
    var t = paper.numToBool(1);
    equals(t, true);
});

// ------------------------------------------------------------------------
test('getType', function() {
    var rect = new Path.Rectangle(0, 0, 100, 100);
    var result = paper.getType(rect);
    equals(result, 'Path');

    var point = new Point(0,0);
    var result = paper.getType(point);
    equals(result, 'Point');

    var arr = [0, 1, 2, 3];
    var result = paper.getType(arr);
    equals(result, 'Array');

    var obj = {item: 1, property: 'number', misc: true};
    var result = paper.getType(obj);
    equals(result, 'Object');
});

// ------------------------------------------------------------------------
test('findByName', function() {
    var item1 = new Path.Rectangle(0, 0, 100, 100);
    item1.name = 'Golf';

    var item2 = new Path.Rectangle(100,100, 100,100);
    item2.name = 'Oscar';

    var item3 = new Path.Rectangle(300,300, 100,100);
    item3.name = 'November';

    var group = new Group(item1, item2, item3);
    var result = paper.findByName(group.children, 'Oscar');
    // compareItems(result, item2);
    equals(result.name, item2.name);
});

// ------------------------------------------------------------------------
test('findById', function() {
    var item1 = new Path.Rectangle(0, 0, 100, 100);
    item1.id = 'Golf';

    var item2 = new Path.Rectangle(100,100, 100,100);
    item2.id = 'Oscar';

    var item3 = new Path.Rectangle(300,300, 100,100);
    item3.id = 'November';

    var group = new Group(item1, item2, item3);
    var result = paper.findById(group.children, item2.id);
    equals(result.id, item2.id);
});

// ------------------------------------------------------------------------
test('clear', function() {
    var result;
    var rect = new Path.Rectangle(0, 0, 100, 100);
    var circle = new Path.Circle(0, 0, 50);

    paper.clear();
    equals(paper.project.activeLayer.children.length, 0);


    rect = new Path.Rectangle(0, 0, 100, 100);
    circle = new Path.Circle(0, 0, 50);
    var layer = new Layer({
        children : [rect, circle],
        name     : 'layer-1'
    });

    paper.clear('layer-1');
    equals(paper.project.layers['layer-1'].children.length, 0);


    rect = new Path.Rectangle(0, 0, 100, 100);
    circle = new Path.Circle(0, 0, 50);
    layer = new Layer({
        children : [rect, circle],
        name     : 'layer-2'
    });

    result = paper.clear('layer-2');
    equals(result.children.length, 0);


    rect = new Path.Rectangle(0, 0, 100, 100);
    circle = new Path.Circle(0, 0, 50);
    layer = new Layer({
        children : [rect, circle],
        name     : 'layer-3'
    });

    paper.clear('layer-3', function(layer) {
        equals(layer.children.length, 0);
    });
});
