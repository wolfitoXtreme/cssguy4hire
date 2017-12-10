'use strict';

var selectFields = require('./selectFields'),
    textAreaFields = require('./textAreas');

// 
// initialize forms
// 
var forms = {
    init: function() {
        selectFields.init();
        textAreaFields.init();
        console.log('forms initialized!!');

        var $forms = $('form');
        
        $forms.each(function(i){
            $(this).on({
                'submit': function(event) {
                    event.preventDefault();

                    var query = $(this).serialize();

                    console.log(query);
                }
            });
        });

    }
}

module.exports = forms;