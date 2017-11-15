'use strict';

// images minification
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {

            return gulp.src(config.paths.img + 'src/*.+(jpg|png|svg)')
                .pipe(plugins.newer(config.paths.img))
                .pipe(plugins.imagemin([
                    plugins.imagemin.gifsicle({
                        interlaced: true
                    }),
                    plugins.jpegrecompress({
                        accurate: true,
                        quality: 'low',
                        min: 5,
                        max: 30
                    }),
                    plugins.imagemin.optipng({
                        optimizationLevel: 5 // 0 - 7
                    }),
                    plugins.imagemin.svgo({
                        plugins: [
                            {removeViewBox: false},
                            {cleanupIDs: false}
                        ]
                    })
                ]))
                .pipe(gulp.dest(config.paths.img))

                .on('end', function(){
                    
                    // log task
                    config.functions.taskEnd(task);

                    // server operations
                    if(config.server.mode) {
                        config.server.upload(config.paths.img + '*.+(jpg|png|svg)', config.paths.server.img);
                    }
                });
        });
    }
}