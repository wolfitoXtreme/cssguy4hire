'use strict';

var throttle = require('lodash/throttle'),
    debounce = require('lodash/debounce');

// 
// Panel navigation
//
var panelNav = {
    init: function() {
        this.wrapper =          $('.js-panels');
        this.panels =           $('.panel', panelNav.wrapper);
        // TODO - Arrow navigation already removed by CSS
        this.panelArrows =      $('.js-nav-panel', panelNav.panels);
        this.panelHeight =      $('body').height();
        this.currentPanel =     0;
        this.maxPanels =        $(panelNav.panels).length;
        this.panelSpeed =       500;
        this.swippeDistance =   0;
        this.supports3D =       Modernizr.csstransforms3d === true ? true : false;
        this.options = {
            triggerOnTouchEnd : true,
            triggerOnTouchLeave : true,
            swipeStatus : panelNav.swipeStatus,
            allowPageScroll : 'none',
            threshold : 75,
            excludedElements : 'label, button, input, select, option, textarea, .select, .textarea',
            fallbackToMouseEvents : true,
            tap : function(event, target) {                
                //console_log(
                //    '||||||||||TAP|||||||||||||\n' +
                //    'swippeDistance = ' + swippeDistance + '\n'+
                //    'target.className = ' + target.className + '\n'+ 
                //    target.tagName
                //);
                
                //avoid firing of normal links during panes swipping
                //if(target.className == 'normalLink' && swippeDistance < 2 && (event.which == 1 || event.which === 0)) {
                //    triggerAnchor = target;
                //    window.location.href = $(triggerAnchor).attr('href');
                //}
            }
        };

        console.log('supports3D => ' + panelNav.supports3D);

        // initialize methods
        panelNav.matchSize();
        panelNav.resize();
        panelNav.swipe(panelNav.wrapper);
        panelNav.mousewheel(panelNav.wrapper);

    //prevent transition end event propagation
    // $('body *').on({
    //     'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd' : function(event) {
    //         event.stopPropagation();
            
    //         //if(wRisize === true) {
    //         //    fitSkills('on BODY transitionEnd');
    //         //    fitProjects('on BODY transitionEnd');
    //         //    wRisize =  false;
    //         //}
    //     }
    // });

        // initialize carousel type panel navigation
        // $(panelNav.wrapper).slick({
        //     dots: false,
        //     infinite: false,
        //     arrows: false,
        //     vertical: true,
        //     verticalSwiping: true,
        //     speed: 300,
        //     // touchThreshold: 800,
        //     waitForAnimate: false
        // });

        // initialize mosewheel
        
    },

    // swipe
    swipe: function(panelWrapper) {
        panelWrapper.swipe(panelNav.options);
    },

    // swipe status
    swipeStatus: function(event, phase, direction, distance) {

        //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
        if (phase == 'move' && (direction == 'up' || direction == 'down')) {
            var duration = 0;

            console.log(
                'currentPanel = ' + panelNav.currentPanel + '\n' +
                'panelHeight = ' + panelNav.panelHeight + '\n' +
                'distance = ' +  (panelNav.panelHeight * panelNav.currentPanel) + distance + '\n' +
                'duration = ' + duration + '\n' +
                'panelSpeed = ' + panelNav.panelSpeed
            );
    
            if (direction == 'up') {
                console.log('swipeStatus UP');
                panelNav.scrollPanels((panelNav.panelHeight * panelNav.currentPanel) + distance, duration, 'normalUP');
            }
            else if (direction == 'down') {
                console.log('swipeStatus DOWN');
                panelNav.scrollPanels((panelNav.panelHeight * panelNav.currentPanel) - distance, duration, 'normalDOWN');
            }
    
        }
        else if (phase == 'cancel') {
            console.log('swipeStatus CANCEL');
            panelNav.scrollPanels(panelNav.panelHeight * panelNav.currentPanel, panelNav.panelSpeed, 'CANCEL');
        }
        else if (phase == 'end') {
            console.log('swipeStatus END');
            if (direction == 'down') {
                panelNav.previousPanel();
            }
            else if (direction == 'up') {
                panelNav.nextPanel();
            }
            else {
                panelNav.scrollPanels(panelNav.panelHeight * panelNav.currentPanel, panelNav.panelSpeed, 'END');
            }
            
            console.log('PHASE END');
            
        }
        
        var swippeDistance = distance;

    },

    previousPanel: function () {
        panelNav.currentPanel = Math.max(panelNav.currentPanel - 1, 0);
        panelNav.scrollPanels(panelNav.panelHeight * panelNav.currentPanel, panelNav.panelSpeed, 'previousPanel');
    },

    nextPanel: function() {

        panelNav.currentPanel = Math.min(panelNav.currentPanel + 1, panelNav.maxPanels - 1);
        panelNav.scrollPanels(panelNav.panelHeight * panelNav.currentPanel, panelNav.panelSpeed, 'nextPane');

        console.log(
            '-------\n' +
            'NEXTPANEL' + 
            'currentPanel = ' + panelNav.currentPanel + '\n' +
            'maxPanels = ' + panelNav.maxPanels + '\n' +
            'panelSpeed = ' + panelNav.panelSpeed + '\n' +
            '-------\n'
        );
    },

    // update panels position on drag
    scrollPanels: function(distance, duration, movement) {

        //inverse the number we set in the css
        var value = (distance < 0 ? '' : '-') + Math.abs(distance).toString();

        console.log(
            '///////////\n' +
            'scrollPanels distance = ' +  value +  '\n' +
            '///////////'
        );
        
        //choose transform method and transition duration
        var cssTransition = panelNav.supports3D === true ? 'translate3d(0, ' + value + 'px, 0)' : 'translate(0,' + value + 'px)',
            transitionDuration = (duration / 1000).toFixed(1) + 's';
    
        panelNav.wrapper.css({
            'transition-duration' : transitionDuration,
            'transform' : cssTransition
        });

    },

    // resize panels and container to match window size
    matchSize: function() {

        var targetWidth = $('body').width(),
            targetHeight = window.innerHeight > $('body').height ? window.innerHeight : $('body').height();


        
        // adjust wrapper dimensions
        panelNav.wrapper.css({
            'width': targetWidth,
            'height': targetHeight * panelNav.maxPanels
        });

        // adjust panel dimensions
        panelNav.panels.css({
            'width': targetWidth,
            'height': targetHeight,
            'min-height' : 0
        });

        console.log(
            'targetHeight = ' + targetHeight + '\n' + 
            'maxPanels = ' + panelNav.maxPanels + '\n' + 
            'targetHeight * maxPanels = ' +  (targetHeight * panelNav.maxPanels) + '\n' + 
            'currentPanel = ' + panelNav.currentPanel
        );

        panelNav.panelHeight = targetHeight;
        panelNav.scrollPanels(panelNav.panelHeight * panelNav.currentPanel, 0, 'matchBodySize');
    },

    // update panel navigation on resize
    resize: function() {
        $(window).on({
            'resize.panelNav.debounce': debounce(
                function() {
                    panelNav.matchSize();
                }
            , 200),
            'resize.panelNav.throttle': throttle(
                function() { 
                    panelNav.matchSize();
                    // $(panelNav.wrapper).slick('setPosition');
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
                    panelNav.previousPanel();
                }
                else if(event.deltaY > 0) {
                     panelNav.nextPanel();
                }

                // console.log('slickCurrentSlide =' + $(panelNav.wrapper).slick('slickCurrentSlide'));
            }
        });

    }
}

module.exports = panelNav;