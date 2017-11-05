'use strict';

// image sass vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {
        gulp.task(task, function(callback) {
            plugins.runSequence(['compass-vars-breakpoints', 'compass-vars-icons', 'compass-vars-images'],
                callback
            );
        });
    }
}