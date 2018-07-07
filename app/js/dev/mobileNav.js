'use strict';

var enquire = require('enquire'),
    breakpoints = require('./breakpoints'),
    panelNav = require('./panelNav'),
    isMobile = require('ismobilejs'),
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
        // panels
        this.panelsContainer =      $('.js-panels-container'); // swipper container created on 'domAdjust'
        this.panels =               $('.panel', this.panelsContainer);
        
        // mobile navigation panel
        this.navPanel =             $('<nav class="nav-mobile swiper-container" />');
        this.navPanelWidth;
        this.navWrapper =           $('<div class="nav-mobile-wrapper swiper-wrapper" />');
        this.navInner =             $('<div class="nav-mobile-inner swiper-slide" />');
        this.navScrollbar =         $('<div class="nav-mobile-scrollbar swiper-scrollbar" />');
        this.menus =                $('.js-nav-main-menu').add('.js-nav-util-menu');
        this.menuClass =            'nav-mobile__menu';
        this.menuExist =            false;
        this.isMoving =             false;
        this.isOpen =               false;
        this.isMobile =             isMobile.any;
        
        // swiper 
        this.navSwiper;
        this.easing =               'Power2.easeOut';
        this.duration =             0.5,
        this.swiperOptions = {
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
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: false
            },
            mousewheel: {
                sensitivity: 10
            }
        };

        // toggle button
        this.btnActiveClass =       'menu-toggle--active';
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
        var $panels = this.panels,
            $menuToggle = this.menuToggle,
            $navPanel = this.navPanel,
            $navWrapper = this.navWrapper,
            $navInner = this.navInner,
            $navScrollbar = this.navScrollbar,
            $menus = this.menus,
            menuClass = this.menuClass;

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
                $navPanel.append($navWrapper.append($navInner), $navScrollbar).prependTo('body');
                mobileNav.navPanelWidth = $navPanel.width();

                // add mobile class indentifier
                $navPanel.addClass(this.isMobile ? 'swiper-container-mobile' : 'swiper-container-desktop');

                console.log('init - navPanelWidth = ' + mobileNav.navPanelWidth);
                
                // store current mobile menus indexes
                $menus.each(function(i){
                    $(this).data({
                        'index': $(this).index(),
                        'parent' : $(this).parent()
                    });
                });
            }

            console.log('normal - navPanelWidth = ' +  mobileNav.navPanelWidth);

            // show 'menu toggle'
            $menuToggle.show();

            // prepend mobile menus
            $menus.each(function(i){
                $(this).addClass(menuClass).prependTo($navInner);
            });
        }
        else {
            $menuToggle.hide();
            $menus.each(function(i){
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

    // switch menu (open/close)
    switchMenu: function(navigateTo) {
        mobileNav.isMoving = true;

        var $menuToggle = this.menuToggle,
            $navPanel = this.navPanel,
            $navWrapper = this.navWrapper,
            $navInner = this.navInner,
            $panelsContainer = this.panelsContainer,
            $currentItem  = panelNav.panelLinks.parent().eq(panelNav.currentPanel),
            targetPos = mobileNav.isOpen !== true ? [this.navPanelWidth, 0] : [0, -this.navPanelWidth],
            duration = this.duration,
            easing = this.easing;
        
        $menuToggle.toggleClass(this.btnActiveClass).blur();

        console.log('navigateTo is ' + navigateTo);

        // Enable 'open state' features
        if(!mobileNav.isOpen) {

            // toggle 'mobileMenu' visibility ON
            $navPanel.toggle();

            // gather info about mobile panels elements
            // in order to displace the panel according
            // to the navigated current panel
            var headingHeight = $(this.menus[1]).children(':first-child').outerHeight(), // main menu heading height
                wrapperHeight = $navWrapper.height(),
                innerHeight = $navInner.height(),
                diffHeight = innerHeight - wrapperHeight,
                currentItemTop = $currentItem.position().top,
                navDisplace = currentItemTop - headingHeight;

            // put overlay on top to avoid interaction
            $panelsContainer.addClass('panels-container--disabled');
            
            // disable panelNavigation
            panelNav.panelSwiper.allowSlideNext = false;
            panelNav.panelSwiper.allowSlidePrev = false;
            panelNav.panelSwiper.mousewheel.disable();

            console.log('mobileNav.navSwiper = ' + mobileNav.navSwiper);

            // mark Mobile navigation Panel item as current one
            $currentItem.addClass('main-menu__item--active');

            // get height of navInnerHeight
            console.log('navInner height = ' + $navInner.height());

            // create swiper if doesn't exists
            if(typeof this.navSwiper === 'undefined') {
                mobileNav.navSwiper = new Swiper('.nav-mobile', mobileNav.swiperOptions);
            }
            else {
                console.log('mobileNav.navSwiper is defined!!');
                mobileNav.navSwiper.update();
            }

            console.log(
                'mobileNav oppenning \n' +
                'current panel = ' + panelNav.currentPanel + '\n' +
                'headingHeight = ' + headingHeight + '\n' +
                'wrapperHeight = ' + wrapperHeight + '\n' +
                'innerHeight = ' + innerHeight + '\n' +
                'diffHeight = ' + diffHeight + '\n' +
                'currentItemTop =' + currentItemTop + '\n' +
                'Swiper translate = ' + this.navSwiper.getTranslate()
            );

            // move mobile panel only if not currently on first panel
            // and there isn't enoughg space to display it entirely
            if(panelNav.currentPanel !== 0 && diffHeight > 0) {
                var navTranslate = navDisplace < diffHeight ? navDisplace : diffHeight;

                this.navSwiper.setTranslate(-navTranslate);
            }
            else {
                this.navSwiper.setTranslate(0);
            }

            // remove focus on Panels focusable elements
            panelNav.focusables.attr('tabIndex', '-1');

            console.log('"mobileNav" panelNav.focusables = ' + panelNav.focusables.length);
        }
        
        // animate navPanel and panelsContainer
        TweenLite.to([
                $navPanel,
                $panelsContainer
            ], duration, {
            right: function(index, target){
                // set target position on animated elements
                console.log(index, $(target).attr('class'));
                return index === 0 ? targetPos[1] : targetPos[0];
            },
            ease: easing,
            onComplete: function() {

                mobileNav.isMoving = false;
                mobileNav.isOpen = !mobileNav.isOpen;

                // Disable 'open state' features
                if(!mobileNav.isOpen) {
                    // toggle 'mobileMenu' visibility OF
                    $navPanel.toggle();
                    $panelsContainer.removeClass('panels-container--disabled');

                    // Enable panelNavigation
                    panelNav.panelSwiper.allowSlideNext = true;
                    panelNav.panelSwiper.allowSlidePrev = true;
                    panelNav.panelSwiper.mousewheel.enable();


                    // unmark Mobile navigation Panel item from being current one
                    $currentItem.removeClass('main-menu__item--active');

                    // remove focus on Panels focusable elements
                    panelNav.focusables.attr('tabIndex', '0');

                    // navigate to Panel if any
                    if(typeof navigateTo !== 'undefined') {
                        console.log('mobileNav navigate to = ' + navigateTo);
                        panelNav.gotoPanel(navigateTo, 'linkNavigation, menu open');
                    }
                }

                console.log('mobileNav isOpen = ' + mobileNav.isOpen);
            }
        });
    }
}

module.exports = mobileNav;