module.exports = function(grunt) {
	// properties
	var name = '<%= pkg.name %>';

	var folioPaper   = './src/folio.js';
	var folioScripto = './src/folio-scriptographer.js';

	var folioSrc = [
		'./src/Core/*.js',

		'./src/FTime/FTime.js',
		'./src/FTime/Easing.js',
		'./src/FTime/FDate.js',
		'./src/FTime/FStepper.js',
		'./src/FTime/FStopwatch.js',

		'./src/FIO/*.js',

		'./src/Core/F3D/Matrix3D.js',
		'./src/Core/F3D/FPath3.js',
		'./src/Core/F3D/FPath3Constructors.js',
		'./src/Core/F3D/FPoint3.js',
		'./src/Core/F3D/FScene3.js',
		'./src/Core/F3D/FSize3.js',

		'./src/Extensions/*.js',
	];

	// configure each task
	grunt.initConfig({
		// pkg is used from templates and therefore
		// MUST be defined inside initConfig object
		pkg : grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				report: 'min'
			},
			paper: {
				dist: {
					src: '<%= concat.paper.target.dest %>',
					dest: 'distribution/paper.' + name + '.min.js'
				}
			},
			scriptographer: {
				dist: {
					src: '<%= concat.scriptographer.target.dest %>',
					dest: 'distribution/scriptographer.' + name + '.min.js'
				}
			}
		},

		concat: {
			paper: {
				target: {
					dest: 'distribution/paper.' + name + '.js',
					src: folioSrc
				}
			},
			scriptographer: {
				target: {
					dest: 'distribution/scriptographer.' + name + '.js',
					src: folioSrc
				}
			}
		},

		jshint: {
			// options: {
			// 	trailing: true,
			// 	eqeqeq: true
			// },
			target: {
				src: ['src/**/*.js']
			}
		}
	});


	// load the NPM modules
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register tasks
	// grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('paper', ['concat', 'uglify']);


};
