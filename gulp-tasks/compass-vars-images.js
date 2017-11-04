'use strict';

// image sass vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {
        
            return plugins.fs.createReadStream(config.paths.config + 'images.json')
                .pipe(plugins.jsonSass({
                    prefix: '$imgs: '
                 }))
                .pipe(plugins.source(config.paths.config + 'images.json'))
                .pipe(plugins.rename('_images.scss'))
                .pipe(gulp.dest(config.paths.sass + 'config/'))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}