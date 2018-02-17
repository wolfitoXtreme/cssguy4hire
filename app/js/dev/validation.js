'use strict';

// require non-CommonJS files 
require('jquery-validate');

// 
// initialize forms
// 
var validation = {
    init: function($form, options) {
        var validate = $form.validate(options),
            $resetBtn = $form.find('button[type="reset"]');

        console.log('validation initialized...' + $form.attr('class'));

        $resetBtn.on({
            'click': function(event) {
                validate.resetForm();
            }
        });
    }
}

module.exports = validation;