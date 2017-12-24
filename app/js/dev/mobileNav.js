'use strict';

var enquire = require('enquire'),
    breakpoints = require('./breakpoints'),
    panelNav = require('./panelNav');

// 
// mobile navigation
// 
var mobileNav = {
    init: function() {
        this.header =       $('.js-header');
        this.wrapper =      $('.js-panels');
        this.panels =       $('.panel', this.wrapper).add(this.header);
        this.activeClass = 'menu-toggle--active';
        this.menuExist = false; 
        this.menuToggle = $( 
            '<button class="js-menu-toggle menu-toggle" title="menu">' + 
                '<span class="menu-toggle__icons">' +
                    '<svg class="menu-toggle-icon">' +
                        '<use xlink:href="#ui-icon-nav" />' +
                    '</svg> ' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--hover">' +
                        '<use xlink:href="#ui-icon-nav-hover" />' +
                    '</svg>' +
                '</span>' +

                '<span class="menu-toggle__icons menu-toggle__icons--close">' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--close">' +
                        '<use xlink:href="#ui-icon-nav-close" />' +
                    '</svg> ' +
                    '<svg class="menu-toggle-icon menu-toggle-icon--close-hover">' +
                        '<use xlink:href="#ui-icon-nav-close-hover" />' +
                    '</svg>' +
                '</span>' +
                'menu' +
            '</button>'
        );

        // initialize breakpoints
        breakpoints.init();

        // setup breakpoint dependent behavior
        enquire.register('screen and (min-width:' + breakpoints.get('xx-small') + ') and (max-width:' + breakpoints.get('medium', true) + ')', {
            match : function() {
                mobileNav.enable(true);
            },
            unmatch : function() {
                mobileNav.enable(false);
            }
        });
    },

    // enable or disable mobile navigation
    enable: function(activate) {
        var $panels = this.panels,
            $menuToggle = this.menuToggle;

        if(activate === true) {

            // only prepend 'menu toggle' if not prepended before
            if(mobileNav.menuExist !== true) {
                mobileNav.menuExist = true;
                
                // add 'menu toggle' events
                mobileNav.menuToggle.on({
                    'click': function(event) {
                        event.preventDefault();
                        mobileNav.openMenu();
                    }
                });

                $panels.prepend($menuToggle);

                // replace menuToggle with appended collection
                mobileNav.menuToggle = $panels.find('.js-menu-toggle');

                // set tab navigation (calling panelNav method)
                panelNav.tabNavigation(mobileNav.menuToggle);
            }

            // show 'menu toggle'
            $menuToggle.show();
        }
        else {
            $menuToggle.hide();
        }
    },

    // open menu
    openMenu: function() {
        var $menuToggle = this.menuToggle;

        console.log('mobile navigation click/mouse up');
        
        $menuToggle.toggleClass(this.activeClass).blur();
    }

}

module.exports = mobileNav;