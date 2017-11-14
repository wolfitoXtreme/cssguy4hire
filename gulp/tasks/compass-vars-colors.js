'use strict';

// color SASS vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {

            return plugins.fs.createReadStream(config.paths.config + 'colors.json')
                .pipe(plugins.jsonSass({
                    prefix: '$colors: '
                 }))
                .pipe(plugins.source(config.paths.config + 'colors.json'))
                .pipe(plugins.rename('_colors.scss'))
                .pipe(gulp.dest(config.paths.sass + 'config/'))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });

    }
}
