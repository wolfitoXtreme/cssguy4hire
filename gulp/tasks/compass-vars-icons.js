'use strict';

// icon sass vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {
        
            return plugins.fs.createReadStream(config.paths.config + 'icons.json')
                .pipe(plugins.jsonSass({
                    prefix: '$icons: '
                 }))
                .pipe(plugins.source(config.paths.config + 'icons.json'))
                .pipe(plugins.rename('_icons.scss'))
                .pipe(gulp.dest(config.paths.sass + 'config/'))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}