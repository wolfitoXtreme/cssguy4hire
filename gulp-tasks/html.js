'use strict';

// get HTML changes
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            return gulp.src([
                    config.paths.templates + '*.html'
                ])

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                    
                    // server operations
                    if(config.server.mode) {
                        config.server.upload(config.paths.templates + '*.html', config.paths.server.templates);
                    }
                });
        });
    }
}