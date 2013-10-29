module.exports = function(grunt) {
	// properties
	var name = '<%= pkg.name %>-v<%= pkg.version%>';

	// configure each task
	grunt.initConfig({
		// pkg is used from templates and therefore
		// MUST be defined inside initConfig object
		pkg : grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				report: 'min'
			},
			dist: {
				src: '<%= concat.target.dest %>',
				dest: 'distribution/' + name + '.min.js'
			}
		},

		concat: {
			target : {
				src : ['src/**/*.js'],
				dest : 'distribution/' + name + '.js'
			}
		},

		jshint: {
			// options: {
			// 	trailing: true,
			// 	eqeqeq: true
			// },
			target: {
				src : ['src/**/*.js']
			}
		}
	});


	// load the NPM modules
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register tasks
	// grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('default', ['concat', 'uglify']);


};
