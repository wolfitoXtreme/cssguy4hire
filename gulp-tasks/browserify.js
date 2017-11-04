'use strict';

// browseryfy
module.exports = function(gulp, task, plugins, config) {
    return function() {

        return plugins.browserify(config.paths.js + 'dev/main.js',{
                debug: false
            })
            .bundle()
            .on('error', config.functions.handleError)
            .pipe(plugins.source('app.js'))
            .pipe(gulp.dest(config.paths.js))
            
            .on('end', function(){
                // log task
                config.functions.taskEnd(task);
                
                // server operations
                // if(server) {
                //     serverUpload(config.paths.js + 'app.js', config.paths.server.js);
                // }
            });
    }
};
