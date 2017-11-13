'use strict';

// require non-CommonJS files 
require('jquery');
require('modernizr');

// require installed modules
var WebFont = require('webfontloader');

// load project modules
var onScreenTest = require('./onScreenTest');

window.fontsReady = false;

WebFont.load({
    custom: {
        families: [
            'opensans',
            'oswald',
            'oswald-book'
        ], 
        urls : ['../css/fonts.css']
    },
    loading: function() {
        console.log('loading fonts...');
    },
    active: function() {
        window.fontsReady = true;
        console.log('fonts loaded!!');
    },
    inactive: function() {
    },
    fontloading: function(familyName, fvd) {
        console.log('loading font: ' + familyName);
    },
    fontactive: function(familyName, fvd) {
        console.log('font: ' + familyName + 'loaded');
    },
    fontinactive: function(familyName, fvd) {
        console.log('font: ' + familyName + 'inactive');
    }
});


// reference
$(function() {

    var reference = {
        init: function() {
            console.log('reference js is initialized');
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
                        reference.init();
                        clearInterval(checkFonts);
                    }
                }
                
            }, 100);
    }

});