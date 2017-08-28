'use strict';

// load breakpoints
var breakpointsFile = require('../../breakpoints.json');

// 
// get breakpoints from 'breakpoints.json' shared SASS file
// 
var breakpoints = {
    init: function() {
        this.breakpoints = breakpointsFile.breakpoints;
        for(var key in this.breakpoints) {
           console.log(this.breakpoints[key]);
        }        
        return this.breakpoints;
    },
    get: function(bp) {
        return this.breakpoints[bp];
    }
}

module.exports = breakpoints;