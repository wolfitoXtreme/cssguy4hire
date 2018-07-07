'use strict';

var debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs'),
    onScreenTest = require('./onScreenTest');

// 
// Get real device orientation
// 
var deviceOrientation = {
    init: function() {
        this.isMobile = isMobile.any;
        this.prevOrientation;
        this.setOrientation();
        this.resize();
    },
    getOrientation: function() {
        var orientation;

        console.log('device orientation is mobile = ' + this.isMobile);

        if(this.isMobile) {
            orientation = screen.availWidth > screen.availHeight ? 'orientation-landscape' : 'orientation-portrait';
        }
        else {
            orientation = window.innerWidth > window.innerHeight ? 'orientation-landscape' : 'orientation-portrait';
        }

        return orientation;
    },
    setOrientation: function() {
        var prevOrientation = deviceOrientation.prevOrientation,
            currentOrientation = deviceOrientation.getOrientation();

        console.log('device orientation get = ' + currentOrientation);
        
        $('html').removeClass(prevOrientation).addClass(currentOrientation);
        console.log('device orientation change!');
        deviceOrientation.prevOrientation = currentOrientation;

        onScreenTest.test(
           'TEST DEVICE ORIENTATION', [
                'orientation = ' + deviceOrientation.prevOrientation,
                'window innerWidth = ' + window.innerWidth,
                'window innerHeight = ' + window.innerHeight,
                'window outerWidth = ' + window.outerWidth,
                'window outerHeight = ' + window.outerHeight,
                'screen availHeight = ' + screen.availHeight,
                'screen availWidth = ' + screen.availWidth
           ], false
        );

    },
    resize: function() {

        $(window).on({
            'resize.deviceOrientation.debounce': debounce(
                function() {
                    deviceOrientation.setOrientation();
                }
            , 200)
        });

    }
};

module.exports = deviceOrientation;