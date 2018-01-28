'use strict';

var Swiper = require('swiper');

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
        this.options = {
            wrapperClass: 'js-panels',
            slideClass: 'panel',
            direction: 'vertical',
            slidesPerView: 1,
            setWrapperSize: false, // for flexbox compability fallback
            speed: 400,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            resistance: true,
            resistanceRatio: 0.85,
            spaceBetween: 0,
            keyboard: true,
            effect :'slide', // slide, fade, cube, coverflow or flip
            mousewheel: {
                sensitivity: 10
            },
            on: {
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
                }
            }
        };
        this.mobileNav; // Store Mobile Nav here
        this.panelSwiper = new Swiper('.js-panels-container', panelNav.options);

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
}

module.exports = panelNav;