(function () {
  'use strict';

  module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
      app: 'app',
      dist: 'dist'
    },
    // Options for JSON files (the same as jshint, but minus single quotes)
    jshintJSONOptions,
    /**
     * Gets the path to the deployable package.
     *
     * @return {String} the path to the deployable package.
     */
    getPackagePath = function getPackagePath() {
      return 'package/caturday-' + grunt.file.readJSON('package.json').version + '.zip';
    };

    // Set jshintJSONOptions to be the same as .jshintrc, execpt with the quotmark to be "double" in order to support valid JSON
    jshintJSONOptions = JSON.parse(require('fs').readFileSync('.jshintrc').toString());
    jshintJSONOptions.quotmark = 'double';

    grunt.initConfig({
      // Project settings
      config: config,

      // Version bump configuration
      bump: {
        options: {
          files: ['package.json', 'package-lock.json'],
          commit: false,
          createTag: false,
          push: false
        }
      },

      // Watches files for changes and runs tasks based on the changed files
      watch: {
        js: {
          files: ['<%= config.app %>/scripts/{,*/}*.js'],
          tasks: ['jshint:source', 'build']
        },
        html: {
          files: ['<%= config.app %>/{,*/}*.html'],
          tasks: ['build']
        },
        styles: {
          files: ['<%= config.app %>/styles/{,*/}*.css'],
          tasks: ['build']
        },
        manifests: {
          files: ['<%= config.app %>/manifest.json'],
          tasks: ['jshint:manifest','build']
        }
      },

      // Empties folders to start fresh
      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*',
              'package/*',
              '.tmp/*'
            ]
          }]
        }
      },

      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
        options: {
          reporterOutput: '',
          reporter: require('jshint-stylish')
        },
        manifest: {
          options: jshintJSONOptions,
          files: {
            src: ['<%= config.app %>/manifest.json']
          }
        },
        source: {
          options: {
            jshintrc: true
          },
          files: {
            src: [
              '<%= config.app %>/scripts/{,*/}*.js',
              '!<%= config.app %>/scripts/jquery.js',
              '!<%= config.app %>/scripts/bootstrap.js'
            ]
          }
        },
        gruntfile: {
          options: {
            jshintrc: true
          },
          files: {
            src: ['Gruntfile.js']
          }
        }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
        options: {
          dest: '<%= config.dist %>'
        },
        html: [
          '<%= config.app %>/popup.html'
        ]
      },

      // Performs rewrites based on rev and the useminPrepare configuration
      usemin: {
        options: {
          assetsDirs: ['<%= config.dist %>']
        },
        html: ['<%= config.dist %>/{,*/}*.html'],
        css: ['<%= config.dist %>/styles/{,*/}*.css']
      },

      // Used to minifiy the HTML
      htmlmin: {
        dist: {
          options: {
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true
          },
          files: [{
            expand: true,
            cwd: '<%= config.dist %>',
            src: '*.html',
            dest: '<%= config.dist %>'
          }]
        }
      },

      // Copies remaining files to places other tasks can use
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              'manifest.json',
              'images/{,*/}*.{webp,gif,png}',
              '{,*/}*.html',
              '_locales/{,*/}*.json'
            ]
          }]
        }
      },

      // Increment the build number and prepare for packaging
      chromeManifest: {
        dist: {
          options: {
            buildnumber: 'both',
            indentSize: 2,
            background: {/*There is no background script to run*/}
          },
          src: '<%= config.app %>',
          dest: '<%= config.dist %>'
        }
      },

      // Compres dist files to package
      compress: {
        dist: {
          options: {
            archive: getPackagePath
          },
          files: [{
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: ''
          }]
        }
      }
    });


    ////////////////////////////////////////////////////////////////////////////
    // GRUNT TASK DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////
    //
    // 'debug'
    // Constantly performs builds when deployable artifacts change
    grunt.registerTask('debug', function () {
      grunt.task.run([
        'build',
        'watch'
      ]);
    });

    //
    // 'build'
    // Creates a static build, suitable for testing
    grunt.registerTask('build', [
      'useminPrepare',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      'usemin',
      'htmlmin'
    ]);

    //
    // 'release'
    // Creates a build artifact, suitable for publishing to the Chrome Developer Dashboard
    grunt.registerTask('release', [
      // Check the code
      'jshint:source',
      'jshint:gruntfile',
      'jshint:manifest',
      // Clean the workspace
      'clean',
      // Perform a build
      'build',
      // Build a deployable asset
      'compress'
    ]);

    //
    // 'version-bump'
    // Bumps the 'patch' version component in the manifest and the package.json file.
    grunt.registerTask('version-bump', ['bump:patch', 'chromeManifest']);

    //
    // '' or 'default'
    // The default task; creates a build after validating code through jshint
    grunt.registerTask('default', [
      'jshint:source',
      'jshint:gruntfile',
      'jshint:manifest',
      'build'
    ]);
  };

})();
