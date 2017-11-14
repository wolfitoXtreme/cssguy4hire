'use strict';

// generate images reference file
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            return gulp.src(config.paths.reference + 'templates/reference-ui-src.html')

                .pipe(plugins.rename('reference-ui.html'))
                .pipe(gulp.dest(config.paths.reference))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}