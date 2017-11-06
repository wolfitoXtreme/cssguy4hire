'use strict';

// 
// dependencies
// 
var gulp = require('gulp'),
    plugins = require('./gulp-plugins.js');

// config vars
var projectName = require('../package.json').name,
    authFile = require('../app/config/auth.json'), // server credentials
    mode = plugins.gutil.env.dist === true ? 'dist' : 'dev', // set mode from gulp flag. $gulp --dist
    server = plugins.gutil.env.server === true ? true : false, // set server from gulp flag. $gulp --server
    cssSupport = '> 3%';// gulp-autoprefixer

// 
// paths
// 
var paths = {
    init: function(mode) {
        // dirs
        this.dirs =  {
            src: 'app/',
            dest: (mode === 'dev') ? 'app/' : 'dist/',
            server: '/test/',
            js: 'js/',
            sass: 'scss/',
            css: 'css/',
            img: 'img/',
            icons:  'icons/',
            fonts: 'fonts/',
            templates: '',
            reference: 'reference/',
            config: 'config/'
        };

        // paths (dev, dist)
        this.js = this.dirs.dest + this.dirs.js;
        this.sass = this.dirs.src + this.dirs.sass;
        this.css = this.dirs.dest + this.dirs.css;
        this.img = this.dirs.dest + this.dirs.img;
        this.icons = this.img + this.dirs.icons;
        this.fonts = this.dirs.dest + this.dirs.fonts;
        this.templates = this.dirs.dest + this.dirs.templates;
        this.reference = this.dirs.dest + this.dirs.reference;
        this.config = this.dirs.dest + this.dirs.config;
        
        // server paths
        this.server =  {
            js: paths.dirs.server + paths.dirs.js,
            css: paths.dirs.server + paths.dirs.css,
            img: paths.dirs.server + paths.dirs.img,
            icons: paths.dirs.server + paths.dirs.img + paths.dirs.icons,
            fonts: paths.dirs.server + paths.dirs.fonts,
            templates: paths.dirs.server + paths.dirs.templates
        };
    }
}

// initialize paths
paths.init(mode);

// configuration
var config = {
    projectName: projectName,
    cssSupport: cssSupport,
    mode: mode,
    paths: paths,
    functions: {
        // require task
        getTask: function(gulp, task, plugins, config) {
            return require('./tasks/' + task)(gulp, task, plugins, config);
        },
        // task end notifications
        taskEnd: function(task) {
            plugins.gutil.log(plugins.gutil.colors.green('----- [\'' + task.toUpperCase() + '\'] ' + mode + ' task finished!! -----'));
        },
        // error handling
        handleError: function (task, error, stream) {
            plugins.gutil.log(plugins.gutil.colors.red(task.toUpperCase() + ' ERROR!!:' + error));
            stream.emit('end');
        }

    },
    server: {
        mode: server,
        auth: authFile,
        config: plugins.ftp.create({
            host: authFile.host,
            port: authFile.port,
            user: authFile.user,
            password: authFile.password,
            parallel: 10,
            // log: null
            log: plugins.gutil.log
        }),
        upload: function(source, path) {

            plugins.gutil.log(plugins.gutil.colors.green('uploading files to server!! -> ' + source));

            // set sourse
            var setSource = function () {
                return gulp.src(source);
            }

            // check for new files
            var checkNewer = function () {
                return config.server.config.newer(path);
            }

            // upload files to server
            var uploadFiles = function() {
                return config.server.config.dest(path);
            }

            // lazypipe
            var lazyPipe = plugins.lazypipe().pipe(setSource).pipe(checkNewer).pipe(uploadFiles);

            return lazyPipe();
        },
        delete: function(source) {
            config.server.config.delete(source, function() {
                plugins.gutil.log(plugins.gutil.colors.red('deleting files from server!! -> ' + source));
            });
        }
    }
}

// log configuration
plugins.gutil.log(plugins.gutil.colors.yellow(
    '\n--------\n' +
    'CONFIG' +
    '\n--------\n' +
    'projectName = ' +  config.projectName + '\n' +
    'mode = ' +  config.mode + '\n' +
    'server = ' +  config.server.mode + '\n' +
    'cssSupport = ' +  config.cssSupport + '\n' +

    '\n--------\n' +
    'PATHS' +
    '\n--------\n' +
    'js path = ' + config.paths.js + '\n' +
    'sass path = ' + config.paths.sass + '\n' +
    'css path = ' + config.paths.css + '\n' +
    'img path = ' + config.paths.img + '\n' +
    'icons path = ' + config.paths.icons + '\n' +
    'fonts path = ' + config.paths.fonts + '\n' +
    'templates path = ' + config.paths.templates + '\n' +
    'reference path = ' + config.paths.reference + '\n' +
    'config path = ' + config.paths.config + '\n' +
    '-- server --\n' +
    'server js path = ' + config.paths.server.js + '\n' +
    'server css path = ' + config.paths.server.css + '\n' +
    'server img path = ' + config.paths.server.img + '\n' +
    'server icons path = ' + config.paths.server.icons + '\n' +
    'server fonts path = ' + config.paths.server.fonts + '\n' +
    'server templates path = ' + config.paths.server.templates + 
    '\n--------'
));

module.exports = config;