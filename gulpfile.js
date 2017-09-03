'use strict';

// dependencies
var gulp = require('gulp'),
    
    // browserify task
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),

    // svgstore task
    svgstore = require('gulp-svgstore'),
    cheerio = require('gulp-cheerio'),
    
    // compass task
    compass = require('gulp-sass'),
    sassImportJson = require('gulp-sass-import-json'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    // browserSync
    browserSync = require('browser-sync'),

    // utilities
    
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util');

// project settings
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

// config
var mode,
    upload = false;

// paths
var paths = {
    init: function(mode) {
        // dirs
        this.srcDir = 'app/';
        this.destDir = mode === 'dev' ? this.srcDir : 'dist/';
        this.serverDir = '/undefined/';
        this.templatesDir = '';
        this.staticDir = 'static/';
        this.sassDir = 'scss/';
        this.fontsDir = 'fonts/'
        this.cssDir = 'css/';
        this.imgDir = 'img/';
        this.jsDir = 'js/';

        // paths (dev, dist)
        this.sassPath = this.srcDir + this.sassDir;
        this.fontsPath = this.destDir + this.fontsDir;
        this.cssPath = this.destDir + this.cssDir;
        this.imgPath = this.destDir + this.imgDir;
        this.jsPath = this.destDir + this.jsDir;
        this.templatesPath = this.destDir + this.templatesDir;

        // paths (server)
        this.server_fontsPath = this.serverDir + this.fontsDir;
        this.server_cssPath = this.serverDir + this.cssDir;
        this.server_imgPath = this.serverDir + this.imgDir;
        this.server_jsPath = this.serverDir + this.jsDir;
        this.server_templatesPath = this.serverDir + this.templatesDir;

        gutil.log(gutil.colors.yellow(
            '\n--------\n' +
            'PATHS' +
            '\n--------\n' +
            'sassPath = ' + this.sassPath + '\n' +
            'fontsPath = ' + this.fontsPath + '\n' +
            'cssPath = ' + this.cssPath + '\n' +
            'imgPath = ' + this.imgPath + '\n' +
            'jsPath = ' + this.jsPath + '\n' +
            'templatesPath = ' + this.templatesPath + '\n' +
            'server_fontsPath = ' + this.server_fontsPath + '\n' +
            'server_cssPath = ' + this.server_cssPath + '\n' +
            'server_imgPath = ' + this.server_imgPath + '\n' +
            'server_jsPath = ' + this.server_jsPath + '\n' +
            'server_templatesPath = ' + this.server_templatesPath + 
            '\n--------'
        ));
    }
}

// error handler
// to avoid watcher exits
function handleError(error) {
    gutil.log(gutil.colors.red('ERROR!!:' + error.toString));
    this.emit('end');
}

// server options
// server upload configuration will be here

// DEVELOPMENT TASKS

    // compass
    gulp.task('compass', function () {

        var taskName = this.seq.slice(0)[0];

        return gulp.src(paths.sassPath + '*.scss')
            // compass-sourcemaps
            .pipe(sourcemaps.init())
            .pipe(sassImportJson())
            .pipe(compass({
                    file: paths.sassPath,
                    outfile: paths.cssPath
                })
                .on('error', compass.logError)
            )
            .pipe(sourcemaps.write())

            // autoprefixer
            .pipe(autoprefixer(cssSupport))

            // destination
            .pipe(gulp.dest(paths.cssPath))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
        ;

    });

    // svg store
    gulp.task('svgstore', function () {
        mode = 'dev';
        paths.init(mode);

        var taskName = this.seq.slice(0)[0];

        return gulp.src(paths.imgPath + 'icons/*.svg')
            .pipe(svgstore({ inlineSvg: true }))
            
            // process resulting SVG sprites file
            .pipe(cheerio({
                
                // ensure visibility is none
                run: function ($) {
                    $('svg').attr({
                        'width': '0',
                        'height': '0'
                    }).attr('class', 'hidden');
                },

                // markup settings
                parserOptions: { 
                    xmlMode: true,
                    lowerCaseTags: true,
                    lowerCaseAttributeNames: true
                }
            }))

            .pipe(gulp.dest(paths.imgPath))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); });
    });


    //  browseryfy
    gulp.task('browserify', function() {

        var taskName = this.seq.slice(0)[0];

        return browserify('./app/js/dev/main.js')
            .bundle()
            .on('error', handleError)
            .pipe(source('app.js'))
            .pipe(gulp.dest('./app/js/'))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
        ;
    });

    // browserSync
    gulp.task('browserSync', function() {

        var files = [
            paths.templatesPath + '*.html',
            paths.jsPath + '*.js',
            paths.cssPath + '*.css'
        ];

        browserSync.init(files, {
            server: {
                baseDir: './app',
                index: '/' + paths.templatesDir + 'index.html' //need to specify this
           }
        });

    });

    // watch
    gulp.task('watch', ['browserSync', 'compass', 'browserify'], function (){

        // browserify
        gulp.watch([
            paths.jsPath + 'dev/*.js'
        ], ['browserify']);
        
        // compass watcher
        gulp.watch(paths.sassPath + '*.scss', ['compass']);

    });


    // default task
    gulp.task('default', function (callback) {
        mode = 'dev';
        paths.init(mode);
        
        runSequence(['watch'],
            callback
        );
    });


// DISTRIBUTION TASKS


