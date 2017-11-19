'use strict';

// SASS vars from JSON
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {
            
            var files = ['icons', 'images', 'breakpoints', 'font-sizes', 'colors', 'colors-default'],
                processed = 0;

            return plugins.merge(files.map(function(file) {

                return plugins.fs.createReadStream(config.paths.config + file + '.json')
                    .pipe(plugins.jsonSass({
                        prefix: '$' + file + ': '
                    }))
                    .pipe(plugins.source(config.paths.config + file + '.json'))
                    .pipe(plugins.rename('_' + file + '.scss'))
                    .pipe(gulp.dest(config.paths.sass + 'config/'))

                    .on('end', function(){

                        processed += 1;
                        
                        // wait for all files to be processed
                        if(processed === files.length) {
                            // log task
                            config.functions.taskEnd(task);

                            // run 'compass' to reflect changes
                            gulp.start(['compass']);
                        }
                    });
            }));
        });


    }
}