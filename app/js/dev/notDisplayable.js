'use strict';

var throttle = require('lodash/throttle');

// 
// Get real device orientation
// 
var notDisplayable = {
    init: function() {
        this.overlay =  $('.js-not-displayable');
        this.timer = null; 
        
        // call methods
        this.resize(this.overlay);
        notDisplayable.enabling(this.overlay);
    },
    enabling: function() {
        var $overlay = this.overlay,
            isActive = $overlay.css('outline-style') === 'solid' ? true : false,
            transitionComplete = 0;

        // override to false whenever contact panel is visible
        if($('.js-form-panel').is(':visible')) {
            isActive =  false;
        }

        if(isActive && !$overlay.is('.not-displayable--active')) {
            $overlay.addClass('not-displayable--active');
            
            // create delay to apply transition
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                $overlay.addClass('not-displayable--enabled');
                console.log('notDisplayable TIMER!');
            }, 5);

        }
        else if(!isActive && $overlay.is('.not-displayable--enabled')) {
            $overlay.removeClass('not-displayable--enabled');

            $overlay.one({
                'transitionend': function(event) {
                    $overlay.removeClass('not-displayable--active');
                }
            });
        }

    },
    resize: function() {
        var $overlay = this.overlay;

        $(window).on({
            'resize.notDisplayable.throttle': throttle(
                function() {
                    notDisplayable.enabling($overlay);
                }
            , 200)
        });

    }
};

module.exports = notDisplayable;