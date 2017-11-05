'use strict';

// icons tasks sequence
module.exports = function(gulp, task, plugins, config) {

    return function() {
        gulp.task(task, function(callback) {
            plugins.runSequence(['svg-icons-store', 'svg-icons-data', 'svg-icons-reference'],
                callback
            );
        });
    }
}