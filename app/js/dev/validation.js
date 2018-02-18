'use strict';

// require non-CommonJS files 
require('jquery-validate');

// 
// initialize forms
// 
var validation = {
    init: function($form, options) {

        // console.log('validation initialized...' + $form.attr('class'));

        var validator = $form.validate(options),
            $resetBtn = $form.find('button[type="reset"]');

        $resetBtn.on({
            'click': function(event) {
                event.preventDefault();
                validation.reset($form);
            }
        });
    },

    reset: function($form) {
        var form = $form[0];

        $form.validate().resetForm(); // resets validation
        $form[0].reset(); // resets fields
    }
}

module.exports = validation;