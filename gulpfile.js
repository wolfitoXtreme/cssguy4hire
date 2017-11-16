'use strict';

// 
// dependencies
// 
var gulp = require('gulp'),
    config = require('./gulp/gulp-config.js'),
    plugins = require('./gulp/gulp-plugins.js');

// 
// tasks
//

// browserify
gulp.task('browserify', config.functions.getTask(gulp, 'browserify', plugins, config));

// compass
gulp.task('compass', ['compass-vars'], config.functions.getTask(gulp, 'compass', plugins, config));
    gulp.task('compass-vars', config.functions.getTask(gulp, 'compass-vars', plugins, config));

// svg-icons
gulp.task('svg-icons', config.functions.getTask(gulp, 'svg-icons', plugins, config));
    gulp.task('svg-icons-store', config.functions.getTask(gulp, 'svg-icons-store', plugins, config));
    gulp.task('svg-icons-data', ['svg-icons-store'], config.functions.getTask(gulp, 'svg-icons-data', plugins, config));
    // gulp.task('svg-icons-reference', ['svg-icons-data'], config.functions.getTask(gulp, 'svg-icons-reference', plugins, config));

// images
gulp.task('images', config.functions.getTask(gulp, 'images', plugins, config));
    gulp.task('images-min', config.functions.getTask(gulp, 'images-min', plugins, config));
    gulp.task('images-data', ['images-min'], config.functions.getTask(gulp, 'images-data', plugins, config));
    // gulp.task('images-reference', ['images-data'], config.functions.getTask(gulp, 'images-reference', plugins, config));

// watch
gulp.task('watch', config.functions.getTask(gulp, 'watch', plugins, config));

// browserSync
gulp.task('browserSync', config.functions.getTask(gulp, 'browserSync', plugins, config));

// fonts
gulp.task('fonts', config.functions.getTask(gulp, 'fonts', plugins, config));

// config data change
gulp.task('config-data-change', config.functions.getTask(gulp, 'config-data-change', plugins, config));

// reference files
gulp.task('reference', config.functions.getTask(gulp, 'reference', plugins, config));
    gulp.task('reference-imgs', config.functions.getTask(gulp, 'reference-imgs', plugins, config));
    gulp.task('reference-icons', config.functions.getTask(gulp, 'reference-icons', plugins, config));
    gulp.task('reference-ui', config.functions.getTask(gulp, 'reference-ui', plugins, config));


// html change
gulp.task('html', config.functions.getTask(gulp, 'html', plugins, config));

// default task
gulp.task('default', [
    'browserify',
    'compass', 
    'svg-icons',
    'images',
    'fonts',
    'html',
    'watch',
    'browserSync'
]);

