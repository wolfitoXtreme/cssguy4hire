'use strict';

var Swiper = require('swiper'),
    panelNav = require('./panelNav');

// 
// Sliders
//
var slider = {
    init: function() {
        this.sliders = $('.js-slider');
        this.swipers = {};
        this.arrow =    '<a href="#" class="slider-arrows__arrow">' +
                           '<svg class="slider-arrows__icon" width="0" height="0">' +
                               '<use xlink:href="#icon-slider-arrow" />' +
                           '</svg>' +
                        '</a>',
        this.arrowTexts = ['previous', 'next'],
        this.arrowsWrapper = $('<div class="slider-arrows" />'),
        this.options = {
            wrapperClass: 'js-slider',
            // slideClass: 'slider__item',
            loop: true,
            direction: 'horizontal',
            setWrapperSize: false, // for flexbox compability fallback
            speed: 400,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            resistance: true,
            resistanceRatio: 0.85,
            spaceBetween: 0,
            keyboard: true,
            effect :'slide' // slide, fade, cube, coverflow or flip
        };

        // compose navigation arrows
        var prevText = this.arrowTexts[0],
            nextText = this.arrowTexts[1],
            $arrowPrev = $(slider.arrow).clone(),
            $arrowNext = $(slider.arrow).clone(),
            $arrows = slider.arrowsWrapper.append(
                $arrowPrev,
                $arrowNext
            );

        $arrowPrev.attr('title', prevText).append(prevText);
        $arrowNext.attr('title', nextText).addClass('slider-arrows__arrow--next').append(nextText);

        // initialize slider instances
        this.sliders.each(function(i) {
            var sliderIndex = i + 1,
                sliderClassName = 'slider-container-' + sliderIndex,
                $sliderArrows = $arrows.clone(),
                $sliderPrev = $sliderArrows.children().first(),
                $sliderNext = $sliderArrows.children().last(),
                sliderOptions = slider.options;

            // wrap slider and add class names
            $(this)./*addClass('swiper-wrapper').*/wrap('<div class="swiper-container slider-container ' + sliderClassName + '" />');
            $(this).children().addClass('swiper-slide');

            // add navigation arrows
            $(this).after($sliderArrows);

            // add navigation 
            sliderOptions.navigation = {
                nextEl: $sliderNext,
                prevEl: $sliderPrev
            };

            console.log('children length = ' + $(this).children().length);
            console.log('slider_' + sliderIndex);

            // initialize swiper
            slider.swipers['slider_' + sliderIndex] = new Swiper('.' + sliderClassName, sliderOptions);

            // add focusable elements to PanelNav
            console.log('panelNav.focusables = ' + panelNav.focusables.length);
            panelNav.focusables = panelNav.focusables.add([$sliderPrev[0], $sliderNext[0]]);
        });

        console.log('sliders.length = ' + this.sliders.length);
        console.log('sliders swipers.length = ' + slider.swipers.length);
        console.log('slider.swipers.slider_1 = ' + slider.swipers.slider_1);
    }
}

module.exports = slider;