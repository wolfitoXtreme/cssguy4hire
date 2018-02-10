'use strict';

var Swiper = require('swiper'),
    skillsRating = require('./skillsRating'),
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
        this.panelArrows =      $([]); // empty collection
        this.allVisited =       0;
        this.focusables =       $(':focusable', this.panels);
        this.mobileNav;         // Store Mobile Nav here
        this.slider;            // Store Slider here
        this.options = {
            wrapperClass: 'js-panels',
            slideClass: 'panel',
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            setWrapperSize: false, // for flexbox compatibility fallback
            speed: 400,
            offsetRatio: 0.15, // custom property for swipe custom transformations
            shortSwipes: false,
            longSwipesRatio: 0.1,
            longSwipesMs: 100,
            resistance: true,
            resistanceRatio: 0.85,
            keyboard: true,
            effect :'slide',
            mousewheel: {
                sensitivity: 1
            },
            on: {
                init: function() {
                    var $currentPanel = panelNav.panels.eq(0); // on init always 0
                    
                    // show panel navigation arrows animation
                    // panelNav.hightlightArrows($currentPanel);

                    console.log('panel event PANEL INIT');

                    if(
                        !$currentPanel.data('visited') ||       // is not visited
                        !$currentPanel.data('arrowDone')        // arrow animation is not done
                    ) {
                        
                        // panelNav.hightlightArrows($currentPanel, $currentPanel.data('nextArrow'), $previousPanel.data('nextArrow'));
                        panelNav.hightlightArrows(
                            $currentPanel,
                            $currentPanel.data('nextArrow')
                        );
                    }
                },

                slideChange: function() {

                    console.log('panel event PANEL CHANGE');
                },

                sliderMove: function() {
                    console.log('panel event PANEL MOVE.');
                },

                transitionStart: function() {
                    console.log('panel event PANEL TRANSITION START');
                },

                transitionEnd: function() {
                    console.log('panel event PANEL TRANSITION END');
                },

                slideChangeTransitionStart: function() {
                    console.log('panel event PANEL CHANGE TRANSITION START');
                },

                slideChangeTransitionEnd: function() {
                    var currentPanel = panelNav.panelSwiper.activeIndex,
                        previousPanel = panelNav.panelSwiper.previousIndex,
                        $panels = panelNav.panels,
                        $currentPanel = $panels.eq(currentPanel),
                        $previousPanel = $panels.eq(previousPanel);

                    // set focus on focus dummy
                    // therefore allowing tab navigation from current panel
                    $currentPanel.children().filter(
                        function(index) {
                            return $(this).is('.js-focus-dummy');
                        }
                    ).focus();

                    // set current panel (Mobile.js use)
                    panelNav.currentPanel = currentPanel;

                    // show panel navigation arrows animation only if not previously visited
                    console.log('nextArrow =' + $currentPanel.data('arrowDone'));
                    if(
                        !$currentPanel.data('visited') ||       // is not visited
                        !$currentPanel.data('arrowDone')        // arrow animation is not done
                    ) {
                        
                        // panelNav.hightlightArrows($currentPanel, $currentPanel.data('nextArrow'), $previousPanel.data('nextArrow'));
                        panelNav.hightlightArrows(
                            $currentPanel,
                            $currentPanel.data('nextArrow'), 
                            $previousPanel,
                            $previousPanel.data('nextArrow')
                        );
                    }

                    console.log(
                        'panel event PANEL CHANGE TRANSITION END \n' + 
                        'panelArrows = ' + panelNav.panelArrows.length + '\n' +
                        'panel class = ' + $currentPanel.attr('class') + '\n' +
                        'panel-rating = ' + $currentPanel.data('panel-rating-animation')
                    );

                    // skillsRating control of current slider, if any
                    if(typeof $currentPanel.data('panel-rating-animation') !== 'undefined') {
                        skillsRating.skillsFill($currentPanel.data('panel-rating-animation'), true);
                    }

                    if(typeof $previousPanel.data('panel-rating-animation') !== 'undefined') {
                        skillsRating.skillsFill($previousPanel.data('panel-rating-animation'), false);
                    }
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

        // add dummy navigation focus 
        panelNav.panels.prepend($('<span class="js-focus-dummy hidden" tabindex="0" />'));
        panelNav.focusables = panelNav.focusables.add('.js-focus-dummy');

        // store arrows
        panelNav.panels.each(function(i){
            var $prevArrow = $('.js-nav-panel-prev', this),
                $nextArrow = $('.js-nav-panel-next', this);
            console.log('$nextArrow = ' + $nextArrow.length);

            if($prevArrow.length) panelNav.panelArrows.push($prevArrow);
            if($nextArrow.length) {
                panelNav.panelArrows.push($nextArrow);
                $(this).data({
                    'visited':          false,
                    'arrowDone':        false,
                    'nextArrow':    $nextArrow
                }); // store nextArrow into this
            };
        });

        // initialize panelSwiper
        panelNav.panelSwiper = new Swiper('.js-panels-container', panelNav.options);

        // initialize methods
        panelNav.linkNavigation(this.panelLinks);
        panelNav.tabNavigation(this.focusables);
        panelNav.arrowNavigation();

        // set mobile panel links background colors
        panelNav.panelLinks.each(function(i){
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
        var $panels = this.panels,
            $links = links,
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
                        currentPanel = panelNav.panelSwiper.activeIndex;

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
        var $panelArrows = this.panelArrows,
            prevArrow = '.js-nav-panel-prev',
            nextArrow = '.js-nav-panel-next';

        console.log('$panelArrows.length = ' + $panelArrows[0].attr('class'));

        $panelArrows.each(function(i) {
            $(this).on({
                'click': function(event) {
                    event.preventDefault();

                    console.log('arrowNavigation!!');

                    var currentPanel = panelNav.currentPanel;

                    console.log('currentPanel is ' + currentPanel);

                    if($(this).is(prevArrow)) {
                        console.log('prev!!');
                        panelNav.gotoPanel(currentPanel - 1, 'arrowNavigation');
                    }
                    else {
                        console.log('next!!');
                        panelNav.gotoPanel(currentPanel + 1, 'arrowNavigation');
                    }
                }
            });
        });
    },

    // hightlight arrows
    // hightlightArrows: function($currentPanel, $currentPanelArrow, $previousPanelArrow) {
    hightlightArrows: function($currentPanel, $currentPanelArrow, $previousPanel, $previousPanelArrow) {
        var $panels = this.panels;

        // set panel as visited
        var setVisited = function($panel, $arrow) {
            $panel.data({
                'visited': true,
                'arrowDone': true
            });

            if(typeof $arrow !== 'undefined') {
                $arrow.removeClass('nav-panel__link--on-screen nav-panel__link--animated');
            }
        }

        // set current panel as visited
        $currentPanel.data({
            'visited': true
        });
        
        // set all previous panels as visited ('mobile Panel not linear navigation')
        if(panelNav.allVisited < $panels.length) {
            panelNav.allVisited += 1;
 
            $panels.each(function(i){
                if(i < $currentPanel.index()) {
                    setVisited($(this), $(this).data('nextArrow'));
                }
                else {
                    return;
                }
                console.log('panel looping!!');
            });
        }

        // set previous panel as visited, if any
        if(typeof $previousPanel !== 'undefined'){
            setVisited($previousPanel, $previousPanelArrow);
        }

        if(typeof $currentPanelArrow !== 'undefined') {

            $currentPanelArrow.addClass('nav-panel__link--on-screen nav-panel__link--animated').one({
                'animationend webkitAnimationEnd' : function(event) {
                    event.stopPropagation();

                    // Avoid running twice the code (':pseudo element ins triggering one more')
                    $(this).off('animationend webkitAnimationEnd');
                    
                    $(this).removeClass('nav-panel__link--animated').one({
                        'transitionend webkitTransitionEnd' : function(event) {
                            event.stopPropagation();
                            event.stopImmediatePropagation();
                            
                            // set panel as visited
                            setVisited($currentPanel, $currentPanelArrow);

                            console.log('nav-panel__link transition END!!! ' + $(event.target).closest('.panel').attr('class'));
                        
                            // Avoid running twice the code ('transition is also set for tab navigation use')
                            $(this).off('transitionend webkitTransitionEnd');
                        }
                    });

                    console.log('nav-panel__link animation END!!!');
                }
            });
        }
        else { // sets visited for Contact panel ('no next arrow')
            // set panel as visited
            setVisited($currentPanel, $currentPanelArrow);
        }

        console.log(
            '-----\n' +
            // 'panelNav.allVisited = ' + panelNav.allVisited + '\n' +
            // '$panels.length = ' + $panels.length + '\n' +
            // '$currentPanel =' + $currentPanel.attr('class') + '\n' +
            '$currentPanel index =' + $currentPanel.index() + '\n' +
            '$currentPanel visited =' + $currentPanel.data('visited') + '\n' +
            '$currentPanel arrowDone =' + $currentPanel.data('arrowDone') + '\n' +
            // '$currentPanel arrowAnimating =' + $currentPanel.data('arrowAnimating') + '\n' +
            '-----\n' +
            // '$previousPanel index =' + if($previousPanel.index() + '\n' +
            // '$previousPanel visited =' + $previousPanel.data('visited') + '\n' +
            // '$previousPanel arrowDone =' + $previousPanel.data('arrowDone') + '\n' +
            // '$previousPanel arrowAnimating =' + $previousPanel.data('arrowAnimating') + '\n' +
            // '$currentArrow = ' + $currentPanelArrow + '\n' +
            // '$previousPanelArrow = ' + $previousPanelArrow
            '-----\n\n'
        );

    },

    // control panels with mousewheel
    mousewheel: function(panelWrapper) {
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

        if($panel.index() === 1) {
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