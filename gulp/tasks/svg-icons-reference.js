'use strict';

// generate icons reference file
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, ['svg-icons-data'], function() {

            // build HTML from JSON file
            function buildDemoHtml(file) {
                
                var iconsDemo = '',
                    icons = JSON.parse(file.contents);

                for(var icon in icons) {

                    var iconDimensions =  icons[icon].split(' '),
                        iconWidth = iconDimensions[0],
                        iconHeight = iconDimensions[1];
                    
                    var iconHTML = 
                        '<div class="icons__icon">'  + 
                            '<div class="icon-image">' + 
                                '<svg class="icon-image__svg" style="width: ' + iconWidth + '; height:' + iconHeight + ';">' +
                                '<use xlink:href="#' + icon + '" />' +
                                '</svg>' +
                            '</div>' +
                            '<div class="icon-details">' + 
                                '<div class="icon-details__name">' + icon + '</div>' + 
                                '<div class="icon-details__size">' + iconWidth + ' - ' + iconHeight + '</div>' + 
                            '</div>' +
                        '</div>';

                    iconsDemo += iconHTML;
                }

                iconsDemo = '<div class="icons">' + iconsDemo + '</div>';

                return iconsDemo;
            }

            return gulp.src(config.paths.reference + 'templates/icons-reference-src.html')
                
                // inject SVG sprites
                .pipe(plugins.inject(gulp.src(config.paths.icons + 'icons.svg'), {
                    transform: function (filepath, file) {
                      return file.contents.toString();
                    }
                }))

                // inject generated demo
                .pipe(plugins.inject(gulp.src(config.paths.config + 'icons.json'), {
                    transform: function (filepath, file) {
                      return buildDemoHtml(file);
                    }
                }))

                .pipe(plugins.rename('icons-reference.html'))
                .pipe(gulp.dest(config.paths.reference))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });

    }
}
