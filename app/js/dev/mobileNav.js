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
        this.mobilePanel =  $('<nav class="nav-mobile" />');
        this.mobileMenus =  $('.js-nav-main-menu').add('.js-nav-util-menu');
        this.menuClass =    'nav-mobile__menu';
        this.activeClass =  'menu-toggle--active';
        this.menuExist =    false; 
        this.menuToggle =   $( 
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

        console.log('mobileNav mobileMenus = ' + mobileNav.mobileMenus.length);

        // initialize breakpoints
        breakpoints.init();

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
            $mobileMenus = this.mobileMenus,
            menuClass = this.menuClass;

        if(activate === true) {

            // execute only once
            if(mobileNav.menuExist !== true) {
                mobileNav.menuExist = true;
                
                // add 'menu toggle' events
                mobileNav.menuToggle.on({
                    'click': function(event) {
                        event.preventDefault();
                        mobileNav.openMenu();
                    }
                });

                // add 'menu toggle' to each panel
                $panels.prepend($menuToggle);

                // replace menuToggle with appended collection
                mobileNav.menuToggle = $panels.find('.js-menu-toggle');

                // set tab navigation (calling panelNav method)
                panelNav.tabNavigation(mobileNav.menuToggle);

                // append 'mobileMenu'
                $('body').prepend($mobilePanel);
                
                // store current mobile menus indexes
                $mobileMenus.each(function(i){
                    $(this).data({
                        'index': $(this).index(),
                        'parent' : $(this).parent()
                    });

                });

            }

            // show 'menu toggle'
            $menuToggle.show();

            // prepend mobile menus
            $mobileMenus.each(function(i){
                $(this).addClass(menuClass).prependTo($mobilePanel);
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
        }
    },

    // open menu
    openMenu: function() {
        var $menuToggle = this.menuToggle,
            $mobilePanel = this.mobilePanel;

        console.log('mobile navigation click/mouse up');
        
        $menuToggle.toggleClass(this.activeClass).blur();

        // open 'mobileMenu'
        $mobilePanel.toggle();

    }

}

module.exports = mobileNav;