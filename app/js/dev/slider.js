'use strict';

var throttle = require('lodash/throttle'),
    debounce = require('lodash/debounce'),
    slick = require('slick'),
    panelNav = require('./panelNav');

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
    // adaptiveHeight: true,
    centerMode: false,
    centerPadding: 0,
    mobileFirst: true,
    responsive: [],
    prevArrow:  '<a href="#" class="slider-arrows__arrow">' +
                   '<svg class="slider-arrows__icon" width="0" height="0">' +
                        '<use xlink:href="#ui-icon-slider-arrow" />' +
                    '</svg>' +
                    'previous' + 
                '</a>',
    nextArrow: '<a href="#" class="slider-arrows__arrow slider-arrows__arrow--next">' +
                   '<svg class="slider-arrows__icon" width="0" height="0">' +
                        '<use xlink:href="#ui-icon-slider-arrow" />' +
                    '</svg>' + 
                    'next' + 
                '</a>'
}

// 
// Sliders
//
var slider = {
    init: function() {
        this.sliders = $('.js-slider');

        this.sliders.each(function(i) {
            
            var $slider = $(this),
                settings = $slider.data('slider-settings'),
                responsive = [],
                breakpoints = typeof settings !== 'undefined' ? settings.breakpoints : null;

            $slider.options = options;

            // if there are any breakpoints defined
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
            
            // $slider.on('init', function(slick) {
            
            //     $slider.data('slides', $slider.find('.slick-slide'));

            //     console.log('slides = > ' + $slider.data('slides').length);
            // }).slick($slider.options);

            // slider methods
            $slider.on('init', function(slick) {
                
                var $items = $(this).find('li'),
                    $arrowsContainer = $('<div class="slider-arrows" />'),
                    $focusables = $(':focusable', this).add($items);

                // wrap slider arrows inside a container
                $(this).children('.slider-arrows__arrow').appendTo($arrowsContainer);
                $arrowsContainer.appendTo($(this))

                // set tab navigation (calling panelNav method)
                panelNav.tabNavigation($focusables);
            });

            // initialize slider
            $slider.slick($slider.options);
        });

        // initialize methods
        slider.resize(slider.sliders);
        slider.matchSize(slider.sliders);
    },

    // update panel navigation on resize
    resize: function(sliders) {
        $(window).on({
            'resize.slider.debounce': debounce(
                function() {
                    $(sliders).slick('setPosition');
                    slider.matchSize(sliders);
                }
            , 200),
            'resize.slider.throttle': throttle(
                function() { 
                    $(sliders).slick('setPosition');
                    slider.matchSize(sliders);
                }
            , 100)
        });
    },

    // resize panels and container to match window size
    matchSize: function(sliders) {
        $(sliders).each(function(i) {

            var $currentSlider = $(this),
                $slides = $currentSlider.find('.slick-slide'),
                slideHeight = 0;

            $slides.css('height', 'auto');

            $slides.each(function(j) {
                slideHeight = ($(this).height() > slideHeight) ? $(this).height() : slideHeight;
            });

            $slides.css('height', slideHeight + 'px');
        });
    }
}

module.exports = slider;