'use strict';

// 
// Include SVG icons within the page
// 
var svgIcons = {
    init: function() {
        var placeholder = $('#svg-icons'),
            includeFile = 'img/' + placeholder.data('include') + '.svg';

        placeholder.load(includeFile);
    }
}

module.exports = svgIcons;