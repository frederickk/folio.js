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


module('FString');

test('trimStart', function() {
	var str = '  Olivia';
	var output = str.trimStart();
	equals(output, 'Olivia');

	var str = '  Olivia';
	var output = str.trimLeft();
	equals(output, 'Olivia');
});

test('trimEnd', function() {
	var str = 'Olivia  ';
	var output = str.trimEnd();
	equals(output, 'Olivia');

	var str = 'Olivia  ';
	var output = str.trimRight();
	equals(output, 'Olivia');
});

test('trim', function() {
	var str = '  Olivia  ';
	var output = str.trim();
	equals(output, 'Olivia');
});

test('toBool', function() {
	var str = 'true';
	equals(str.toBool(), true);

	var str = 'yes';
	equals(str.toBool(), true);

	var str = 'false';
	equals(str.toBool(), false);

	var str = 'no';
	equals(str.toBool(), false);
});


