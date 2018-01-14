'use strict';

var panelNav = require('./panelNav'),
    onScreenTest = require('./onScreenTest'),
    TweenLite = require('TweenLite'),
    TimelineLite = require('TimelineLite'),
    CSSPlugin = require('CSSPlugin');

// 
// Contact Panel 
//
var contactPanel = {
    init: function() {
        this.openBtn =      $('.js-open-contact-panel');
        this.formPanel =    $('.js-form-panel');
        this.closeBtn =     $('.form-panel-close-btn');
        this.initPos =      '100%';
        this.easing =       'Power2.easeOut';
        this.duration =     0.5,
        this.isMoving =     false;
        this.isOpen =       false;
        
        // open button events
        this.openBtn.on({
            'click' : function(event) {
                event.preventDefault();

                if(!contactPanel.isMoving) {
                    contactPanel.isMoving = true;
                    contactPanel.open();
                }
            }
        });

        // close button events
        this.closeBtn.on({
            'click' : function(event) {
                event.preventDefault();

                if(!contactPanel.isMoving) {
                    contactPanel.isMoving = true;
                    contactPanel.close();
                }
            }
        });

        this.formPanel.hide();
    },

    open: function() {
        var $formPanel = this.formPanel,
            pos = '0%',
            duration = this.duration,
            easing = this.easing;

        $formPanel.show();

        TweenLite.to($formPanel, duration, {
            left: pos,
            ease: easing,
            onComplete: function() {
                contactPanel.complete();
                $formPanel.addClass('form-panel--opened');
            }
        });
    },

    close: function() {
        var $formPanel = this.formPanel,
            pos = this.initPos,
            duration = this.duration,
            easing = this.easing;

        console.log('init pos was = ' + pos);

        TweenLite.to($formPanel, duration, {
            left: pos,
            ease: easing,
            onComplete: function() {
                contactPanel.complete();
                $formPanel.removeClass('form-panel--opened');
                $formPanel.hide();
            }
        });
    },

    complete: function() {
        var $formPanel = this.formPanel;

        console.log('contactPanel.complete!!');
        this.isMoving = false;
        this.isOpen = !this.isOpen;
        
        // remove residual inline animations styles
        $formPanel.css({'left': ''});
    }
}

module.exports = contactPanel;