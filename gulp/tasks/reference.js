'use strict';

// reference tasks sequence
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function (callback) {
            plugins.runSequence(['reference-icons', 'reference-imgs', 'reference-ui'],
                callback
            );
        });
    }
}