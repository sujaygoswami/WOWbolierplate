'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var fs = require('fs');
var config = require('./config.json');


gulp.task('serve', ['styles','vendorStyles','headjs','mainjs','vendorjs','bowerfont','coffee'], function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: [config.app],      
      routes: {
        '/bower_components': 'bower_components'
      },
    },
    files: ['app/*.html'],
    rewriteRules: [
        {
            match: /@include\("(.+?)"\)/g,
            fn: function (match, filename) {
                if (fs.existsSync(filename)) {
                    return fs.readFileSync(filename);
                } else {
                    return '<span style="color: red">'+filename+' could not be found</span>';
                }
            }
        }
    ],
    open: "external",
  });

  // watch for changes
  gulp.watch([
    config.app+'/*.html',
    config.app+'/**/*.css',
    config.compile_js+'**/*.js',
    config.compile_js+'**/*.coffee',
    config.images+'**/*',
  ]).on('change', reload);
  gulp.watch(config.app+'/**/*.scss', ['styles','vendorStyles']);
  gulp.watch(config.scripts+'**/*.js', ['mainjs']);
  gulp.watch(config.scripts+'**/*.coffee', ['coffee']);
});

gulp.task('serve:dist',function  () {
  browserSync({
    notify: false,
    port: 9001,
     server: {
      baseDir: [config.dist]
    },
    open: "external",
  });
});

gulp.task('serve:server',function  () {
  browserSync({
    notify: false,
    port: 9002,
     server: {
      baseDir: [config.p_server]
    },
    open: "external",
  });
});

gulp.task('serve:client',function  () {
  browserSync({
    notify: false,
    port: 9003,
     server: {
      baseDir: [config.p_client]
    },
    open: "external",
  });
});


