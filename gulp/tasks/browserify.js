'use strict';

// browseryfy
module.exports = function(gulp, task, plugins, config) {
    return function() {
       
        gulp.task(task, function () {
            
            // TODO - multiple bundles affect browserSync behavior (need to reload manually)
            var files = ['main.js', 'webfont.js'];
            // var files = ['main.js'];
            
            // change file name
            var setFile = function(file) {
                file = file === 'main.js' ? 'app.js' : file;
                return file;
            }

            return plugins.merge(files.map(function(file) {
               
               return plugins.browserify({
                        entries: config.paths.js + 'dev/' + file,
                        debug: false
                    })
                    .bundle()
                    .on('error', function(error){
                        config.functions.handleError(task, error, this);
                    })
                    .pipe(plugins.source(setFile(file)))
                    .pipe(gulp.dest(config.paths.js))

                    .on('end', function(){
                        // log task
                        config.functions.taskEnd(task);
                        
                        plugins.browserSync.reload();

                        // server operations
                        if(config.server.mode) {
                            config.server.upload(config.paths.js + setFile(file), config.paths.server.js);
                        }
                    });
            }));
        });
    }
};
