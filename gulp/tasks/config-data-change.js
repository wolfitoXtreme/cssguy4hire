'use strict';

// get JSON configuration files changes
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            return gulp.src([
                    config.paths.config + '*.json'
                ])

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                    
                    // run 'browserify', 'compass-vars', and 'reference' to reflect changes
                    gulp.start(['browserify', 'compass-vars', 'reference']);
                });
        });
    }
}