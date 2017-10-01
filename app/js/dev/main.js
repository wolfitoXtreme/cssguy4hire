'use strict';

// require non-CommonJS files 
require('jquery');
require('modernizr');
require('mousewheel')($);

// require installed modules
var enquire = require('enquire');

// load project modules
var emailProtector = require('./emailProtector'),
    breakpoints = require('./breakpoints'),
    svgIcons = require('./svgIcons'),
    panelNav = require('./panelNav'),
    slider = require('./slider'),
    onScreenTest = require('./onScreenTest');

// app
$(function() {

    // initializing loaded modules
    emailProtector.init();
    breakpoints.init();
    svgIcons.init();
    panelNav.init();
    slider.init();

    // test enquire
    enquire.register('screen and (min-width:' + breakpoints.get('xsmall') + ') and (max-width:' + breakpoints.get('small') + ')', {
        match : function() {
            console.log('Breaking point ' + 'xsmall' + ' reached!');
        },
        unmatch : function() {
            console.log('Breaking point ' + 'xsmall' + ' exit!');
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
    });

    // test onScreenTest
    $(window).on({
        'resize.test': function(event) {
            $('.main').height($(window).height());

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
});