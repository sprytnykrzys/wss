var grunt = require('grunt');

grunt.initConfig({
    'http-server': {
        dev: {
         root: 'build',
         port: 8282,
         host: "localhost",
         showDir : true,
         autoIndex: true,
         ext: "html",
         runInBackground: true
        },
        prod: {
          root: 'build',
          port: 8282,
          host: "localhost",
          showDir : true,
          autoIndex: true,
          ext: "html",
          runInBackground: false
        }
    },
    concat: {
        options: {
            banner: "(function () { 'use strict';\n",
            separator: ';',
            footer: "})();"
        },
        dev: {
             src: ['src/otherScripts/*.js', 'src/services/*.js', 'src/controllers/**/*.js', 'src/directives/*.js'],
             dest: 'build/js/app.js'
        }
    },
    copy: {
        index: {
             src: 'src/index.html',
             dest: 'build/index.html',
        },
        templates: {
             src: '**/*.html',
             dest: 'build/views/',
             cwd: 'src/views',
             expand: true
        },
        css: {
            src: 'css/**/*',
            cwd: 'src',
            dest: 'build/',
            expand: true
        },
        images: {
            src: 'img/**/*',
            cwd: 'src',
            dest: 'build/',
            expand: true
        },
        deps: {
             src: 'bower_components/**/*',
             dest: 'build/'
        }
    },
    //jshint: {
    //    all: ['Gruntfile.js', 'src/**/*.js']
    //},
    watch: {
        scripts: {
            files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.html'],
            tasks: ['default']
       },
       options: {
           livereload: true
       }
    },
    clean: ["build"]
});

grunt.loadNpmTasks('grunt-http-server');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['clean'/*, 'jshint'*/, 'concat', 'copy']);
grunt.registerTask('develop', ['default', 'http-server:dev', 'watch']);

