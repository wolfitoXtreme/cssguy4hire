'use strict';

// dependencies
var gulp = require('gulp'),
    
    // browserify task
    browserify = require('browserify'),

    // svgstore task
    svgstore = require('gulp-svgstore'),
    gulpCheerio = require('gulp-cheerio'),
    cheerio = require('cheerio'),
    through2 = require('through2'),
    inject = require('gulp-inject'),
    
    // image tasks
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    imageSize = require('image-size'),

    // compass tasks
    compass = require('gulp-sass'),
    jsonSass = require('json-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    // browserSync
    browserSync = require('browser-sync'),

    // server task
    ftp = require( 'vinyl-ftp' ),

    // utilities
    fs = require('fs'),
    source = require('vinyl-source-stream'),
    lazypipe = require('lazypipe'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'), // multiple files comparison
    changed = require('gulp-changed'), // single file and content comparison
    path = require('path'),
    del = require('del'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util');

// project settings
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

// config
var mode = gutil.env.dist === true ? 'dist' : 'dev', // set mode from gulp flag. $gulp --dist
    server = gutil.env.server === true ? true : false; // set server from gulp flag. $gulp --server

// paths
var paths = {
    init: function(mode) {
        // dirs
        this.srcDir = 'app/';
        this.destDir = mode === 'dev' ? this.srcDir : 'dist/';
        this.serverDir = '/test/';
        this.templatesDir = '';
        this.staticDir = 'static/';
        this.sassDir = 'scss/';
        this.fontsDir = 'fonts/'
        this.cssDir = 'css/';
        this.imgDir = 'img/';
        this.iconsDir =  'icons/';
        this.jsDir = 'js/'
        this.configDir = 'config/';

        // paths (dev, dist)
        this.sassPath = this.srcDir + this.sassDir;
        this.fontsPath = this.destDir + this.fontsDir;
        this.cssPath = this.destDir + this.cssDir;
        this.imgPath = this.destDir + this.imgDir;
        this.iconsPath = this.imgPath + this.iconsDir;
        this.jsPath = this.destDir + this.jsDir;
        this.configPath = this.destDir + this.configDir;
        this.templatesPath = this.destDir + this.templatesDir;

        // paths (server)
        this.server_fontsPath = this.serverDir + this.fontsDir;
        this.server_cssPath = this.serverDir + this.cssDir;
        this.server_imgPath = this.serverDir + this.imgDir;
        this.server_iconsPath = this.server_imgPath + this.iconsDir;
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
            'iconsPath = ' + this.iconsPath + '\n' +
            'jsPath = ' + this.jsPath + '\n' +
            'configPath = ' + this.configPath + '\n' +
            'templatesPath = ' + this.templatesPath + '\n' +
            'server = ' + server + '\n' +
            'server_fontsPath = ' + this.server_fontsPath + '\n' +
            'server_cssPath = ' + this.server_cssPath + '\n' +
            'server_imgPath = ' + this.server_imgPath + '\n' +
            'server_iconsPath = ' + this.server_iconsPath + '\n' +
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
    gutil.log(gutil.colors.green('----- [' + taskName.toUpperCase() + '] ' + mode + ' task finished!! -----'));
}

// get current task name
gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
    this.currentTask = task;
    this.__runTask(task);
}

// server configuration
var authFile = require('./app/config/auth.json'),
    serverConfig  = ftp.create({
        host: authFile.host,
        port: authFile.port,
        user: authFile.user,
        password: authFile.password,
        parallel: 10,
        // log: null
        log: gutil.log
    });

// server upload streams 
function serverUpload(source, uploadPath) {

    gutil.log(gutil.colors.green('uploading files to server!! -> ' + source));

    // set sourse
    var setSorce = function () {
        return gulp.src(source);
    }

    // check for new files
    var checkNewer = function () {
        return serverConfig.newer(uploadPath);
    }

    // upload files to server
    var uploadFiles = function() {
        return serverConfig.dest(uploadPath);
    }

    // lazypipe
    var lazyPipe = lazypipe().pipe(setSorce).pipe(checkNewer).pipe(uploadFiles);

    return lazyPipe();
}

// server delete streams 
function serverDelete(source) {
    serverConfig.delete(source, function() {
        gutil.log(gutil.colors.red('deleting files from server!! -> ' + source));
    });
}

// 
// DEVELOPMENT TASKS
// 

    // compass
    gulp.task('compass', ['sass-vars'],  function () {

        var taskName = this.currentTask.name;

        return gulp.src(paths.sassPath + '**/*.scss')
            // compass-sourcemaps
            .pipe(sourcemaps.init())
            .pipe(compass({
                    file: paths.sassPath + '**/*.scss',
                    outfile: paths.cssPath
                })
                .on('error', compass.logError)
            )
            .pipe(sourcemaps.write())

            // autoprefixer
            .pipe(autoprefixer(cssSupport))

            // destination
            .pipe(gulp.dest(paths.cssPath))

            .on('end', function(){
                // log task
                taskEnd(taskName);
                
                // server operations
                if(server) {
                    serverUpload(paths.cssPath + '*.css', paths.server_cssPath);
                }
            });

    });

        // sass vars from JSON
        gulp.task('sass-vars', function(callback) {
            runSequence(['breakpoints-sass-vars', 'icon-sass-vars', 'image-sass-vars'],
                callback
            );
        });
        
            // breakpoints sass vars from JSON
            gulp.task('breakpoints-sass-vars', function() {

                var taskName = this.currentTask.name;

                return fs.createReadStream(paths.configPath + 'breakpoints.json')
                    .pipe(jsonSass({
                        prefix: '$breakpoints: '
                     }))
                    .pipe(source(paths.configPath + 'breakpoints.json'))
                    .pipe(rename('_breakpoints.scss'))
                    .pipe(gulp.dest(paths.sassPath + 'config/'))

                    .on('end', function(){
                        // log task
                        taskEnd(taskName);
                    });
            });

            // icon sass vars from JSON
            gulp.task('icon-sass-vars', function() {

                var taskName = this.currentTask.name;

                return fs.createReadStream(paths.configPath + 'icons.json')
                    .pipe(jsonSass({
                        prefix: '$icons: '
                     }))
                    .pipe(source(paths.configPath + 'icons.json'))
                    .pipe(rename('_icons.scss'))
                    .pipe(gulp.dest(paths.sassPath + 'config/'))

                    .on('end', function(){
                        // log task
                        taskEnd(taskName);
                    });
            });

            // image sass vars from JSON
            gulp.task('image-sass-vars', function() {
                
                var taskName = this.currentTask.name;

                return fs.createReadStream(paths.configPath + 'images.json')
                    .pipe(jsonSass({
                        prefix: '$imgs: '
                     }))
                    .pipe(source(paths.configPath + 'images.json'))
                    .pipe(rename('_images.scss'))
                    .pipe(gulp.dest(paths.sassPath + 'config/'))

                    .on('end', function(){
                        // log task
                        taskEnd(taskName);
                    });
            });

    // svg icons
    gulp.task('svg-icons', function (callback) {
        runSequence(['svg-store', 'svg-icons-data', 'svg-icons-reference'],
            callback
        );
    });

        // svg store
        gulp.task('svg-store', function () {
            
            var taskName = this.currentTask.name;

            return gulp.src(paths.iconsPath + 'src/*.svg')
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
                .pipe(rename('icons.svg')) // renaming since output name is directory based
                .pipe(gulp.dest(paths.iconsPath))
                
                .on('end', function(){
                    // log task
                    taskEnd(taskName);
                    
                    // server operations
                    if(server) {
                        serverUpload(paths.iconsPath + 'icons.svg', paths.server_iconsPath);
                    }
                });
        });

        // icons data
        gulp.task('svg-icons-data', ['svg-store'], function () {

            var taskName = this.currentTask.name;

            return gulp.src(paths.imgPath + 'icons/icons.svg')
                .pipe(through2.obj(function (file, encoding, cb) {

                    // set empty iconsData object
                    var iconsData = {};

                    // extract data from source file
                    var $ = cheerio.load(file.contents.toString(), {xmlMode: true});

                    // get each icon properties
                    $('svg > symbol').map(function () {
                        var iconName = $(this).attr('id'),
                            iconSize = $(this).attr('viewbox').split(' ');

                        iconsData[iconName] = iconSize[2] + 'px ' + iconSize[3] + 'px';
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

                    // run browserify and compass to refresh icons inclusion
                    gulp.start(['browserify', 'compass']);
                });
        });

        // icons reference
        gulp.task('svg-icons-reference', ['svg-icons-data'], function () {
            
            var taskName = this.currentTask.name;

            // build HTML from JSON file
            function buildDemoHtml(file) {
                
                var iconsDemo = '',
                    icons = JSON.parse(file.contents);

                for(var icon in icons) {

                    var iconDimensions =  icons[icon].split(' '),
                        iconWidth = iconDimensions[0],
                        iconHeight = iconDimensions[1];
                    
                    var iconHTML = 
                        '<div class="icons__icon">'  + 
                            '<div class="icon-image">' + 
                                '<svg class="icon-image__svg" style="width: ' + iconWidth + '; height:' + iconHeight + ';">' +
                                '<use xlink:href="#' + icon + '" />' +
                                '</svg>' +
                            '</div>' +
                            '<div class="icon-details">' + 
                                '<div class="icon-details__name">' + icon + '</div>' + 
                                '<div class="icon-details__size">' + iconWidth + ' - ' + iconHeight + '</div>' + 
                            '</div>' +
                        '</div>';

                    iconsDemo += iconHTML;
                }

                iconsDemo = '<div class="icons">' + iconsDemo + '</div>';

                return iconsDemo;
            }

            return gulp.src(paths.imgPath + 'reference-templates/icons-reference-src.html')
                
                // inject SVG sprites
                .pipe(inject(gulp.src(paths.iconsPath + 'icons.svg'), {
                    transform: function (filepath, file) {
                      return file.contents.toString();
                    }
                }))

                // inject generated demo
                .pipe(inject(gulp.src(paths.configPath + 'icons.json'), {
                    transform: function (filepath, file) {
                      return buildDemoHtml(file);
                    }
                }))

                .pipe(rename('icons-reference.html'))
                .pipe(gulp.dest(paths.iconsPath))

                // log task
                .on('end', function(){taskEnd(taskName);});

        });

    // images
    gulp.task('images', function (callback) {
        runSequence(['image-min', 'image-data', 'image-reference'],
            callback
        );
    });

        // image-min
        gulp.task('image-min', function () {
            var taskName = this.currentTask.name;

            return gulp.src(paths.imgPath + 'src/*.+(jpg|png|svg)')
                .pipe(newer(paths.imgPath))
                .pipe(imagemin([
                    imagemin.gifsicle({
                        interlaced: true
                    }),
                    jpegrecompress({
                        accurate: true,
                        quality: 'low',
                        min: 5,
                        max: 30
                    }),
                    imagemin.optipng({
                        optimizationLevel: 5 // 0 - 7
                    }),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ]))

                .pipe(gulp.dest(paths.imgPath))

                .on('end', function(){
                    
                    // log task
                    taskEnd(taskName);

                    // server operations
                    if(server) {
                        serverUpload(paths.imgPath + '*.+(jpg|png|svg)', paths.server_imgPath);
                    }
                });
        });

        // image data
        gulp.task('image-data', ['image-min'], function () {

            var taskName = this.currentTask.name;

            // set empty imgData object
            var imgData = {};
            
            // get image properties
            var getImgProps = {
                imgProps: function(image) {
                    
                    // get current image size
                    var size = imageSize(image);
                    
                    this.img = image.slice(image.lastIndexOf('\\') + 1).split('.');
                    this.imgName = this.img[0];
                    this.imgExt = this.img[1];
                    this.imgWidth = size.width;
                    this.imgHeight = size.height;

                    return this;
                }
            }

            // store image properties into a Json file and pass it as a stream
            var storeImgData = function(stream, imgData) {
                
                var jsonFile = new gutil.File({
                    path: 'images.json',
                    contents: new Buffer(JSON.stringify(imgData))
                });
                stream.push(jsonFile);
            }

            return gulp.src(paths.imgPath + '*.+(jpg|png|svg)')

                .pipe(through2.obj(function (file, encoding, cb) {

                    var currentImage = getImgProps.imgProps(file.history.toString());

                    // set current image data
                    imgData[currentImage.imgName] = 
                        currentImage.imgWidth + 'px ' + 
                        currentImage.imgHeight + 'px ' + 
                        currentImage.imgExt;

                    cb(null, storeImgData(this, imgData));
                }))
                .pipe(gulp.dest(paths.configPath))
                
                // log task
                .on('end', function(){
                    taskEnd(taskName);

                    // run browserify and compass to refresh icons inclusion
                    gulp.start(['browserify', 'compass']);
                });
        });

        // image reference
        gulp.task('image-reference', ['image-data'], function () {
            
            var taskName = this.currentTask.name;

            // build HTML from JSON file
            function buildDemoHtml(file) {
                
                var imagesDemo = '',
                    imgs = JSON.parse(file.contents);
                                
                for(var img in imgs) {

                    var imgName = img,
                        imgData =  imgs[img].split(' '),
                        imgSrc = imgName + '.' + imgData[2],
                        imgWidth = imgData[0],
                        imgHeight = imgData[1];
                    
                    var imgHTML = 
                        '<div class="images__img">'  + 
                            '<div class="image">' + 
                                '<a href="' + imgSrc + '" target="_blank" class="image__link">' + 
                                    '<img class="image__img" src="' + imgSrc + '" width="' + imgWidth + '" height="' + imgHeight + '">' +
                                '</a>' +
                            '</div>' +
                            '<div class="image-details">' + 
                                '<div class="image-details__name">' + img + '</div>' + 
                                '<div class="image-details__src">(' + imgSrc + ')</div>' + 
                                '<div class="image-details__size">' + imgWidth + ' - ' + imgHeight + '</div>' + 
                            '</div>' +
                        '</div>';

                    imagesDemo += imgHTML;
                }

                imagesDemo = '<div class="images">' + imagesDemo + '</div>';

                return imagesDemo;
            }

            return gulp.src(paths.imgPath + 'reference-templates/imgs-reference-src.html')

                // inject generated demo
                .pipe(inject(gulp.src(paths.configPath + 'images.json'), {
                    transform: function (filepath, file) {
                      return buildDemoHtml(file);
                    }
                }))

                .pipe(rename('imgs-reference.html'))
                .pipe(gulp.dest(paths.imgPath))

                // log task
                .on('end', function(){taskEnd(taskName);});
        });

    // browseryfy
    gulp.task('browserify', function() {

        var taskName = this.currentTask.name;

        return browserify(paths.jsPath + 'dev/main.js',{
                debug: false
            })
            .bundle()
            .on('error', handleError)
            .pipe(source('app.js'))
            .pipe(gulp.dest(paths.jsPath))

            // log task
            .on('end', function(){
                // log task
                taskEnd(taskName);
                
                // server operations
                if(server) {
                    serverUpload(paths.jsPath + 'app.js', paths.server_jsPath);
                }
            });

    });

    // html change
    gulp.task('html', function() {

        var taskName = this.currentTask.name;

        return gulp.src([
                paths.templatesPath + '*.html'
            ])

            // log task
            .on('end', function(){
                // log task
                taskEnd(taskName);
                
                // server operations
                if(server) {
                    serverUpload(paths.templatesPath + '*.html', paths.server_templatesPath);
                }
            });
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
    gulp.task('watch', function (){

        // browserify
        gulp.watch([
            paths.jsPath + 'dev/*.js'
        ], ['browserify']);
        
        // compass watcher
        gulp.watch(paths.sassPath + '**/*.scss', ['compass']);

        // svg icons watcher
        gulp.watch(paths.iconsPath + 'src/*.svg', ['svg-icons']);

        // images watcher
        gulp.watch(paths.imgPath + 'src/*.+(jpg|png|svg)', ['images']).on('change', function(event) {

            if (event.type === 'deleted') {
                var filePathFromSrc = path.relative(path.resolve('src'), event.path),
                    destFilePath = path.resolve('build', filePathFromSrc).replace('src\\', '');

                // delete files on server
                if(server) {
                    var removeFile = paths.server_imgPath + destFilePath.slice(destFilePath.lastIndexOf('\\') + 1);
                    serverDelete(removeFile);
                }

                // delete compiled files locally
                del.sync(destFilePath);

            }
        });

        // html watcher
        gulp.watch(paths.templatesPath + '*.html', ['html']);

    });

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

// 
// DISTRIBUTION TASKS
// 
