'use strict';

var panelNav = require('./panelNav'),
    onScreenTest = require('./onScreenTest');

// 
// Contact Panel 
//
var contactPanel = {
    init: function() {
        this.openBtn =      $('.js-open-contact-panel');
        this.formPanel =    $('.js-form-panel');
        this.closeBtn = $('.form-panel-close-btn');
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

        // formPanel transition events
        this.formPanel.hide().on({
            'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd' : function(event) {
                var $formPanel = contactPanel.formPanel;

                if($(event.target)[0] === $formPanel[0]) {
                    contactPanel.isOpen = !contactPanel.isOpen;
                    contactPanel.isMoving = false;

                    console.log(
                        'contactPanel transitionend on...' + $(event.target).attr('class') + '\n' +
                        'isOpen = ' + contactPanel.isOpen
                    );

                    if(contactPanel.isOpen === true) {
                        // hide panels
                        panelNav.wrapper.add(panelNav.panels).hide();

                        // set formPanel as opened
                        $formPanel.addClass('form-panel--opened');
                    }
                    else {
                        // trigger window resize to ensure any 'on resize' dependent objects are updated
                        $(window).trigger('resize');
                    }
                }
            }
        });

    },

    open: function() {
        var $formPanel = contactPanel.formPanel;

        $formPanel.show();

        // delay setting opening class honoring CSS transition
        setTimeout(function() {
            $formPanel.addClass('form-panel--opening');
        }, 5);
    },

    close: function() {
        var $formPanel = contactPanel.formPanel;

        // delay setting opening class honoring CSS transition
        setTimeout(function() {
            $formPanel.removeClass('form-panel--opening form-panel--opened');
            panelNav.wrapper.add(panelNav.panels).show();
        }, 5);

        
    }
}

module.exports = contactPanel;