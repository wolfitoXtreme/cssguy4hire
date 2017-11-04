'use strict';

// breakpoints sass vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {

            return plugins.fs.createReadStream(config.paths.config + 'breakpoints.json')
                .pipe(plugins.jsonSass({
                    prefix: '$breakpoints: '
                 }))
                .pipe(plugins.source(config.paths.config + 'breakpoints.json'))
                .pipe(plugins.rename('_breakpoints.scss'))
                .pipe(gulp.dest(config.paths.sass + 'config/'))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });

    }
}
