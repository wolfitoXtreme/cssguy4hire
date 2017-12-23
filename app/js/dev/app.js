'use strict';

// require non-CommonJS files 
require('jquery');
require('modernizr');
require('touchswipe');
require('mousewheel')($);

// require installed modules
// modules here...

// load project modules
var domAdjust = require('./domAdjust'),
    mobileNav = require('./mobileNav'),
    emailProtector = require('./emailProtector'),
    breakpoints = require('./breakpoints'),
    svgIcons = require('./svgIcons'),
    panelNav = require('./panelNav'),
    slider = require('./slider'),
    onScreenTest = require('./onScreenTest'),
    forms = require('./forms');

// app
$(function() {

    var app = {
        init: function() {
            domAdjust.init();
            mobileNav.init();
            emailProtector.init();
            svgIcons.init();
            panelNav.init();
            slider.init();
            forms.init();

            // test onScreenTest
            $(window).on({
                'resize.test': function(event) {

                    onScreenTest.test(
                       'TEST WINDOW RESIZE', [
                           'window width = ' + $(window).width(),
                           'window height = ' + $(window).height(),
                           'window innerWidth = ' + window.innerWidth,
                           'window innerHeight = ' + window.innerHeight,
                           'window outerWidth = ' + window.outerWidth,
                           'window outerHeight = ' + window.outerHeight,
                           'screen availHeight = ' + screen.availHeight,
                           'screen availWidth = ' + screen.availWidth,
                           'document width = ' + $(document).width(),
                           'document height = ' + $(document).height(),
                           'body width = ' + $('body').width(),
                           'body height = ' + $('body').height(),
                           'body clientWidth = ' + $('body').prop('clientWidth'),
                           'body clientHeight = ' + $('body').prop('clientHeight'),
                           'body STYLE = ' + $('body').attr('style')
                       ], false
                    );
                }
            });
        }
    }

    // Initialize app after fonts loading
    fontDelay();

    // font delay
    function fontDelay() {

        var checkFontsCount = 0,
            checkFonts = setInterval(function() {

                checkFontsCount += 1;
                
                if(typeof window.fontsReady !== 'undefined') {

                    onScreenTest.test(
                       'TEST FONTS LOADING', [
                           'checkFontsCount = ' + checkFontsCount,
                           'fontsReady = ' + window.fontsReady
                       ], false
                    );
                
                    if(window.fontsReady === true) {
                        app.init();
                        clearInterval(checkFonts);
                    }
                }
                
            }, 100);
    }

});