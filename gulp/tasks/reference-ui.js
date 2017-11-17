'use strict';

// generate images reference file
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, function () {


            // build font sizes HTML from JSON file
            var buildFontSizesHtml = function(file) {
                
                var fontSizesDemo = '',
                    fontSizes = JSON.parse(file.contents);
                                
                for(var size in fontSizes) {

                    var sizeName = size,
                        sizeValue =  fontSizes[size];
                    
                    var fontSizesHTML = 
                        '<div class="ref-fsizes__size">' + 
                            '<div class="ref-fsize-text font-size-' + sizeName + '">' + 
                                'Mauris auctor aliquam finibus. Vestibulum tincidunt magna.' +
                            '</div>' +
                            '<div class="ref-fsize-detail">' + 
                                '<div class="ref-fsize-detail__name">' + sizeName + '</div>' + 
                                '<div class="ref-fsize-detail__value">(' + sizeValue + ')</div>' + 
                            '</div>' +
                        '</div>';

                    fontSizesDemo += fontSizesHTML;
                }

                return fontSizesDemo;
            }

            // build colors HTML from JSON file
            var buildColorsHtml = function(file) {
                
                var colorsDemo = '',
                    colors = JSON.parse(file.contents);
                                
                for(var color in colors) {

                    var colorName = color,
                        colorValue =  colors[color];
                    
                    var colorsHTML = 
                        '<div class="ref-thumb-grid__item ref-thumb-grid__item--color">'  + 
                            '<div class="ref-thumb ref-thumb--color bg-color-' + colorName + '"></div>' + 
                            '<div class="ref-thumb-detail">' + 
                                '<div class="ref-thumb-detail__name">' + colorName + '</div>' + 
                                '<div class="ref-thumb-detail__value">(' + colorValue + ')</div>' + 
                            '</div>' +
                        '</div>';

                    colorsDemo += colorsHTML;
                }

                colorsDemo = '<div class="ref-thumb-grid ref-thumb-grid--colors">' + colorsDemo + '</div>';

                return colorsDemo;
            }

            return gulp.src(config.paths.reference + 'templates/reference-ui-src.html')

                // inject SVG sprites
                .pipe(plugins.inject(gulp.src(config.paths.icons + 'icons.svg'), {
                    transform: function (filepath, file) {
                      return file.contents.toString();
                    }
                }))

                // inject 'font-sizes' generated demo
                .pipe(plugins.inject(gulp.src(config.paths.config + 'font-sizes.json'), {
                    starttag: '<!-- inject:font-sizes -->',
                    transform: function (filepath, file) {
                      return buildFontSizesHtml(file);
                    }
                }))

                // inject 'default colors' generated demo
                .pipe(plugins.inject(gulp.src(config.paths.config + 'colors-default.json'), {
                    starttag: '<!-- inject:colors-default -->',
                    transform: function (filepath, file) {
                      return buildColorsHtml(file);
                    }
                }))

                // inject 'project colors' generated demo
                .pipe(plugins.inject(gulp.src(config.paths.config + 'colors.json'), {
                    starttag: '<!-- inject:colors -->',
                    transform: function (filepath, file) {
                      return buildColorsHtml(file);
                    }
                }))

                .pipe(plugins.rename('reference-ui.html'))
                .pipe(gulp.dest(config.paths.reference))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}