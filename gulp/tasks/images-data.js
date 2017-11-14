'use strict';

// generate JSON images data from image files
module.exports = function(gulp, task, plugins, config) {
    
    return function() {
        
        gulp.task(task, ['images-min'], function () {

            // set empty imgData object
            var imgData = {};
            
            // get image properties
            var getImgProps = {
                imgProps: function(image) {
                    
                    // get current image size
                    var size = plugins.imageSize(image);
                    
                    this.img = image.slice(image.lastIndexOf('\\') + 1).split('.');
                    this.imgName = this.img[0];
                    this.imgExt = this.img[1];
                    this.imgWidth = size.width;
                    this.imgHeight = size.height;

                    return this;
                }
            }

            // store image properties into a JSON file and pass it as a stream
            var storeImgData = function(stream, imgData) {
                
                var jsonFile = new plugins.gutil.File({
                    path: 'images.json',
                    contents: new Buffer(JSON.stringify(imgData))
                });
                stream.push(jsonFile);
            }

            return gulp.src(config.paths.img + '*.+(jpg|png|svg)')

                .pipe(plugins.through2.obj(function (file, encoding, cb) {

                    var currentImage = getImgProps.imgProps(file.path);

                    // set current image data
                    imgData[currentImage.imgName] = 
                        currentImage.imgWidth + 'px ' + 
                        currentImage.imgHeight + 'px ' + 
                        currentImage.imgExt;

                    cb(null, storeImgData(this, imgData));
                }))
                .pipe(gulp.dest(config.paths.config))
                
                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                });
        });
    }
}