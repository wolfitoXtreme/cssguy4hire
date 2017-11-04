'use strict';

// compass
module.exports = function(gulp, task, plugins, config) {
    
    return function() {

        gulp.task(task, ['compass-vars'], function () {
            
            return gulp.src(config.paths.sass + '**/*.scss')
                // compass-sourcemaps
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.compass({
                        file: config.paths.sass + '**/*.scss',
                        outfile: config.paths.css
                    })
                    .on('error', plugins.compass.logError)
                )
                .pipe(plugins.sourcemaps.write())

                // autoprefixer
                .pipe(plugins.autoprefixer(config.cssSupport))

                // destination
                .pipe(gulp.dest(config.paths.css))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                    
                    // server operations
                    // if(server) {
                    //     serverUpload(paths.cssPath + '*.css', paths.server_cssPath);
                    // }
                });
        });
    }
}