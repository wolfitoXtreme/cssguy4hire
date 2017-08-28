/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/

// require non-CommonJS files 
require('jquery');
require('modernizr');

// require installed module
var enquire = require('enquire');

// load project modules
var emailProtector = require('./emailProtector');



// 
$(function() {

    // initializing loaded modules
    emailProtector.init();

    // test enquire
    enquire.register("screen and (max-width:45em)", {
        match : function() {
            console.log('Breaking point reached!');
        },

        unmatch : function() {
            console.log('Breaking point exit!');
        }
    });

});

console.log('hello cruel world!');