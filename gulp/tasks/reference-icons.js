'use strict';

// generate icons reference for template files (reference-icons.html, reference-ui.html)
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, function() {

            // build HTML from JSON file
            var buildDemoHtml = function(file) {
                
                var iconsDemo = '',
                    icons = JSON.parse(file.contents);

                for(var icon in icons) {

                    var iconDimensions =  icons[icon].split(' '),
                        iconWidth = iconDimensions[0],
                        iconHeight = iconDimensions[1];
                    
                    var iconHTML = 
                        '<div class="ref-thumb-grid__item">'  + 
                            '<div class="ref-thumb ref-thumb--img">' + 
                                '<svg class="ref-thumb__item-img ref-thumb__item-img--icon" style="width: ' + iconWidth + '; height:' + iconHeight + ';">' +
                                '<use xlink:href="#' + icon + '" />' +
                                '</svg>' +
                            '</div>' +
                            '<div class="ref-thumb-detail">' + 
                                '<div class="ref-thumb-detail__name">' + icon + '</div>' + 
                                '<div class="ref-thumb-detail__value">' + iconWidth + ' - ' + iconHeight + '</div>' + 
                            '</div>' +
                        '</div>';

                    iconsDemo += iconHTML;
                }

                iconsDemo = '<div class="ref-thumb-grid">' + iconsDemo + '</div>';

                return iconsDemo;
            }

            // filtering file name
            var renameFile = function(file, t) {
                var fileName = file.path.slice(file.path.lastIndexOf('\\') + 1, file.path.lastIndexOf('-src'));

                return t.through(plugins.rename, [fileName + '.html']);
            }

            return gulp.src([
                    config.paths.reference + 'templates/reference-icons-src.html'
                ])
                
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

                .pipe(plugins.tap(renameFile))
                .pipe(gulp.dest(config.paths.reference))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });

    }
}
