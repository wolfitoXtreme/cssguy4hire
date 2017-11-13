'use strict';

// generate images reference file
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        gulp.task(task, ['images-data'], function () {

            // build HTML from JSON file
            var buildDemoHtml = function(file) {
                
                var imagesDemo = '',
                    imgs = JSON.parse(file.contents);
                                
                for(var img in imgs) {

                    var imgName = img,
                        imgData =  imgs[img].split(' '),
                        imgSrc = imgName + '.' + imgData[2],
                        imgWidth = imgData[0],
                        imgHeight = imgData[1];
                    
                    var imgHTML = 
                        '<div class="images__img">'  + 
                            '<div class="image">' + 
                                '<a href="../img/' + imgSrc + '" target="_blank" class="image__link">' + 
                                    '<img class="image__img" src="../img/' + imgSrc + '" width="' + imgWidth + '" height="' + imgHeight + '">' +
                                '</a>' +
                            '</div>' +
                            '<div class="image-details">' + 
                                '<div class="image-details__name">' + img + '</div>' + 
                                '<div class="image-details__src">(' + imgSrc + ')</div>' + 
                                '<div class="image-details__size">' + imgWidth + ' - ' + imgHeight + '</div>' + 
                            '</div>' +
                        '</div>';

                    imagesDemo += imgHTML;
                }

                imagesDemo = '<div class="images">' + imagesDemo + '</div>';

                return imagesDemo;
            }

            return gulp.src(config.paths.reference + 'templates/reference-imgs-src.html')

                // inject generated demo
                .pipe(plugins.inject(gulp.src(config.paths.config + 'images.json'), {
                    transform: function (filepath, file) {
                      return buildDemoHtml(file);
                    }
                }))
                .pipe(plugins.rename('reference-imgs.html'))
                .pipe(gulp.dest(config.paths.reference))

                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}