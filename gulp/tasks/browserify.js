'use strict';

// browseryfy
module.exports = function(gulp, task, plugins, config) {
    return function() {
       
        gulp.task(task, function () {

            // filtering destination of files
            var destFile = function(file, t) {
                var fileName = file.path.slice(file.path.lastIndexOf('\\') + 1, file.path.lastIndexOf('.')),
                    destination = fileName !== 'reference' ? config.paths.js : config.paths.reference + 'js/';
               
                console.log('destination for -> ' + fileName);
                
                return t.through(gulp.dest, [destination]);
            }

            return gulp.src([
                        config.paths.js + 'dev/app.js', 
                        config.paths.js + 'dev/webfont.js',
                        config.paths.js + 'dev/reference.js'
                ], {read: false})
                .pipe(plugins.tap(function (file) {
                    plugins.gutil.log(plugins.gutil.colors.yellow('bundle -> ' + file.path));
                    // replace file contents with browserify's bundle stream
                    file.contents = plugins.browserify(file.path, {
                            debug: false
                        }).bundle().on('error', function(error){
                            config.functions.handleError(task, error, this);
                        }
                    );

                }))
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
    }
};
