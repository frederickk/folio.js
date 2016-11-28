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


module('FArray');

// ------------------------------------------------------------------------
test('median', function() {
    var result;
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    result = arr.median();
    equals(result, 4.5);

    arr = [900, 300, 450, 150];
    result = arr.median();
    equals(result, 375);
});

// ------------------------------------------------------------------------
test('average', function() {
    var result;
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    result = arr.average();
    equals(result, 5);

    arr = [900, 300, 450, 150];
    result = arr.average();
    equals(result, 600);
});

// ------------------------------------------------------------------------
test('merge', function() {
    var result;
    var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var arr2 = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
    result = arr1.merge(arr2);
    compareArrays(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 900, 0, 2, 70, 400, 50, 6, 3, 80, 100]);
});

// ------------------------------------------------------------------------
test('combine', function() {
    var result;
    var obj1 = {
        'foo': 0,
        'bar': 1
    };
    var obj2 = {
        'baz': 3
    };
    result = obj1.combine(obj2);
    compareObjects('Combine', ['foo', 'bar', 'baz'], result, {'foo': 0, 'bar': 1, 'baz': 3});
});

// ------------------------------------------------------------------------
test('findIndex', function() {
    var result;
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    result = arr.findIndex(8);
    equals(result, 8);

    arr = ['foo', 'bar', 'baz'];
    result = arr.findIndex('bar');
    equals(result, 1);
});

// ------------------------------------------------------------------------
test('max', function() {
    var result;
    var arr = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
    result = arr.max();
    equals(result, 0); // 900
    equals([900, 0, 2, 70, 400, 50, 6, 3, 80, 100].max(), 0); // 900

    result = arr.max(1,4);
    equals(result, 3); // 70

    result = arr.max(4,8);
    equals(result, 4); // 400
});

// ------------------------------------------------------------------------
test('min', function() {
    var result;
    var arr = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
    result = arr.min();
    equals(result, 1); // 0
    equals([900, 0, 2, 70, 400, 50, 6, 3, 80, 100].min(), 1); // 0

    result = arr.min(1,4);
    equals(result, 1); // 0

    result = arr.min(4,8);
    equals(result, 7); // 3
});

// ------------------------------------------------------------------------
test('shuffle', function() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.shuffle();
    compareArrays(function() {
        return 0 === arr[0];
    }, false);
});

// ------------------------------------------------------------------------
test('unique', function() {
    var result;
    var arr = [0.0, 1.1, 1.1, 2.2, 2.2, 3.3, 4, 5];
    result = arr.unique();
    compareArrays(result, [0, 1.1, 2.2, 3.3, 4, 5]);
});

// ------------------------------------------------------------------------
test('removeDuplicates', function() {
    var result;
    var arr = [0.0, 1.1, 1.1, 2.2, 2.2, 3.3, 4, 5];
    result = arr.removeDuplicates();
    compareArrays(result, [0, 1.1, 2.2, 3.3, 4, 5]);
});

// ------------------------------------------------------------------------
test('round', function() {
    var result;
    var arr = [0.12, 3.45, 6.789];
    result = arr.round(1);
    compareArrays(result, [0.1, 3.5, 6.8]);
});

// ------------------------------------------------------------------------
test('same', function() {
    var result;
    var arr1 = [0, 1, 2, 3, 4, 5, 6];
    var arr2 = [0, 1, 5, 6, 7, 8, 9];

    result = arr1.same(arr2);
    compareArrays(result, [0, 1, 5, 6]);

    arr1 = ['foo', 'bar', 'baz'];
    arr2 = ['baz', 'qux', 'quux'];

    result = arr1.same(arr2);
    compareArrays(result, ['baz']);
});
