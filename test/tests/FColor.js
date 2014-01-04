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


module('FColor');

test('toHex', function() {
	var color = new Color(1.0, 1.0, 1.0);
	equals(color.toHex(), '#ffffff');

	var color = new Color(0.0, 0.0, 0.0);
	equals(color.toHex(), '#000000');
});

test('toInt', function() {
	var color = new Color(1.0, 1.0, 1.0);
	equals(color.toInt(), 65793);

	var color = new Color(0.0, 0.0, 0.0);
	equals(color.toInt(), 0);
});

test('integer', function() {
	var color = new Color.integer(65793);
	equals(color, new Color(1.0, 1.0, 1.0));

	var color = new Color.integer(0);
	equals(color, new Color(0.0, 0.0, 0.0));
});

test('bytes', function() {
	var color = new Color.bytes(255, 255, 255);
	equals(color, new Color(1.0, 1.0, 1.0));

	var color = new Color.bytes(127.5, 127.5, 127.5);
	equals(color, new Color(0.5, 0.5, 0.5));

	var color = new Color.bytes(0, 0, 0);
	equals(color, new Color(0.0, 0.0, 0.0));
});

test('desaturate', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.desaturate(0.2);
	compareColors(result, new Color(0.1, 0.9, 0.66));
});

test('saturate', function() {
	var color = new Color(0.0, 0.7, 0.5);
	var result = color.saturate(0.2);
	compareColors(result, new Color(0, 0.7, 0.5));
});

test('darken', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.darken(0.2);
	compareColors(result, new Color(0, 0.8, 0.56));
});

test('dim', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.dim(0.2);
	compareColors(result, new Color(0, 0.8, 0.56));
});

test('lighten', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.lighten(0.2);
	compareColors(result, new Color(0.2, 1.0, 0.76));
});

test('brighten', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.brighten(0.2);
	compareColors(result, new Color(0.1, 1.0, 0.73));
});

test('contrast', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.contrast(0.2);
	compareColors(result, new Color(0.2, 1.0, 0.76));
});

test('invert', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.invert();
	compareColors(result, new Color(1.0, 0, 0.3));
});

test('rotate', function() {
	var color = new Color(0.0, 1.0, 0.7);
	var result = color.rotate(180);
	compareColors(result, new Color(1.0, 0, 0.3));

	var triad = [
		color,
		color.rotate(120),
		color.rotate(240)
	];
	compareColors(triad[1], new Color(0.7, 0, 1.0));
	compareColors(triad[2], new Color(1.0, 0.7, 0));
});

test('interpolate', function() {
	var color1 = new Color( 0.0, 1.0, 0.7 );
	var color2 = new Color( 0.0, 0.7, 1.0 );
	var result = color1.interpolate( color2, 0.5 );
	equals(result, new Color(0, 0.85, 0.85));
});

test('random', function() {
	var color = new Color.random();
	compareColors(color, color);

	var color = new Color.random(0.5);
	// console.log( color.components );
	// console.log( '---------' );
	equals(function() {
		return color.gray < 0.5;
	}, true)

	var color = new Color.random(0.3, 0.6, 0.9);
	// console.log( color.components );
	// console.log( '---------' );
	equals(function() {
		return color.red <= 0.3 && color.blue <= 0.6 && color.green <= 0.9;
	}, true)

	var color = new Color.random(90, 1, 0.8);
	// console.log( color.components );
	// console.log( '---------' );
	equals(function() {
		return color.hue <= 90 && color.saturation <= 1 && color.lightness <= 0.8;
	}, true)

	var color = new Color.random('#00ffc7');
	// console.log( color.components );
	// console.log( '---------' );
	equals(function() {
		return color.red <= 0 && color.green <= 1.0 && color.blue <= 0.8;
	}, true)

	var color = new Color.random([45, 90], [0.7, 1.0], [0.5, 0.8]);
	// console.log( color.components );
	// console.log( '---------' );
	equals(function() {
		return color.hue >= 45 && color.hue <= 90 &&
			color.saturation >= 0.7 && color.saturation <= 1.0 &&
			color.brightness >= 0.5 && color.brightness <= 0.8;
	}, true)

});


