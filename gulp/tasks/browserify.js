'use strict';

// browseryfy
module.exports = function(gulp, task, plugins, config) {
    return function() {
       
        gulp.task(task, function () {

            // filtering destination of files
            var destFile = function(file, t) {
                var fileName = file.path.slice(file.path.lastIndexOf('\\') + 1, file.path.lastIndexOf('.')),
                    destination = fileName !== 'reference' ? config.paths.js : config.paths.reference + 'js/';

                return t.through(gulp.dest, [destination]);
            };

            // allow compression
            var compressFiles = config.mode === 'dist' || config.server.mode ? true : false;

            console.log('config.mode =>' + config.mode + ' config.server.mode =>' + config.server.mode + ' compressFiles =>' + compressFiles);

            return gulp.src([
                        config.paths.js + 'dev/app.js', 
                        config.paths.js + 'dev/webfont.js',
                        config.paths.js + 'dev/reference.js',
                        config.paths.js + 'dev/loader.js'
                ], {read: false})
                .pipe(plugins.tap(function (file) {

                    // log processed file
                    plugins.gutil.log(plugins.gutil.colors.yellow('browseryfy: bundle -> ' + file.path));
                    
                    // replace file contents with browserify's bundle stream
                    file.contents = plugins.browserify(file.path, {
                            debug: false
                        }).bundle().on('error', function(error){
                            config.functions.handleError(task, error, this);
                        }
                    );

                }))

                // uglify
                .pipe(plugins.gulpif(compressFiles, plugins.buffer()))
                .pipe(plugins.gulpif(compressFiles, plugins.uglify({
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                })))

                .pipe(plugins.tap(destFile))
                
                // omit error already set by browserify
                .on('error', function(error){
                    this.emit('end');
                })

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);

                    // server operations
                    if(config.server.mode) {
                        config.server.upload(config.paths.js + '*.js', config.paths.server.js);
                    }
                });

        });
    };
};
