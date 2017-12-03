'use strict';

// require non-CommonJS files 
require('jquery');
require('modernizr');
require('touchswipe');
require('mousewheel')($);

// require installed modules
var enquire = require('enquire');

// load project modules
var domAdjust = require('./domAdjust'),
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
            emailProtector.init();
            breakpoints.init();
            svgIcons.init();
            panelNav.init();
            slider.init();
            forms.init();

            // test enquire
            enquire.register('screen and (min-width:' + breakpoints.get('xx-small') + ') and (max-width:' + breakpoints.get('x-small') + ')', {
                match : function() {
                    console.log('Breaking point ' + 'xx-small' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'xx-small' + ' exit!');
                }
            })
            enquire.register('screen and (min-width:' + breakpoints.get('x-small') + ') and (max-width:' + breakpoints.get('small') + ')', {
                match : function() {
                    console.log('Breaking point ' + 'x-small' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'x-small' + ' exit!');
                }
            })
            .register('screen and (min-width:' + breakpoints.get('small') + ') and (max-width:' + breakpoints.get('medium') + ')', {
                match : function() {
                    console.log('Breaking point ' + 'small' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'small' + ' exit!');
                }
            })
            .register('screen and (min-width:' + breakpoints.get('medium') + ') and (max-width:' + breakpoints.get('large') + ')', {
                match : function() {
                    console.log('Breaking point ' + 'medium' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'medium' + ' exit!');
                }
            })
            .register('screen and (min-width:' + breakpoints.get('large') + ')', {
                match : function() {
                    console.log('Breaking point ' + 'large' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'large' + ' exit!');
                }
            }).register('screen and (min-width:' + breakpoints.get('x-small') + ') and (max-width:' + breakpoints.get('small') + ') and (orientation: landscape)', {
                match : function() {
                    console.log('Breaking point ' + 'x-small landscape' + ' reached!');
                },
                unmatch : function() {
                    console.log('Breaking point ' + 'x-small landscape' + ' exit!');
                }
            });

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