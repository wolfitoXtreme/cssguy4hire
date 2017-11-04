'use strict';

// create SVG sprites file
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {

            return gulp.src(config.paths.icons + 'src/*.svg')
                .pipe(plugins.svgstore({ inlineSvg: true }))
                
                // process resulting SVG sprites file
                .pipe(plugins.gulpCheerio({
                    
                    // ensure visibility is none
                    run: function ($) {
                        $('svg').attr({
                            'width': '0',
                            'height': '0'
                        }).attr('class', 'hidden');
                    },

                    // markup settings
                    parserOptions: { 
                        xmlMode: true,
                        lowerCaseTags: true,
                        lowerCaseAttributeNames: true
                    }
                }))
                .pipe(plugins.rename('icons.svg')) // renaming since output name is directory based
                .pipe(gulp.dest(config.paths.icons))
                
                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                    
                    // server operations
                    // if(server) {
                    //     serverUpload(config.paths.icons + 'icons.svg', paths.server_iconsPath);
                    // }
                });
        });

    }
}
