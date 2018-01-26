'use strict';

var enquire = require('enquire'),
    breakpoints = require('./breakpoints'),
    panelNav = require('./panelNav'),
    Swiper = require('swiper'),
    TweenLite = require('TweenLite'),
    TimelineLite = require('TimelineLite'),
    CSSPlugin = require('CSSPlugin'),
    onScreenTest = require('./onScreenTest');

// 
// Mobile Navigation Panel
// 
var mobileNav = {
    init: function() {
        this.header =               $('.js-header');
        this.panelsContainer =      $('.js-panels-container'); // swipper container created on 'domAdjust'
        this.panels =               $('.panel', this.panelsContainer).add(this.header);
        this.mobilePanel =          $('<nav class="nav-mobile swiper-container" />');
        this.mobilePanelWidth;
        this.mobileNavWrapper =     $('<div class="nav-mobile-wrapper swiper-wrapper" />');
        this.mobileNavInner =       $('<div class="nav-mobile-inner swiper-slide" />');
        this.mobileMenus =          $('.js-nav-main-menu').add('.js-nav-util-menu');
        this.menuClass =            'nav-mobile__menu';
        this.activeClass =          'menu-toggle--active';
        this.easing =               'Power2.easeOut';
        this.duration =             0.5,
        this.menuExist =            false;
        this.isMoving =             false;
        this.isOpen =               false;
        this.mobileNavSwiper;
        this.options = {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
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
            }
        };
        this.menuToggle =           $( 
            '<button class="js-menu-toggle menu-toggle" title="menu">' + 
                '<span class="menu-toggle__icons">' +
                    '<svg class="menu-toggle-icon">' +
                        '<use xlink:href="#icon-nav" />' +
                    '</svg> ' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--hover">' +
                        '<use xlink:href="#icon-nav-hover" />' +
                    '</svg>' +
                '</span>' +

                '<span class="menu-toggle__icons menu-toggle__icons--close">' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--close">' +
                        '<use xlink:href="#icon-nav-close" />' +
                    '</svg> ' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--close-hover">' +
                        '<use xlink:href="#icon-nav-close-hover" />' +
                    '</svg>' +
                '</span>' +
                'menu' +
            '</button>'
        );
 
        // set mobileNav in 'panelNav'
        panelNav.mobileNav = this;

        // setup breakpoint dependent behavior
        enquire.register('screen and (min-width:' + breakpoints.get('xx-small') + ') and (max-width:' + breakpoints.get('medium', true) + ')', {
            match : function() {
                mobileNav.enable(true);
                console.log('mobileNav match!');
            },
            unmatch : function() {
                mobileNav.enable(false);
                console.log('mobileNav unmatch!');
            }
        });
    },

    // enable or disable mobile navigation
    enable: function(activate) {
        var $header = this.header,
            $panels = this.panels,
            $menuToggle = this.menuToggle,
            $mobilePanel = this.mobilePanel,
            $mobileNavWrapper = this.mobileNavWrapper,
            $mobileNavInner = this.mobileNavInner,
            $mobileMenus = this.mobileMenus,
            menuClass = this.menuClass,
            mobilePanelWidth = this.mobilePanelWidth;

        if(activate === true) {

            // execute only once
            if(mobileNav.menuExist !== true) {
                mobileNav.menuExist = true;
                
                // add 'menu toggle' events
                mobileNav.menuToggle.on({
                    'click': function(event) {
                        event.preventDefault();

                        if(!mobileNav.isMoving) {
                            mobileNav.switchMenu();
                        }
                    }
                });

                // add 'menu toggle' to each panel
                $panels.prepend($menuToggle);

                // replace menuToggle with appended collection
                mobileNav.menuToggle = $panels.find('.js-menu-toggle');

                // append 'mobileMenu'
                $mobilePanel.append($mobileNavWrapper.append($mobileNavInner)).prependTo('body');
                mobilePanelWidth = mobileNav.mobilePanelWidth = $mobilePanel.width();

                console.log('init - mobilePanelWidth = ' + mobileNav.mobilePanelWidth);
                
                // store current mobile menus indexes
                $mobileMenus.each(function(i){
                    $(this).data({
                        'index': $(this).index(),
                        'parent' : $(this).parent()
                    });
                });
            }

            console.log('normal - mobilePanelWidth = ' + mobilePanelWidth);

            // show 'menu toggle'
            $menuToggle.show();

            // prepend mobile menus
            $mobileMenus.each(function(i){
                $(this).addClass(menuClass).prependTo($mobileNavInner);
            });
        }
        else {
            $menuToggle.hide();
            $mobileMenus.each(function(i){
                var $parent = $(this).data('parent'),
                    index = $(this).data('index');

                // remove element class dependency
                $(this).removeClass(menuClass);

                // restore menus position
                if(index >= $parent.children().length - 1) {
                    $parent.children().eq(index - 1).after($(this));
                }
                else {
                    $parent.children().eq(index).before($(this));
                }
            });

            // close 'mobileMenu' if opened
            if(mobileNav.isOpen) {
                mobileNav.switchMenu();
            }
        }
    },

    // switch menu
    switchMenu: function(navigateTo) {
        mobileNav.isMoving = true;

        var $menuToggle = this.menuToggle,
            $mobilePanel = this.mobilePanel,
            $panelsContainer = this.panelsContainer,
            targtPos = mobileNav.isOpen !== true ? [this.mobilePanelWidth, 0] : [0, -this.mobilePanelWidth],
            duration = this.duration,
            easing = this.easing;
        
        $menuToggle.toggleClass(this.activeClass).blur();

        console.log('navigateTo is ' + navigateTo);

        // Enable 'open state' features
        if(!mobileNav.isOpen) {
            // toggle 'mobileMenu' visibility ON
            $mobilePanel.toggle();
            $panelsContainer.addClass('panels-container--disabled');
            
            // disable panelNavigation
            panelNav.panelSwiper.allowSlideNext = false;
            panelNav.panelSwiper.allowSlidePrev = false;

            console.log('mobileNav.mobileNavSwiper = ' + mobileNav.mobileNavSwiper);

            // create swiper if doesn't exists
            if(typeof this.mobileNavSwiper === 'undefined') {
                mobileNav.mobileNavSwiper = new Swiper('.nav-mobile', mobileNav.options);
            }
            else {
                console.log('mobileNav.mobileNavSwiper is defined!!');
                mobileNav.mobileNavSwiper.update();
            }

            // mark Mobile navigation Panel item as current one
            this.highlight(panelNav.currentPanel);
        }
        else {
            // unmark Mobile navigation Panel item from being current one
            this.unhighlight(panelNav.currentPanel);
        }
        
        // animate mobilePanel and panelsContainer
        TweenLite.to([
                $mobilePanel,
                $panelsContainer
            ], duration, {
            right: function(index, target){

                console.log(index, $(target).attr('class'));
                return index === 0 ? targtPos[1] : targtPos[0];
            },
            ease: easing,
            onComplete: function() {

                mobileNav.isMoving = false;
                mobileNav.isOpen = !mobileNav.isOpen;

                // Disable 'open state' features
                if(!mobileNav.isOpen) {
                    // toggle 'mobileMenu' visibility OF
                    $mobilePanel.toggle();
                    $panelsContainer.removeClass('panels-container--disabled');

                    // Enable panelNavigation
                    panelNav.panelSwiper.allowSlideNext = true;
                    panelNav.panelSwiper.allowSlidePrev = true;

                    // remove 'mobileMenu panel' sizing
                    $mobilePanel.css('height', '');
                    $(window).off('resize.mobileNav');

                    // navigate to Panel if any
                    if(typeof navigateTo !== 'undefined') {
                        console.log('mobileNav navigate to = ' + navigateTo);
                        panelNav.gotoPanel(navigateTo, 'linkNavigation, menu open');
                    }
                }

                console.log('mobileNav isOpen = ' + mobileNav.isOpen);
            }
        });
    },

    highlight: function(currentPanel) {
        var $currentItem  = panelNav.panelLinks.parent().eq(currentPanel);

        $currentItem.addClass('main-menu__item--active');

        console.log('current panel = ' + panelNav.panelLinks.parent().get(currentPanel));
    },

    unhighlight: function(currentPanel) {
        var $currentItem  = panelNav.panelLinks.parent().eq(currentPanel);

        $currentItem.removeClass('main-menu__item--active');
    }
}

module.exports = mobileNav;