'use strict';

// load breakpoints
var breakpointsFile = require('../../config/breakpoints.json');

// 
// get breakpoints from 'breakpoints.json' shared SASS file
// 
var breakpoints = {
    init: function() {
        this.breakpoints = breakpointsFile;
        for(var key in this.breakpoints) {
           console.log(this.breakpoints[key]);
        }        
        return this.breakpoints;
    },

    // get breakpoint key
    get: function(bp, limit) {
        if(limit) {
            var value = parseInt(this.breakpoints[bp]),
                units = this.breakpoints[bp].replace(/[\d\.]/g, ''),
                limited = (value - 1) + units;

            return limited;
        }
        else {
            return this.breakpoints[bp];
        }
    }
}

module.exports = breakpoints;