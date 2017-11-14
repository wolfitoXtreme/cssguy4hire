'use strict';

// font sizes SASS vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {

            return plugins.fs.createReadStream(config.paths.config + 'font-sizes.json')
                .pipe(plugins.jsonSass({
                    prefix: '$font-sizes: '
                 }))
                .pipe(plugins.source(config.paths.config + 'font-sizes.json'))
                .pipe(plugins.rename('_font-sizes.scss'))
                .pipe(gulp.dest(config.paths.sass + 'config/'))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });

    }
}
