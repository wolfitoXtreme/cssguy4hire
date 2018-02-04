'use strict';

var Swiper = require('swiper'),
    onScreenTest = require('./onScreenTest');

// 
// Panel navigation
//
var panelNav = {
    init: function() {
        this.wrapper =          $('.js-panels');
        this.panels =           $('.panel', this.wrapper);
        this.currentPanel =     0;
        this.panelLinks =       $('.js-nav-main-menu a');
        this.panelArrows =      $('.js-nav-panel-prev', panelNav.panels)
                                .add('.js-nav-panel-next', panelNav.panels);
        this.focusables =       $(':focusable', this.panels);
        this.mobileNav; // Store Mobile Nav here
        this.options = {
            wrapperClass: 'js-panels',
            slideClass: 'panel',
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 0,
            setWrapperSize: false, // for flexbox compability fallback
            speed: 400,
            offsetRatio: 0.15, // custom property for swipe custom transformations
            shortSwipes: false,
            longSwipesRatio: 0.1,
            longSwipesMs: 100,
            resistance: true,
            resistanceRatio: 0.85,
            keyboard: true,
            effect :'slide', // slide, fade, cube, coverflow or flip
            mousewheel: {
                sensitivity: 1
            },
            on: {
                init: function() {
                } ,

                slideChangeTransitionEnd: function() {
                    var currentPanel = panelNav.panelSwiper.activeIndex,
                        $panels = panelNav.panels;

                    console.log('swiper end change, current is = ' + currentPanel);

                    // set focus on focus dummy
                    // therefore allowing tab navigation from current panel
                    $panels.eq(currentPanel).children().filter(
                        function(index) {
                            return $(this).is('.js-focus-dummy');
                        }
                    ).focus();

                    // set current panel
                    panelNav.currentPanel = currentPanel;
                },

                progress: function(progress){
                    var swiperHeight = this.height;

                    for (var i = 0; i < this.slides.length; i++){
                        var $panel = this.slides.eq(i),
                            $foreground = $panel.children('.panel__detail'),
                            $logo = $('.site-heading', $foreground),
                            $heading = $('.panel-heading', $foreground).add('.nav-main-menu', $foreground),
                            $content = $('.panel-content', $foreground),
                            panelProgress = this.slides[i].progress;

                        // animate Panels
                        panelNav.animatePanels(
                            $panel, 
                            $foreground,
                            this, 
                            swiperHeight, 
                            panelProgress
                        );
                    }
                }
            }
        };
        this.panelSwiper = new Swiper('.js-panels-container', panelNav.options);

        // add dummy navigation focus 
        panelNav.panels.prepend($('<span class="js-focus-dummy hidden" tabindex="0" />'));
        panelNav.focusables = panelNav.focusables.add('.js-focus-dummy');

        // initialize methods
        panelNav.linkNavigation(this.panelLinks);
        panelNav.tabNavigation(this.focusables);
        panelNav.arrowNavigation();

        // set mobile panel links background colors
        this.panelLinks.each(function(i){
            var panelIndex =  $(this).parent().index();

            console.log('panelIndex = ' + panelIndex);

            $(this).parent().css({
                'background-color' : panelNav.panels.eq(panelIndex).css('background-color')
            });
        });

        console.log('panelNav, mobileNav = ' + this.mobileNav.isOpen);
    },

    // go to panel
    gotoPanel: function(leap, movement) {
        this.panelSwiper.slideTo(leap, panelNav.options.speed);

        console.log(
            '-------\n' +
            'PANELNAV - GOTO PANEL \n' + 
            'currentPanel = ' + panelNav.currentPanel + '\n' +
            'maxPanels = ' + panelNav.maxPanels + '\n' +
            'panelSpeed = ' + panelNav.panelSpeed + '\n' +
            'leap = ' + leap + '\n' +
            '-------\n'
        );
    },

    // link navigation
    linkNavigation: function(links) {
        var $links = links,
            mobileNav = this.mobileNav;
            
        $links.on({
            'click': function(event) {
                var $link = $(this),
                    linkIndex = $link.closest('li').index();
                
                event.preventDefault();

                console.log(
                    'linkNavigation, linkIndex = ' + linkIndex + '\n' +
                    'mobileNav.isOpen = ' + mobileNav.isOpen
                );

                if(!mobileNav.isOpen) {
                    panelNav.gotoPanel(linkIndex, 'linkNavigation');
                }
                else {
                    mobileNav.switchMenu(linkIndex);
                }
            }
        });
    },

    // tab navigation
    tabNavigation: function(focusables) {
        var $focusables = focusables;

        $focusables.on({
            'focus' : function(event){
                // reset scroll when navigating through tab key
                $('.js-panels-container').scrollTop(0);

                // Navigate to corresponding Panel
                setTimeout(function() {
                    var $target = $(event.target),
                        $parentPanel = $target.closest('.panel'),
                        parentIndex = $parentPanel.index(),
                        currentPanel = panelNav.currentPanel;

                    // if focused element not inside current panel 
                    if(parentIndex !== currentPanel) {
                        panelNav.gotoPanel(parentIndex, 'tabNavigation');
                    }

                    console.log('parentIndex = ' + parentIndex);

                }, 5);
            }
        });
    },

    // arrow navigation
    arrowNavigation: function() {
        // var $panelArrows = this.panelArrows,
        //     prevArrow = '.js-nav-panel-prev',
        //     nextArrow = '.js-nav-panel-next';

        // console.log('$panelArrows.length = ' + $panelArrows.length);

        // $panelArrows.on({
        //     'click': function(event) {
        //         event.preventDefault();

        //         var currentPanel = panelNav.currentPanel;

        //         // simulate active state on ENTER key press
        //         $(this).addClass('nav-panel__link--active');

        //         console.log('currentPanel is ' + currentPanel);

        //         if($(this).is(prevArrow)) {
        //             console.log('prev!!');
        //             panelNav.gotoPanel(currentPanel - 1, 'arrowNavigation');
        //         }
        //         else {
        //             console.log('next!!');
        //             panelNav.gotoPanel(currentPanel + 1, 'arrowNavigation');
        //         }
        //     }
        // });
    },

    // control panels with mousewheel
    mousewheel: function(panelWrapper) {

        // panelWrapper.on({
        //     'mousewheel': function(event) {
        //         console.log('event.deltaY = ' + event.deltaY);
                
        //         if(event.deltaY < 0) {
        //             panelNav.gotoPanel(parentIndex, 'tabNavigation');
        //         }
        //         else if(event.deltaY > 0) {
        //              panelNav.nextPanel();
        //         }

        //         // console.log('slickCurrentSlide =' + $(panelNav.wrapper).slick('slickCurrentSlide'));
        //     }
        // });
    },

    animatePanels: function(
        $panel, 
        $foreground,
        swiper, 
        swiperHeight, 
        panelProgress
    ) {

        var // dir = Math.sign(panelProgress), commnetd to honor MS Explorer 11 that do not support this method 
            dir = panelProgress > 0 ? 1 : panelProgress < 0 ? -1 : panelProgress,
            localProgress = parseFloat((1 - Math.min(Math.abs(panelProgress), 1)).toFixed(4)),
            transition = localProgress === 0 || localProgress === 1 ? true : false;


        // get offset
        var getOffset = function(offsetRatio, abs) {
            var offsetAmount = (swiperHeight * offsetRatio),
                offsetDir = abs === true ? Math.abs(dir) : dir,
                offset = (((offsetAmount * localProgress) - offsetAmount) * -offsetDir).toFixed(4);

            return offset;
        }

        // apply transformations
        var applyTransform = function(duration, transformations) {
            var transform;
            duration = transition === false ? 0 : duration;

            transform = { 'transition-duration': duration + 'ms', 'transform': transformations }

            return transform;
        }

        $foreground.css(applyTransform(
            panelNav.options.speed,
            'translate3d(0px, ' + getOffset(panelNav.options.offsetRatio, false) + 'px, 0px)' +
            'scale(' + localProgress + ')'
        ));


        if($panel.index() === 0) {
            onScreenTest.test(
               'TEST PANEL NAV SWIPER ANIMATIONS', [
                    '$panel = ' + $panel.attr('title'),
                    'panelProgress = ' + panelProgress,
                    'localProgress = ' + localProgress,
                    'dir = ' + dir,
                    'transition = ' + transition
               ], false
            );
        }
    }
}

module.exports = panelNav;