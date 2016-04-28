module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
			beforeconcat: ['js/*.js']
		},

        concat: {
            // 2. Configuration for concatinating files goes here.
                dist: {
                    src: [
                        'js/libs/*.js', // All JS in the libs folder
                        'js/global.js'  // This specific file
                    ],
                    dest: 'js/build/production.js',
                }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'images/',
		            src: ['*.{png,jpg,gif}'],
		            dest: 'images/build/'
		        }]
		    }
		},

		postcss: {
		    options: {
		          map: true,
		          processors: [
		             require('autoprefixer')({
		                 browsers: ['last 2 versions']
		             })
		          ]
		     },
		     dist: {
		          files: [{
				     expand: true,
				     flatten: true,
				     cwd: 'css/',
				     src: ['*.css'],
				     dest: 'css/release/'
            	  }]
		     }
        },


        cssmin: {
		  minify: {
		    files: [{
		      expand: true,
		      cwd: 'css/release/',
		      src: ['libs/*.css', '*.css'],
		      dest: 'css/minified/',
		      ext: '.min.css'
		    }]
		  },
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  combine: {
		    files: {
		      'css/build/style.min.css': ['css/minified/**/*.css']
		    }
		  }
		},

		watch: {
			options: {
			        livereload: true,
    		},
		    scripts: {
		        files: ['js/*.js'],
		        tasks: ['jshint', 'concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    css: {
			  files: ['css/*.css'],
			  tasks: ['postcss:dist', 'cssmin'],
			  options: {
			    spawn: false,
			  }
  			},
		    images: {
		      files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
		      tasks: ['imagemin'],
		      options: {
		        spawn: false,
		      }
  			},

  			html:{
			  files: ['./**/*.html'],
			  tasks: [],
			  options: {
			      spawn: false
			  }
  			}
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin', 'postcss:dist', 'cssmin']);
    grunt.registerTask('dev', ['watch']);

};