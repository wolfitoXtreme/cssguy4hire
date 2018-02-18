'use strict';

require('jquery-validate');

var selectFields = require('./selectFields'),
    textAreaFields = require('./textAreas'),
    validation = require('./validation'),
    contactPanel = require('./contactPanel');

// 
// initialize forms
// 
var forms = {
    init: function() {

        // initialize UI replacements
        selectFields.init();
        textAreaFields.init();
        console.log('forms initialized!!');

        // target specific forms
        var $formContact = $('.js-contact-form');

        validation.init($formContact, {
            onkeyup: false,
            onsubmit: true,
            ignore: [], // remove ignoring hidden elements default
            rules: {
                email: {
                    email: true
                }
            },

            // removes default error elements
            errorPlacement: function(error, element) {
            },

            // highlight errors
            highlight: function(element, errorClass, validClass) {
                var $element = $(element);

                $element.addClass(errorClass).closest('.form-field').addClass('form-field--error');
            },

            // unhighlight errors
            unhighlight: function(element, errorClass, wrapperErrorClass, validClass) {
                var $element = $(element);

                $element.removeClass(errorClass).closest('.form-field').removeClass('form-field--error');
            },

            // submit action
            submitHandler: function(form) {
                var $form = $(form),
                    $responseHolder = $('<div class="form-response" />'),
                    formAction = $form.attr('action'),
                    formData = $form.serializeArray();

                // manipulate retrieved data
                var responseAction = function(content) {

                    console.log('validation response!!');

                    $responseHolder.html(content).appendTo($form.parent());

                    // store fom and response into contactPanel
                    contactPanel.form = $form;
                    contactPanel.formResponse = $responseHolder;
                    
                    // detach and reset form
                    $form.detach();
                    validation.reset($form);
                };


                $.ajax({
                    type: 'GET', // might need to be changed to post once Server integration occurs 
                    cache: false,
                    url: formAction,
                    data: formData,
                    dataType: 'html',
                    success : function(data) {

                        var $content = $('<div>' + data + '</div>'),
                            response = $content.find('.js-response').html();

                        console.log('content -> ' + response);

                        responseAction(response);
                    },
                    error: function(event, request, settings) {
                        console.log(event + '||' + request + '||' + settings);
                    }
                });

            }
        });
    }
}

module.exports = forms;