'use strict';

// browsersync
module.exports = function(gulp, task, plugins, config) {
    
    return function() {

        gulp.task(task, function () {
            
            var files = [
                config.paths.templates + '*.html',
                config.paths.js + '*.js',
                config.paths.css + '*.css'
            ];

            plugins.browserSync.init(files, {
                server: {
                    baseDir: './app',
                    index: '/index.html' //need to specify this
                }
            });
        });
    }
}