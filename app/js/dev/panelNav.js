'use strict';

var throttle = require('lodash/throttle'),
    debounce = require('lodash/debounce'),
    slick = require('slick'),
    mousewheel = require('mousewheel');

// 
// Panel navigation
//
var panelNav = {
    init: function() {
        this.wrapper = $('.js-panels');
        this.panels = $('.panel', this.wrapper);

        // initialize resize
        panelNav.matchSize();
        panelNav.resize();

        // initialize mosewheel
        panelNav.mousewheel(panelNav.wrapper);

        // initialize carousel type panel navigation
        $(panelNav.wrapper).slick({
            dots: false,
            infinite: false,
            arrows: false,
            vertical: true,
            verticalSwiping: true,
            speed: 300,
            waitForAnimate: false
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
            , 100)
        });
    },

    // control panels with mousewheel
    mousewheel: function(panelWrapper) {

        panelWrapper.on({
            'mousewheel': function(event) {
                console.log('event.deltaY = ' + event.deltaY);
                
                if(event.deltaY < 0) {
                    $(panelNav.wrapper).slick('slickPrev');
                }
                else if(event.deltaY > 0) {
                     $(panelNav.wrapper).slick('slickNext');
                }

                console.log('slickCurrentSlide =' + $(panelNav.wrapper).slick('slickCurrentSlide'));
            }
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