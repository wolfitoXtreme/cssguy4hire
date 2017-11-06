'use strict';

// require installed modules
var WebFont = require('webfontloader');

window.fontsReady = false;

WebFont.load({
    custom: {
        families: [
            'opensans-regular',
            //'opensans-bold',
            'oswald-regular',
            'oswald-bold',
            'oswald-book'
        ], 
        urls : ['css/fonts.css']
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