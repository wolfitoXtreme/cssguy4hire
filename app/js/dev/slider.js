'use strict';

var throttle = require('lodash/throttle'),
    debounce = require('lodash/debounce'),
    slick = require('slick');

// Default slider options
// If additional breakpoints configuration is needed, it will be passed as a data attribute
// e.g. data-slider-settings='{"breakpoints": [[320, {"dots": false}], [576, {"dots": true}]]}'
var options = {
    slidesToShow: 1,
    arrows: true,
    dots: false,
    dotsClass: '',
    infinite: true,
    speed: 500,
    centerMode: false,
    centerPadding: 0,
    mobileFirst: true,
    responsive: [],
    prevArrow: '<a href="#" class="">previous</a>',
    nextArrow: '<a href="#" class="">next</a>'
}

// 
// Sliders
//
var slider = {
    init: function() {
        
        this.sliders = $('.js-slider');

        slider.sliders.each(function(i) {
            
            var $slider = $(this),
                settings = $slider.data('slider-settings'),
                responsive = [],
                breakpoints = typeof settings !== 'undefined' ? settings.breakpoints : null;

            $slider.options = options;

            // if there are any breakpoins defined
            if(breakpoints) {
                console.log('breakpoints found!!');
                for (var breakpoint in breakpoints) {
                    var config = {};
                    config.breakpoint = breakpoints[breakpoint][0];
                    config.settings = breakpoints[breakpoint][1];

                    responsive.push(config);
                }
            }

            // set responsive options settings
            $slider.options.responsive = responsive;
            $slider.slick($slider.options);

        });

        slider.resize(slider.sliders);
    },

    // update panel navigation on resize
    resize: function(sliders) {
        $(window).on({
            'resize.slider.debounce': debounce(
                function() {
                    $(sliders).slick('setPosition');
                }
            , 200),
            'resize.slider.throttle': throttle(
                function() { 
                    $(sliders).slick('setPosition');
                }
            , 100)
        });
    },


    // resize panels and container to match window size
    matchSize: function() {

    }
}

module.exports = slider;