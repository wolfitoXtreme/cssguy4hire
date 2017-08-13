
// dependencies
var gulp = require('gulp'),
    compass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util')
;

// project settings
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

//css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

// DEV or DIST mode
var mode,
    upload = false     
;

// paths
function setPaths(mode){
    // dirs
    srcDir = 'app/';
    destDir = mode === 'DEV' ? srcDir : 'dist/';
    serverDir = '/undefined/';
    templatesDir = '';
    staticDir = 'static/';
    sassDir = 'scss/';
    fontsDir = 'fonts/'
    cssDir = 'css/';
    imgDir = 'img/';
    jsDir = 'js/';

    // paths (dev, dist)
    sassPath = srcDir + sassDir;
    fontsPath = destDir + fontsDir;
    cssPath = destDir + cssDir;
    imgPath = destDir + imgDir;
    jsPath = destDir + jsDir;
    templatesPath = destDir + templatesDir;

    // paths (server)
    server_fontsPath = serverDir + fontsDir;
    server_cssPath = serverDir + cssDir;
    server_imgPath = serverDir + imgDir;
    server_jsPath = serverDir + jsDir;
    server_templatesPath = serverDir + templatesDir;

    gutil.log(gutil.colors.green(
        '\nPATHS\n' +
        'sassPath = ' + sassPath + '\n' +
        'fontsPath = ' + fontsPath + '\n' +
        'cssPath = ' + cssPath + '\n' +
        'imgPath = ' + imgPath + '\n' +
        'jsPath = ' + jsPath + '\n' +
        'templatesPath = ' + templatesPath + '\n' +
        'server_fontsPath = ' + server_fontsPath + '\n' +
        'server_cssPath = ' + server_cssPath + '\n' +
        'server_imgPath = ' + server_imgPath + '\n' +
        'server_jsPath = ' + server_jsPath + '\n' +
        'server_templatesPath = ' + server_templatesPath
    ));

};

// server options
// server upload configuration will be here

// DEVELOPMENT TASKS

    // compass
    gulp.task('compass', function () {

        var taskName = this.seq.slice(0)[0];

        return gulp.src(sassPath + '*.scss')
            // compass-sourcemaps
            .pipe(sourcemaps.init())
            .pipe(compass({
                file: sassPath,
                outfile: cssPath
            }).on('error', compass.logError))
            .pipe(sourcemaps.write())

            // autoprefixer
            .pipe(autoprefixer(cssSupport))

            // destination
            .pipe(gulp.dest(cssPath))

            // browserSync
            .pipe(browserSync.reload({
                stream: true
            }))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
        ;

    });

    // file Changes
    gulp.task('fileChange', function () {

        var taskName = this.seq.slice(0)[0];

        return gulp.src([
                templatesPath + '*.htm',
                jsPath + '*.js',
                cssPath + '*.*'
            ])
        
            //browserSync
            .pipe(browserSync.reload({
                stream: true
            }))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
        ;

    });

    // concat js
    gulp.task('concat', function() {

        var taskName = this.seq.slice(0)[0];

        var defaultAssets = gulp.src([
                jsPath + 'lib/jquery.min.js',
                jsPath + 'lib/modernizr.min.js',
                jsPath + 'lib/jquery.ba-throttle-debounce.min.js',
                jsPath + 'lib/TweenLite.min.js'
            ], {base: jsDir})
            .pipe(concat('lib.js', {newLine: ';'}))
            .pipe(gulp.dest(jsPath))

            // log task
            .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
        ;

    });


    // browserSync
    gulp.task('browserSync', function() {
        browserSync({
            server: {
                baseDir: ['./' + srcDir, templatesPath],
                index: '/' + templatesDir + 'index.htm' //need to specify this
            }
        });
    });

    // watch
    gulp.task('watch', ['browserSync', 'compass', 'concat'], function (){
        gulp.watch([
            templatesPath + '*.htm',
            jsPath + '*.js'
        ], ['fileChange']);
        gulp.watch(sassPath + '*.scss', ['compass']);
    });


    // default task
    gulp.task('default', function (callback) {
        mode = 'DEV';
        setPaths(mode);
        
        runSequence(['watch'],
            callback
        );
    });


// DISTRIBUTION TASKS


