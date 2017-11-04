'use strict';

// 
// dependencies
// 
var gulp = require('gulp'),
    plugins = require('./gulp-plugins.js');

// config vars
var projectName = require('./package.json').name,
    mode = plugins.gutil.env.dist === true ? 'dist' : 'dev', // set mode from gulp flag. $gulp --dist
    server = plugins.gutil.env.server === true ? true : false, // set server from gulp flag. $gulp --server
    cssSupport = '> 3%'; // gulp-autoprefixer

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
            templates: '',
            static: 'static/',
            sass: 'scss/',
            fonts: 'fonts/',
            css: 'css/',
            img: 'img/',
            icons:  'icons/',
            js: 'js/',
            config: 'config/'
        };

        // paths (dev, dist)
        this.sass = this.dirs.src + this.dirs.sass;
        this.fonts = this.dirs.dest + this.dirs.fonts;
        this.css = this.dirs.dest + this.dirs.css;
        this.img = this.dirs.dest + this.dirs.img;
        this.icons = this.img + this.dirs.icons;
        this.js = this.dirs.dest + this.dirs.js;
        this.config = this.dirs.dest + this.dirs.config;
        this.templates = this.dirs.dest + this.dirs.templates;
        
        // server paths
        this.server =  {
            fonts: paths.dirs.server + paths.dirs.fonts,
            css: paths.dirs.server + paths.dirs.css,
            img: paths.dirs.server + paths.dirs.img,
            icons: paths.dirs.server + paths.dirs.img + paths.dirs.icons,
            js: paths.dirs.server + paths.dirs.js,
            templates: paths.dirs.server + paths.dirs.templates
        };
    }
}

// initialize paths
paths.init(mode);

// server configuration
var authFile = require('./app/config/auth.json'),
    serverConfig  = plugins.ftp.create({
        host: authFile.host,
        port: authFile.port,
        user: authFile.user,
        password: authFile.password,
        parallel: 10,
        // log: null
        log: plugins.gutil.log
    });

// server upload streams 
function serverUpload(source, uploadPath) {

    gutil.log(gutil.colors.green('uploading files to server!! -> ' + source));

    // set sourse
    var setSource = function () {
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
    var lazyPipe = lazypipe().pipe(setSource).pipe(checkNewer).pipe(uploadFiles);

    return lazyPipe();
}

// server delete streams 
function serverDelete(source) {
    serverConfig.delete(source, function() {
        gutil.log(gutil.colors.red('deleting files from server!! -> ' + source));
    });
}

var config = {
    projectName: projectName,
    cssSupport: cssSupport,
    mode: mode,
    paths: paths,
    functions: {
        // require task
        getTask: function(gulp, task, plugins, config) {
            return require('./gulp-tasks/' + task)(gulp, task, plugins, config);
        },
        // task end notifications
        taskEnd: function(task) {
            plugins.gutil.log(plugins.gutil.colors.green('----- [\'' + task.toUpperCase() + '\'] ' + mode + ' task finished!! -----'));
        },
        // error handling
        handleError: function (error) {
            plugins.gutil.log(plugins.gutil.colors.red('ERROR!!:' + error.toString));
            this.emit('end');
        }
    },
    server: {
        mode: server,
        auth: './app/config/auth.json',
        config: '',
        upload: function(source, path) {
        },
        delete: function(source) {
        }
    },
}

// log configuration
plugins.gutil.log(plugins.gutil.colors.yellow(
    '\n--------\n' +
    'CONFIG' +
    '\n--------\n' +
    'projectName = ' +  config.projectName + '\n' +
    'cssSupport = ' +  config.cssSupport + '\n' +
    'mode = ' +  config.mode + '\n' +
    'server = ' +  config.server.mode + '\n' +

    '\n--------\n' +
    'PATHS' +
    '\n--------\n' +
    'sass path = ' + config.paths.sass + '\n' +
    'fonts path = ' + config.paths.fonts + '\n' +
    'css path = ' + config.paths.css + '\n' +
    'img path = ' + config.paths.img + '\n' +
    'icons path = ' + config.paths.icons + '\n' +
    'js path = ' + config.paths.js + '\n' +
    'config path = ' + config.paths.config + '\n' +
    'templates path = ' + config.paths.templates + '\n' +
    'server fonts path = ' + config.paths.server.fonts + '\n' +
    'server css path = ' + config.paths.server.css + '\n' +
    'server img path = ' + config.paths.server.img + '\n' +
    'server icons path = ' + config.paths.server.icons + '\n' +
    'server js path = ' + config.paths.server.js + '\n' +
    'server templates path = ' + config.paths.server.templates + 
    '\n--------'
));

module.exports = config;