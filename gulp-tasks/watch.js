'use strict';

var gulpfile = require('../gulpfile');

// watch for changes
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            // browserify watcher
            gulp.watch([
                config.paths.js + 'dev/*.js'
            ], ['browserify']);
            
            // compass watcher
            gulp.watch(config.paths.sass + '**/*.scss', ['compass']);

            // svg icons watcher
            gulp.watch(config.paths.icons + 'src/*.svg', ['svg-icons']);

            // images watcher
            gulp.watch(config.paths.img + 'src/*.+(jpg|png|svg)', ['images']).on('change', function(event) {

                if (event.type === 'deleted') {
                    var filePathFromSrc = plugins.path.relative(plugins.path.resolve('src'), event.path),
                        destFilePath = plugins.path.resolve('build', filePathFromSrc).replace('src\\', '');

                    // delete files on server
                    if(config.server.mode) {
                        var removeFile = config.paths.server.img + destFilePath.slice(destFilePath.lastIndexOf('\\') + 1);
                        config.server.delete(removeFile);
                    }

                    // delete compiled files locally
                    plugins.del.sync(destFilePath);

                }
            });

            // html watcher
            gulp.watch(config.paths.templates + '*.html', ['html']);
        });
    }
}