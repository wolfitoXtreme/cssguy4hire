'use strict';

var plugins = {
    // browserify task
    browserify: require('browserify'),

    // svgstore task
    svgstore: require('gulp-svgstore'),
    gulpCheerio: require('gulp-cheerio'),
    cheerio: require('cheerio'),
    through2: require('through2'),
    inject: require('gulp-inject'),

    // image tasks
    imagemin: require('gulp-imagemin'),
    jpegrecompress: require('imagemin-jpeg-recompress'),
    imageSize: require('image-size'),

    // compass tasks
    compass: require('gulp-sass'),
    jsonSass: require('json-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    autoprefixer: require('gulp-autoprefixer'),

    // browserSync
    browserSync: require('browser-sync'),

    // server task
    ftp: require( 'vinyl-ftp' ),

    // utilities
    tap: require('gulp-tap'),
    fs: require('fs'),
    buffer: require('vinyl-buffer'),
    source: require('vinyl-source-stream'),
    merge: require('merge-stream'),
    lazypipe: require('lazypipe'),
    rename: require('gulp-rename'),
    uglify: require('gulp-uglify'),
    gulpif: require('gulp-if'),
    newer: require('gulp-newer'), // multiple files comparison
    changed: require('gulp-changed'), // single file and content comparison
    path: require('path'),
    del: require('del'),
    runSequence: require('run-sequence'),
    gutil: require('gulp-util')
};

module.exports = plugins;