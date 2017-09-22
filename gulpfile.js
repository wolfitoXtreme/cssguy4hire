'use strict';

// dependencies
var gulp = require('gulp'),
    
    // browserify task
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),

    // svgstore task
    svgstore = require('gulp-svgstore'),
    gulpCheerio = require('gulp-cheerio'),
    cheerio = require('cheerio'),
    through2 = require('through2'),
    inject = require('gulp-inject'),
    
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
var mode = gutil.env.dist === true ? 'dist' : 'dev', // set mode from gulp flag. ie. $gulp --dist
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
        this.jsDir = 'js/'
        this.configDir = 'config/';

        // paths (dev, dist)
        this.sassPath = this.srcDir + this.sassDir;
        this.fontsPath = this.destDir + this.fontsDir;
        this.cssPath = this.destDir + this.cssDir;
        this.imgPath = this.destDir + this.imgDir;
        this.jsPath = this.destDir + this.jsDir;
        this.configPath = this.destDir + this.configDir;
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
            'configPath = ' + this.configPath + '\n' +
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

// initialize paths
paths.init(mode);

// error handler
// to avoid watcher exits
function handleError(error) {
    gutil.log(gutil.colors.red('ERROR!!:' + error.toString));
    this.emit('end');
}

// task end notifications
function taskEnd(taskName) {
    gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!'));
}

// get current task name
gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
    this.currentTask = task;
    this.__runTask(task);
}


// server options
// server upload configuration will be here

// 
// DEVELOPMENT TASKS
// 

    // compass
    gulp.task('compass', ['svg-icons'], function () {

        var taskName = this.currentTask.name;

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
            .on('end', function(){taskEnd(taskName);});
    });

    // svg icons
    gulp.task('svg-icons', function (callback) {
        runSequence(['svg-store', 'svg-icons-data'],
            callback
        );
    });

    // svg store
    gulp.task('svg-store', function () {
        
        var taskName = this.currentTask.name;

        return gulp.src(paths.imgPath + 'icons/*.svg')
            .pipe(svgstore({ inlineSvg: true }))
            
            // process resulting SVG sprites file
            .pipe(gulpCheerio({
                
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
            .on('end', function(){taskEnd(taskName);});
    });

    // icons data
    gulp.task('svg-icons-data', ['svg-store'], function () {

        var taskName = this.currentTask.name;

        return gulp.src(paths.imgPath + 'icons.svg')
            .pipe(through2.obj(function (file, encoding, cb) {

                // set empty iconsData object
                var iconsData = {
                    icons: {}
                };

                // extract data from source file
                var $ = cheerio.load(file.contents.toString(), {xmlMode: true});

                // get each icon properties
                $('svg > symbol').map(function () {
                    var iconName = $(this).attr('id'),
                        iconSize = $(this).attr('viewbox').split(' ');

                    iconsData.icons[iconName] = iconSize[2] + 'px ' + iconSize[3] + 'px';
                }).get();

                // store properties into a Json file
                var jsonFile = new gutil.File({
                    path: 'icons.json',
                    contents: new Buffer(JSON.stringify(iconsData))
                });

                this.push(jsonFile);
                cb();
            }))
            .pipe(gulp.dest(paths.configPath))
            
            // log task
            .on('end', function(){
                taskEnd(taskName);

                // run browserify to refresh icons inclusion
                gulp.start('browserify');
            });
    });

    //  browseryfy
    gulp.task('browserify', function() {

        var taskName = this.currentTask.name;

        return browserify(paths.jsPath + 'dev/main.js')
            .bundle()
            .on('error', handleError)
            .pipe(source('app.js'))
            .pipe(gulp.dest(paths.jsPath))

            // log task
            .on('end', function(){taskEnd(taskName);});
    });

    // browserSync
    gulp.task('browserSync', function() {

        var files = [
            paths.templatesPath + '*.html',
            paths.jsPath + '*.js',
            paths.cssPath + '*.css',
            paths.imgPath + '*.svg'
        ];

        browserSync.init(files, {
            server: {
                baseDir: './app',
                index: '/' + paths.templatesDir + 'index.html' //need to specify this
           }
        });

    });

    // watch
    gulp.task('watch', function (){

        // browserify
        gulp.watch([
            paths.jsPath + 'dev/*.js'
        ], ['browserify']);
        
        // compass watcher
        gulp.watch(paths.sassPath + '*.scss', ['compass']);

        // svg icons watcher
        gulp.watch(paths.imgPath + 'icons/*.svg', ['svg-icons']);

    });

    // default task
    gulp.task('default', [
        'browserify', 
        'compass', 
        'svg-icons',
        'watch',
        'browserSync'
    ]);

// 
// DISTRIBUTION TASKS
// 
