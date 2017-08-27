/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/

// require non non-CommonJS files 
require('jquery');
require('modernizr');

// load modules
var emailProtector = require('./emailProtector');




// 
$(function() {

    // initializing loaded modules
    emailProtector.init();


});

console.log('hello cruel world!');