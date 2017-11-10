'use strict';

// browseryfy
module.exports = function(gulp, task, plugins, config) {
    return function() {
       
        gulp.task(task, function () {

            return gulp.src([
                        config.paths.js + 'dev/app.js', 
                        config.paths.js + 'dev/webfont.js'
                ], {read: false})
                .pipe(plugins.tap(function (file) {
                    console.log(file.path);
                    // replace file contents with browserify's bundle stream
                    file.contents = plugins.browserify(file.path, {
                            debug: false
                        }).bundle().on('error', function(error){
                            config.functions.handleError(task, error, this);
                        }
                    );

                }))
                .pipe(gulp.dest(config.paths.js))
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
