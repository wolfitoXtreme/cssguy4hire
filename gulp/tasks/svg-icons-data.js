'use strict';

// generate JSON icons data from SVG sprites file
module.exports = function(gulp, task, plugins, config) {

    return function() {

        gulp.task(task, ['svg-icons-store'], function() {

            return gulp.src(config.paths.icons + 'icons.svg')
                .pipe(plugins.through2.obj(function (file, encoding, cb) {

                    // set empty iconsData object
                    var iconsData = {};

                    // extract data from source file
                    var $ = plugins.cheerio.load(file.contents.toString(), {xmlMode: true});

                    // get each icon properties
                    $('svg > symbol').map(function () {
                        var iconName = $(this).attr('id'),
                            iconSize = $(this).attr('viewbox').split(' ');

                        iconsData[iconName] = iconSize[2] + 'px ' + iconSize[3] + 'px';
                    }).get();

                    // store properties into a Json file
                    var jsonFile = new plugins.gutil.File({
                        path: 'icons.json',
                        contents: new Buffer(JSON.stringify(iconsData))
                    });

                    this.push(jsonFile);
                    cb();
                }))
                .pipe(gulp.dest(config.paths.config))
                
                .on('end', function(){
                    // log task
                    config.functions.taskEnd(task);
                })
        });

    }
}
