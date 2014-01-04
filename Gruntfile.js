'use strict';

module.exports = function (grunt) {
    
    grunt.initConfig({
        
        // Settings
        settings: {
            dirs: {
                webroot: 'webroot',
                dist: 'dist'
            },
            browser: 'Google Chrome' // Browser app to be opened
        },

        // Local cleanup task
        clean: {
            'bootstrap-dist': [
                '<%= settings.dirs.webroot %>/**/dist/js/*',
                '<%= settings.dirs.webroot %>/**/dist/css/*'
            ],
            dist: [
                '<%= settings.dirs.dist %>/*',
                '!<%= settings.dirs.dist %>/.git*'
            ]
        },
        
        // Generate CSS
        less: {
            options: {
                sourceMap: true,
                sourceMapBasepath: '<%= settings.dirs.webroot %>/bower_components/bootstrap/less/'
            },
            bootstrap: {
                files: {
                    '<%= settings.dirs.webroot %>/bower_components/bootstrap/dist/css/bootstrap.css': '<%= settings.dirs.webroot %>/bower_components/bootstrap/less/bootstrap.less'
                }
            }
        },

        // Inject Bower components into HTML file
        'bower-install': {
            webroot: {
                src: '<%= settings.dirs.webroot %>/index.html',
                ignorePath: '<%= settings.dirs.webroot %>/'
            }
        },
        
        // Copy remaining files
        copy: {
            dist: {
                expand: true,
                cwd: '<%= settings.dirs.webroot %>',
                dest: '<%= settings.dirs.dist %>',
                dot: true,
                src: [
                    '{,*/}*.html',
                    '{,*/}*.png'
                ]
            }
        },
        
        // Parses HTML for usemin blocks
        useminPrepare: {
            options: {
                dest: '<%= settings.dirs.dist %>'
            },
            html: '<%= settings.dirs.webroot %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= settings.dirs.dist %>']
            },
            html: ['<%= settings.dirs.dist %>/{,*/}*.html'],
            css: ['<%= settings.dirs.dist %>/styles/{,*/}*.css']
        },

        // JS validation
        // use jshint plugin: jshint: {},

        // Source optimization
        // htmlmin, ...
        
        // Grunt server
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    base: '<%= settings.dirs.webroot %>',
                    open: {
                        appName: '<%= settings.browser %>'
                    }
                }
            }
        },
                
        // Automagic reload
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: [
                    '<%= settings.dirs.webroot %>/styles/*.css'
                ],
                tasks: ['useminPrepare', 'concat', 'cssmin', 'usemin']
            },
            vendor_styles: {
                files: [
                    '<%= settings.dirs.webroot %>/bower_components/bootstrap/less/*.less'
                ],
                tasks: ['less']
            },
            images: {
                files: [
                    '<%= settings.dirs.webroot %>/images/{,*/}*.png'
                ]
            },
            sources: {
                files: [
                    '<%= settings.dirs.webroot %>/{,*/}*.html'
                ]
            }
        }
    });
    
    // Load Grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take
    require('time-grunt')(grunt);

    
    // Tasks
    grunt.registerTask('default', ['build', 'connect', 'watch']);
    
    grunt.registerTask('build', [
        'clean',
        'bower-install',
        'useminPrepare',
        'copy',
        'less',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
    ]);
};
