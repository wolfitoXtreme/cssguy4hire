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
    
    // image tasks
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    imageSize = require('image-size'),

    // compass tasks
    compass = require('gulp-sass'),
    sassImportJson = require('gulp-sass-import-json'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    // browserSync
    browserSync = require('browser-sync'),

    // server
    ftp = require( 'vinyl-ftp' ),

    // utilities
    lazypipe = require('lazypipe'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util');

// project settings
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

// config
var mode = gutil.env.dist === true ? 'dist' : 'dev', // set mode from gulp flag. $gulp --dist
    upload = gutil.env.upload === true ? true : false; // set upload from gulp flag. $gulp --upload

// paths
var paths = {
    init: function(mode) {
        // dirs
        this.srcDir = 'app/';
        this.destDir = mode === 'dev' ? this.srcDir : 'dist/';
        this.serverDir = '/test/';
        this.templatesDir = '';
        this.staticDir = 'static/';
        this.sassDir = 'scss/**/';
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
    gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!'));
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

    // set sourse
    var setSorce = function () {
        return gulp.src(source);
    }

    // check for new files
    var checkNewer = function () {
        return serverConfig.newer(uploadPath);
    }

    // upload files
    var uploadFiles = function() {
        return serverConfig.dest(uploadPath);
    }

    // lazypipe
    var lazyPipe = lazypipe().pipe(setSorce).pipe(checkNewer).pipe(uploadFiles);

    return lazyPipe();
}

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
                    file: paths.sassPath + '*.scss',
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
                
                // upload files
                if(upload) {
                    serverUpload(paths.cssPath + '*.css', paths.server_cssPath);
                }
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
                    
                    // upload files
                    if(upload) {
                        serverUpload(paths.iconsPath + 'icons.svg', paths.server_iconsPath);
                    }
                });
        });

        // icons data
        gulp.task('svg-icons-data', ['svg-store'], function () {

            var taskName = this.currentTask.name;

            return gulp.src(paths.imgPath + '/icons/icons.svg')
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

        // icons reference
        gulp.task('svg-icons-reference', ['svg-icons-data'], function () {
            
            var taskName = this.currentTask.name;

            // build HTML from JSON file
            function buildDemoHtml(file) {
                
                var iconsDemo = '',
                    iconsData = JSON.parse(file.contents);

                for(var icon in iconsData.icons) {

                    var iconDimensions =  iconsData.icons[icon].split(' '),
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

            return gulp.src(paths.imgPath + '/*.+(jpg|png|svg)')
                .pipe(newer(paths.imgPath + 'test/'))
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
                // .pipe(gulp.dest(paths.imgPath))
                .pipe(gulp.dest(paths.imgPath + 'test/'))

                .on('end', function(){
                    // log task
                    taskEnd(taskName);
                    
                    // upload files
                    if(upload) {
                        serverUpload(paths.imgPath + '/*.+(jpg|png|svg)', paths.server_imgPath);
                    }
                });
        });

        // image data
        gulp.task('image-data', ['image-min'], function () {

            var taskName = this.currentTask.name;

            // set empty imgData object
            var imgData = {imgs: {}};
            
            // get image properties
            var getImgProps = function(image) {
                console.log('getting image info...');
                var size = imageSize(image), // get current image size
                    img = image.slice( // extract image file name
                        image.lastIndexOf('\\') + 1
                    ),
                    imgName = img.slice(0, img.lastIndexOf('.')),
                    imgWidth = size.width, // set image width
                    imgHeight = size.height; // set image height

                return [img, imgName, imgWidth, imgHeight];
            }

            // store image properties into a Json file and pass it as a stream
            var storeImgData = function(stream, imgData) {
                console.log('storeImgData reached, do something...');
                var jsonFile = new gutil.File({
                    path: 'images.json',
                    contents: new Buffer(JSON.stringify(imgData))
                });
                console.log('jsonFile = ' + jsonFile);
                stream.push(jsonFile);
            }

            return gulp.src(paths.imgPath + '/*.+(jpg|png|svg)')

                .pipe(through2.obj(function (file, encoding, cb) {
                    console.log('...' + Object.keys(file).length);
                    console.log('...' + file.history);

                    var imgProps = getImgProps(file.history.toString());

                    console.log(
                        'currentImg =' + file.history.toString() + '\n' +
                        'img =' + imgProps[0] + '\n' +
                        'imgName =' + imgProps[1] + '\n' +
                        'imgWidth =' + imgProps[2] + '\n' +
                        'imgHeight = ' + imgProps[3]
                    );

                    // set current image data
                    imgData.imgs[imgProps[1]] = imgProps[0] + ' ' + imgProps[2] + 'px ' + imgProps[3] + 'px';

                    console.log('current imgData is => ' + imgData.toString());

                    cb(null, storeImgData(this, imgData));
                }))
                .pipe(gulp.dest(paths.configPath))
                
                // log task
                .on('end', function(){
                    taskEnd(taskName);

                    // run browserify to refresh images inclusion
                    // gulp.start('browserify');
                });
        });

        // image reference
        gulp.task('image-reference', ['image-data'], function () {
            
            var taskName = this.currentTask.name;

            // build HTML from JSON file
            function buildDemoHtml(file) {
                
                var imagesDemo = '',
                    imagesData = JSON.parse(file.contents);
                
                console.log('building images demo...' + imagesData);
                
                for(var img in imagesData.imgs) {

                    var imgName = img,
                        imgData =  imagesData.imgs[img].split(' '),
                        imgSrc = imgData[0],
                        imgWidth = imgData[1],
                        imgHeight = imgData[2];

                    console.log(
                        'imgName = ' + imgName + '\n' + 
                        'imgSrc = ' + imgSrc + '\n' + 
                        'imgWidth = ' + imgWidth + '\n' + 
                        'imgHeight = ' + imgHeight
                    );
                    
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
                
                // upload files
                if(upload) {
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
                
                // upload files
                if(upload) {
                    serverUpload(paths.templatesPath + '*.html', paths.server_templatesPath);
                }
            });
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
        gulp.watch(paths.iconsPath + 'src/*.svg', ['svg-icons']);

        // html watcher
        gulp.watch(paths.templatesPath + '*.html', ['html']);

    });

    // default task
    gulp.task('default', [
        'browserify', 
        'compass', 
        'svg-icons',
        'html',
        'watch',
        'browserSync'
    ]);

// 
// DISTRIBUTION TASKS
// 
