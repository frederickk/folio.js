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
	var result = str.trimStart();
	equals(result, 'Olivia');

	var str = '  Olivia';
	var result = str.trimLeft();
	equals(result, 'Olivia');
});

test('trimEnd', function() {
	var str = 'Olivia  ';
	var result = str.trimEnd();
	equals(result, 'Olivia');

	var str = 'Olivia  ';
	var result = str.trimRight();
	equals(result, 'Olivia');
});

test('trim', function() {
	var str = '  Olivia  ';
	var result = str.trim();
	equals(result, 'Olivia');
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


