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


module('FSort');

// ------------------------------------------------------------------------
test('alphabetical', function() {
    var result;
    var arr = ['November', 'Oscar', 'Golf', 'Uniform'];
    result = arr.sort(folio.FSort.alphabetical);
    compareArrays(result, ['Golf', 'November', 'Oscar', 'Uniform']);
});

// ------------------------------------------------------------------------
test('distanceToCenter', function() {
    var arr = [
        new Point(0, 0),
        new Point(300, 0),
        new Point(300, 300),
        new Point(0, 300)
    ];

    // TODO: understand why this is the result
    result = arr.sort(folio.FSort.distanceToCenter);
    compareArrays(result, [3, 3, 3, 3]);
});
