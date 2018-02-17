'use strict';

var Swiper = require('swiper'),
    panelNav = require('./panelNav'),
    skillsRating = require('./skillsRating'),
    onScreenTest = require('./onScreenTest');

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
        this.moving = false;
        this.options = {
            wrapperClass: 'js-slider',
            direction: 'horizontal',
            loop: 1,
            slidesPerView: 'auto',
            spaceBetween: 0,
            watchSlidesProgress: true,
            setWrapperSize: false, // for flexbox compability fallback
            speed: 600,
            offsetRatio: 0.8, // custom property for swipe custom transformations
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            resistance: true,
            resistanceRatio: 0.85,
            keyboard: true,
            effect :'slide',
            on: {
                init: function () {
                    var $parentPanel = this.$el.closest('.panel');

                    console.log(
                        'slider event INIT ' + '\n' +
                        'panel class = ' + $parentPanel.attr('class') + '\n' +
                        'panel data = ' + $parentPanel.data('panel-rating-animation')
                    );

                },

                slideChange: function() {
                    console.log('slider event SLIDECHANGE');
                },

                sliderMove: function() {
                    var $parentPanel = this.$el.closest('.panel');

                    // Skills rating animation control only if matching panel
                    if($parentPanel.index() === panelNav.panelSwiper.activeIndex) {
                        skillsRating.skillsFill(this, false);
                    }

                    console.log('slider event slider MOVE.');
                },

                reachBeginning: function() {
                    console.log('slider event reach BEGINNING');
                },

                reachEnd: function() {
                    console.log('slider event reach END');
                },

                transitionStart: function() {
                    var $parentPanel = this.$el.closest('.panel');

                    console.log('slider event TRANSITION START');
                },

                transitionEnd: function() {

                    var $slides = this.slides,
                        $content = $slides.children('.slider__item-content'),
                        $parentPanel = this.$el.closest('.panel');

                    // avoids immediate changes on looped items
                    $content.css({
                        'transition-duration': ''
                    });

                    // Skills rating animation control only if matching panel
                    if($parentPanel.index() === panelNav.panelSwiper.activeIndex) {
                        skillsRating.skillsFill(this, true);
                    }

                    console.log(
                        'slider event TRANSITION END ' + '\n' +
                        'panel class = ' + $parentPanel.attr('class') + '\n' +
                        'panel data = ' + $parentPanel.data('panel-rating-animation') + '\n' +
                        'panelNav current panel = ' + panelNav.panelSwiper.activeIndex
                    );

                },

                slideChangeTransitionStart: function() {
                    console.log('slider event slideChangeTransition START');
                },

                slideChangeTransitionEnd: function() {
                    console.log(
                        'test end -- slider event slideChangeTransition END \n' +
                        'slider is = ' + this.$el.attr('class')
                    );
                },

                progress: function(progress){

                    var swiperWidth = this.width;

                    for (var i = 0; i < this.slides.length; i++){
                        var $slide = this.slides.eq(i),
                            $content = $slide.children('.slider__item-content'),
                            slideProgress = this.slides[i].progress;

                        // transform slides
                        slider.transformSlide($slide, $content, this, swiperWidth, slideProgress);
                    }
                }
            }
        };

        // set slider in 'panelNav'
        panelNav.slider = this;

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
                $parentPanel = $(this).closest('.panel'),
                $sliderArrows = $arrows.clone(),
                $sliderPrev = $sliderArrows.children().first(),
                $sliderNext = $sliderArrows.children().last(),
                sliderOptions = slider.options;

            // wrap slider and add class names
            $(this).wrap('<div class="swiper-container slider-container ' + sliderClassName + '" />');
            $(this).children().addClass('swiper-slide');

            // add navigation arrows
            $(this).after($sliderArrows);

            // add navigation 
            sliderOptions.navigation = {
                nextEl: $sliderNext,
                prevEl: $sliderPrev
            };

            console.log('children length = ' + $(this).children().length);

            // initialize swiper
            slider.swipers['slider_' + sliderIndex] = new Swiper('.' + sliderClassName, sliderOptions);

            // add focusable elements to PanelNav
            panelNav.focusables = panelNav.focusables.add([$sliderPrev[0], $sliderNext[0]]);
            console.log('panelNav.focusables = ' + panelNav.focusables.length);

            // store created swiper into parent panel, for Skills rating animation
            if($parentPanel.is('.panel--skills')) {
                console.log('is .panel--skills: ' + $parentPanel.attr('class'));
                $parentPanel.data('panel-rating-animation', slider.swipers['slider_' + sliderIndex]);
            }

        });
    },

    // transform slides according to their individual progress
    transformSlide: function($slide, $content, swiper, swiperWidth, slideProgress) {

        var // dir = Math.sign(slideProgress), commnetd to honor MS Explorer 11 that do not support this method 
            dir = slideProgress > 0 ? 1 : slideProgress < 0 ? -1 : slideProgress,
            localProgress = parseFloat((1 - Math.min(Math.abs(slideProgress), 1)).toFixed(6)),
            transition = localProgress === 0 || localProgress === 1 ? true : false,
            offsetRatio = slider.options.offsetRatio,
            offsetAmount = (swiperWidth * offsetRatio), 

        // slide content transformations
        contentOffset = (((offsetAmount * localProgress) - offsetAmount) * -dir).toFixed(4),
        contentScale = localProgress,
        contentOpacity = contentScale;

        // $slide.attr({
        //     'data-scale': contentScale,
        //     'data-class-name-pos': $slide.index() + '||' + $content.attr('style') + '||' + localProgress + '||' + transition + '||' + slideProgress
        // });

        // return transformations
        var applyTransform = function(duration) {
            return {
                'transition-duration': duration + 'ms',
                'transform': 'scale(' + contentScale + ') translate3d(' + contentOffset + 'px, 0px, 0px)',
                'opacity': contentOpacity
            }
        }

        if(transition === false) {
            $content.css(applyTransform(0));
        }
        else {
            $content.css(applyTransform(slider.options.speed));
        }
        
        if($slide.index() === 3) {
            onScreenTest.test(
               'TEST SLIDER transformSlideS', [
                    'dir = ' + dir,
                    'offsetAmount = ' + offsetAmount,
                    'localProgress = ' + localProgress,
                    'contentOffset = ' + contentOffset,
                    'slideProgress = ' + slideProgress,
                    'swiperWidth = ' + swiperWidth,
                    'scale = ' + contentScale,
                    'transition = ' + transition,
                    // 'displace = ' + displace,
                    'slider.moving = ' + slider.moving
               ], false
            );
        }
    }
}

module.exports = slider;