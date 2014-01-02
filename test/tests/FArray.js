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

test('median', function() {
	var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var output = arr.median();
	equals(output, 4.5);

	var arr = [900, 300, 450, 150];
	var output = arr.median();
	equals(output, 375);
});

test('merge', function() {
	var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var arr2 = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
	var output = arr1.merge(arr2);
	compareArrays(output, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 900, 0, 2, 70, 400, 50, 6, 3, 80, 100]);
});

test('max', function() {
	var arr = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
	var output = arr.max();
	equals(output, 0); // 900

	var output = arr.max(1,4);
	equals(output, 3); // 70

	var output = arr.max(4,8);
	equals(output, 4); // 400
});

test('min', function() {
	var arr = [900, 0, 2, 70, 400, 50, 6, 3, 80, 100];
	var output = arr.min();
	equals(output, 1); // 0

	var output = arr.min(1,4);
	equals(output, 1); // 0

	var output = arr.min(4,8);
	equals(output, 7); // 3
});

test('shuffle', function() {
	var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	arr.shuffle();
	compareArrays(function() {
		return 0 === arr[0];
	}, false);
});

test('unique', function() {
	var arr = [0.0, 1.1, 1.1, 2.2, 2.2, 3.3, 4, 5];
	var output = arr.unique();
	compareArrays(output, [0, 1.1, 2.2, 3.3, 4, 5]);
});

test('removeDuplicates', function() {
	var arr = [0.0, 1.1, 1.1, 2.2, 2.2, 3.3, 4, 5];
	var output = arr.removeDuplicates();
	compareArrays(output, [0, 1.1, 2.2, 3.3, 4, 5]);
});

test('round', function() {
	var arr = [0.12, 3.45, 6.789];
	var output = arr.round(1);
	compareArrays(output, [0.1, 3.5, 6.8]);
});

test('FSort.alphabetical', function() {
	var arr = ['November', 'Oscar', 'Golf', 'Uniform'];
	var output = arr.sort(FSort.alphabetical);
	compareArrays(output, ['Golf', 'November', 'Oscar', 'Uniform']);
});

// test('FSort.distanceToCenter', function() {
// });


