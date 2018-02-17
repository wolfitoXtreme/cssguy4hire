'use strict';

var selectFields = require('./selectFields'),
    textAreaFields = require('./textAreas'),
    validation = require('./validation');

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

            // showErrors: function(errorMap, errorList) {
            //     $formContact.find('.form-description').addClass('form-description--error');
            // },

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

            // success
            success: function(label, element) {
                // $(element).closest('.form-field').removeClass(errorClass);
            },

            // submit action
            submitHandler: function(currentform) {

                $formContact.addClass('form--unactive');
                
                //ajax call
                // $.ajax({

                //     type : 'POST',
                //     cache    : false,
                //     url : currentFormAction,
                //     data : $(currentform).serializeArray(),
                //     dataType : 'html',
                //     success : function(data) {
                        
                //         var content = $(data).filter('#defaultWrapper').find('#response').html();
                        
                //         $(':input', currentform).prop('disabled', true);
                        
                //         $(currentform).addClass('submitted').on({
                //             'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd' : function(event) {
                                
                //                 //set up content
                //                 response(content);
                                
                //             }
                //         });
                        
                //         //
                //         //$(responseHolder).html(content).appendTo($(currentform).parent());
                        
                //     },
                //     error : function(event, request, settings) {
                //         var content = $('<p />'),
                //             message = text_ajaxError
                //         ;
                        
                //         $(content).text(message);
                        
                //         //set up content  
                //         response(content);
                        
                //         console_log('error retrieving data!!');
                //     }
                // });

            }
        });
    }
}

module.exports = forms;