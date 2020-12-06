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
  init: function () {
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
          email: true,
        },
      },

      // removes default error elements
      errorPlacement: function (error, element) {},

      // highlight errors
      highlight: function (element, errorClass, validClass) {
        var $element = $(element);

        $element
          .addClass(errorClass)
          .closest('.form-field')
          .children('label')
          .addClass('label-error');
      },

      // unhighlight errors
      unhighlight: function (
        element,
        errorClass,
        wrapperErrorClass,
        validClass
      ) {
        var $element = $(element);

        $element
          .removeClass(errorClass)
          .closest('.form-field')
          .children('label')
          .removeClass('label-error');
      },

      // submit action
      submitHandler: function (form) {
        var $form = $(form),
          $responseHolder = $('<div class="form-response" />'),
          formAction = $form.attr('action'),
          formData = $form.serializeArray(),
          pos = '-100%',
          duration = 0.5,
          easing = 'Power2.easeOut';

        // disable all form controls
        forms.disable($form);

        // manipulate retrieved data
        var responseAction = function (content) {
          console.log('validation response!!');

          // store form and response into contactPanel
          contactPanel.form = $form;
          contactPanel.formResponse = $responseHolder;
          contactPanel.formEnable = forms.enable; // set enable method for use in contactPanel

          // animate and control form and response
          TweenLite.to($form, duration, {
            left: pos,
            opacity: 0,
            ease: easing,
            onComplete: function () {
              console.log('complete!!');
              $responseHolder.html(content).appendTo($form.parent());

              // detach and reset form
              $form.detach();
              validation.reset($form);

              var $goBackLink = $responseHolder.find('.js-goback');

              // close contact panel by time
              var removePanel = setTimeout(function () {
                console.log('timeout!!!');
                contactPanel.close();
                clearTimeout(removePanel);
              }, 3000);

              // close contact panel by user action
              $goBackLink.on({
                click: function (event) {
                  event.preventDefault();

                  contactPanel.close();
                  clearTimeout(removePanel);
                },
              });
            },
          });
        };

        $.ajax({
          type: window.location.hostname === 'localhost' ? 'GET' : 'POST', // might need to be changed to post once Server integration occurs
          cache: false,
          url: formAction,
          data: formData,
          dataType: 'html',
          success: function (data) {
            var $content = $('<div>' + data + '</div>'),
              response = $content.find('.js-response').html();

            responseAction(response);
          },
          error: function (event, request, settings) {
            console.log(event + '||' + request + '||' + settings);
          },
        });
      },
    });
  },

  // disable all form elements
  disable: function ($form) {
    var $selects = $form.find('select'), // actual select to handle selectBox
      $textAreas = $form.find('.textarea__box-editable'); // text area replacement

    $('label', $form).addClass('disabled');
    $(':input', $form).attr('disabled', true);

    if (!this.isMobile) {
      $selects.each(function () {
        var $select = $(this);

        $select.selectBox('disable');
      });

      $textAreas.attr('contenteditable', false);
    } else {
      $selects.each(function () {
        var $select = $(this);

        $select.next().addClass('disabled');
      });
    }
  },

  // enable all form elements
  enable: function ($form) {
    var $selects = $form.find('select'), // actual select to handle selectBox
      $textAreas = $form.find('.textarea__box-editable'); // text area replacement

    $('label', $form).removeClass('disabled');
    $(':input', $form).attr('disabled', false);

    if (!this.isMobile) {
      $selects.each(function () {
        var $select = $(this);

        $select.selectBox('enable');
      });

      $textAreas.attr('contenteditable', true);
    } else {
      $selects.next().removeClass('disabled');
    }
  },
};

module.exports = forms;
