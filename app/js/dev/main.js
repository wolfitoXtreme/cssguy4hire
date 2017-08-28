/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/

// require non-CommonJS files 
require('jquery');
require('modernizr');

// require installed modules
var enquire = require('enquire');

// load project modules
var emailProtector = require('./emailProtector'),
    breakpoints = require('./breakpoints');

// 
$(function() {

    // initializing loaded modules
    emailProtector.init();
    breakpoints.init();

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

});

console.log('hello cruel world!');