'use strict';

var throttle = require('lodash.throttle'),
    debounce = require('lodash.debounce'),
    slick = require('slick'),
    onScreenTest = require('./onScreenTest');

// 
// Panel navigation
//
var panelNav = {
    init: function() {
        this.wrapper = $('.js-panels-wrapper');
        this.panels = $('.panel', this.wrapper);

        // initialize resize
        panelNav.matchSize();
        panelNav.resize();

        // initialize carousel type panel navigation
        $(panelNav.wrapper).slick({
            dots: false,
            infinite: false,
            arrows: false,
            vertical: true,
            verticalSwiping: true,
        });
    },

    // update panel navigation on resize
    resize: function() {

        $(window).on({
            'resize.panelNav.debounce': debounce(
                function() {
                    $(panelNav.wrapper).slick('setPosition');
                }

            , 200),
            'resize.panelNav.throttle': throttle(
                function() { 
                    panelNav.matchSize();
                    $(panelNav.wrapper).slick('setPosition');
                }
            , 50)
        });
    },

    // resize panels and container to match window size
    matchSize: function() {

        var targetWidth = $('body').width(),
            targetHeight = window.innerHeight > $('body').height ? window.innerHeight : $('body').height();
    
        $(panelNav.panels).css({
            'width': targetWidth,
            'height': targetHeight
        });
    }
}

module.exports = panelNav;