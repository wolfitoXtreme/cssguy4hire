'use strict';

// 
// dependencies
// 
var gulp = require('gulp'),
    config = require('./gulp-config.js'),
    plugins = require('./gulp-plugins.js');

// 
// tasks
//

// browserify
gulp.task('browserify', config.functions.getTask(gulp, 'browserify', plugins, config));

// compass
gulp.task('compass', config.functions.getTask(gulp, 'compass', plugins, config));
    gulp.task('compass-vars', config.functions.getTask(gulp, 'compass-vars', plugins, config));
        gulp.task('compass-vars-breakpoints', config.functions.getTask(gulp, 'compass-vars-breakpoints', plugins, config));
        gulp.task('compass-vars-icons', config.functions.getTask(gulp, 'compass-vars-icons', plugins, config));
        gulp.task('compass-vars-images', config.functions.getTask(gulp, 'compass-vars-images', plugins, config));

// svg-icons
gulp.task('svg-icons', config.functions.getTask(gulp, 'svg-icons', plugins, config));
    gulp.task('svg-icons-store', config.functions.getTask(gulp, 'svg-icons-store', plugins, config));
    gulp.task('svg-icons-data', config.functions.getTask(gulp, 'svg-icons-data', plugins, config));
    gulp.task('svg-icons-reference', config.functions.getTask(gulp, 'svg-icons-reference', plugins, config));

// images
gulp.task('images', config.functions.getTask(gulp, 'images', plugins, config));
    gulp.task('images-min', config.functions.getTask(gulp, 'images-min', plugins, config));
    gulp.task('images-data', config.functions.getTask(gulp, 'images-data', plugins, config));
    gulp.task('images-reference', config.functions.getTask(gulp, 'images-reference', plugins, config));

// html
gulp.task('html', config.functions.getTask(gulp, 'html', plugins, config));

// watch
gulp.task('watch', config.functions.getTask(gulp, 'watch', plugins, config));

// browserSync
gulp.task('browserSync', config.functions.getTask(gulp, 'browserSync', plugins, config));

// default task
gulp.task('default', [
    'browserify',
    'compass', 
    'svg-icons',
    'images',
    'html',
    'watch',
    'browserSync'
]);

