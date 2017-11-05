'use strict';

// images tasks sequence
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function (callback) {
            plugins.runSequence(['images-min', 'images-data', 'images-reference'],
                callback
            );
        });
    }
}