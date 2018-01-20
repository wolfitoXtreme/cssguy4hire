'use strict';

var panelNav = require('./panelNav'),
    slider = require('./slider'),
    isMobile = require('ismobilejs'),
    currentFocus = require('./currentFocus'),
    TweenLite = require('TweenLite'),
    TimelineLite = require('TimelineLite'),
    CSSPlugin = require('CSSPlugin'),
    onScreenTest = require('./onScreenTest');

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
        this.isMobile =     isMobile.any;

        // if moblie, initialize focus filter
        if(contactPanel.isMobile) {
            currentFocus.init($('form', this.formPanel), this.closeBtn);
        }
        
        // open button events
        this.openBtn.on({
            'click' : function(event) {
                event.preventDefault();

                if(!contactPanel.isMoving) {
                    contactPanel.open();
                }
            }
        });

        // close button events
        this.closeBtn.on({
            'click' : function(event) {
                event.preventDefault();

                if(contactPanel.isMobile) {
                    if(currentFocus.focused.length) {
                        // reset current focus object
                        currentFocus.reset();

                        // wait till soft keyboard is closed
                        setTimeout(function(){
                            contactPanel.close();
                        }, 250);
                    }
                    else {
                        contactPanel.close();
                    }
                }
                else {
                    contactPanel.close();
                }
            }
        });

        // initially hide formPanel
        this.formPanel.hide();
    },

    open: function() {
        contactPanel.isMoving = true;

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

                // hide underlying structure (helps tab navigation)
                panelNav.wrapper.css({'visibility': 'hidden'});

                $formPanel.find(':focusable').eq(0).focus();
            }
        });
    },

    close: function() {
        contactPanel.isMoving = true;

        var $formPanel = this.formPanel,
            pos = this.initPos,
            duration = this.duration,
            easing = this.easing;

        console.log('init pos was = ' + pos);

        // show underlying structure
        panelNav.wrapper.css({'visibility': 'visible'});

        TweenLite.to($formPanel, duration, {
            left: pos,
            ease: easing,
            onComplete: function() {
                contactPanel.complete();
                $formPanel.removeClass('form-panel--opened');
                $formPanel.hide();

                // set back the focus on 'openBtn'
                contactPanel.openBtn.focus();
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