'use strict';

// compass
module.exports = function(gulp, task, plugins, config) {
    
    return function() {

        gulp.task(task, function () {

            // filtering destination of files
            var destFile = function(file, t) {
                var fileName = file.path.slice(file.path.lastIndexOf('\\') + 1, file.path.lastIndexOf('.')),
                    destination = fileName !== 'reference' ? config.paths.css : config.paths.reference + 'css/';
                
                // log processed file
                plugins.gutil.log(plugins.gutil.colors.yellow('compass: processing -> ' + file.path));
                
                return t.through(gulp.dest, [destination]);
            };

            // allow writing of source maps
            var writeMaps = config.mode === 'dist' || config.server.mode ? false : true;

            console.log('config.mode =>' + config.mode + ' config.server.mode =>' + config.server.mode + ' writeMaps =>' + writeMaps);

            return gulp.src(config.paths.sass + '**/*.scss')
                // source maps initialization
                .pipe(plugins.sourcemaps.init())
                
                .pipe(plugins.compass({
                        file: config.paths.sass + '**/*.scss',
                        outputStyle: config.mode !== 'dist' && !config.server.mode ? 'expanded' : 'compressed' // nested, expanded, compact, compressed
                    })
                    .on('error', function(error){
                        config.functions.handleError(task, error, this);
                    })
                )

                // source maps
                .pipe(plugins.gulpif(writeMaps, plugins.sourcemaps.write()))

                // autoprefixer
                .pipe(plugins.autoprefixer(config.cssSupport))

                // destination
                .pipe(plugins.tap(destFile))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                    
                    // server operations
                    if(config.server.mode) {
                        config.server.upload(config.paths.css + '*.css', config.paths.server.css);
                    }
                });
        });
    };
};