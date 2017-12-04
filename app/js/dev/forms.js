'use strict';

var selectFields = require('./selectFields');

// 
// initialize forms
// 
var forms = {
    init: function() {
        selectFields.init();
        console.log('forms initialized!!');
    }
}

module.exports = forms;