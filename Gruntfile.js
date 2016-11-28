'use strict';

/**!
 *
 * folio.js
 * gruntfile.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

module.exports = function(grunt) {
    // -----------------------------------------------------------------------------
    //
    // Load NPM modules
    //
    // -----------------------------------------------------------------------------
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);



    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    const path = require('path');
    const pkg = grunt.file.readJSON('package.json');
    const name = '<%= pkg.filename %>';
    const author = '<%= pkg.author %>';
    const config = {
        src  : 'src',
        dist : 'dist'
    };

    const src = [
        './src/Core/*.js',

        './src/FTime/FTime.js',
        './src/FTime/Easing.js',
        './src/FTime/FDate.js',
        './src/FTime/FStepper.js',
        './src/FTime/FStopwatch.js',

        './src/FIO/*.js',

        './src/Extensions/*.js',

        './src/F3D/Matrix3D.js',
        './src/F3D/F3D.js',
        './src/F3D/FPath3.js',
        './src/F3D/FPath3Constructors.js',
        './src/F3D/FPoint3.js',
        './src/F3D/FScene3.js',
        './src/F3D/FSize3.js'
    ];

    const closureOptions = {
        compilation_level : 'SIMPLE_OPTIMIZATIONS',
        language_in       : 'ECMASCRIPT5_STRICT',
    };



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    function getUserDir() {
        let dirpath = path.join.apply(path, arguments);
        let homepath = process.env[process.platform === 'win32'
            ? 'USERPROFILE'
            : 'HOME'];
        dirpath = path.resolve(homepath, dirpath);

        return dirpath;
    }

    function handlerInclude(filename, content, srcpath) {
        let file = 'dist/' + filename;
        let temp = grunt.file.read(file);
        grunt.file.delete(file);

        return grunt.template.process(content.replace(/@INCLUDES/, temp));
    }

    function include(content, srcpath) {
        return handlerInclude('.temp.js', content, srcpath);
    }



    // -----------------------------------------------------------------------------
    //
    // Configure tasks
    //
    // -----------------------------------------------------------------------------
    grunt.initConfig({
        // Metadata
        pkg    : grunt.file.readJSON('package.json'),
        config : config,
        banner : grunt.file.read('./src/license-info.txt')
                           .replace(/@VERSION/, pkg.version)
                           .replace(/@DATE/,    grunt.template.today('dd. mmmm yyyy'))
                           .replace(/@YEAR/,    grunt.template.today('yyyy'))
                           .replace(/@AUTHOR/,  pkg.author),

        clean: [
            'dist',
            'docs'
        ],



        //
        // JavaScript
        //
        'closure-compiler': {
            base: {
                options      : closureOptions,
                js           : '<%= config.dist %>/' + name + '.js',
                jsOutputFile : '<%= config.dist %>/' + name + '.min.js',
                maxBuffer    : 500,
                noreport     : true
            },
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: {
                src: [
                    '<%= config.dist %>/**/*.js',
                    '!<%= config.dist %>/**/*.min.js'
                ]
                // src: ['<%= config.dist %>/' + name + '.js']
            }
        },

        concat: {
            temp: {
                files: {
                    '<%= config.dist %>/.temp.js': [
                        src,
                        '!<%= config.src %>/folio.js'
                    ],
                }
            },
            base: {
                options: {
                    banner: '<%= banner %>',
                    process: include
                },
                files: {
                    '<%= config.dist %>/paper.folio.js': [
                        '<%= config.src %>/folio.js'
                    ]
                }
            }
        },

        jsbeautifier: {
            src : [
                '<%= config.dist %>/**/*',
                '!<%= config.dist %>/**/*.min.js'
            ],
            options: {
                js: {
                    indentSize: 2
                },
                html: {
                    indentSize: 2
                }
            }
        },



        //
        // Watch
        //
        watch: {
            files: [
                '<%= config.src %>/**/*'
            ],
            tasks: ['default']
        },


        //
        // Documentation
        //
        // TODO: NPM kept timing out when installing grunt-jsdoc
        // TODO: Getting error when using later versions of grunt-jsdoc@0.4.1
        // jsdoc: {
        //     dist: {
        //         src: src,
        //         options: {
        //             destination: 'docs'
        //         }
        //     }
        // },
    });



    // -----------------------------------------------------------------------------
    //
    // Register tasks
    //
    // -----------------------------------------------------------------------------
    grunt.registerTask('default', [
        'clean',
        'concat',
        'jshint',
        // 'closure-compiler',
        'jsbeautifier',
        // 'docs'
    ]);

    // grunt.registerTask('docs', [
    //     'jsdoc'
    // ]);
};
