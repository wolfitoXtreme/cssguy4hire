'use strict';

// fonts uploading
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            return gulp.src(config.paths.fonts + '*.+(eot|svg|ttf|woff)')
                .pipe(plugins.newer(config.paths.fonts))
    
                .on('end', function(){
                    
                    // log task
                    config.functions.taskEnd(task);

                    // server operations
                    if(config.server.mode) {
                        config.server.upload(config.paths.fonts + '*.+(eot|svg|ttf|woff)', config.paths.server.fonts);
                    }
                });
        });
    }
}