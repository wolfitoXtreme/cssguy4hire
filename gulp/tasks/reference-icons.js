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

            // filtering file name
            var renameFile = function(file, t) {
                var fileName = file.path.slice(file.path.lastIndexOf('\\') + 1, file.path.lastIndexOf('-src'));
                console.log('renaming -> ' + fileName);
                
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
