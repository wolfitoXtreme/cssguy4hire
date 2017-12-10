'use strict';

var debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs'),
    perfectScrollbar = require('perfectScrollbar');

// perfectScrollbar default Options
var perfectScrollbarOptions = {
    minScrollbarLength: 15,
    maxScrollbarLength: 60,
    suppressScrollX: true,
    scrollYMarginOffset: 0
};

// 
// initialize textAreas
// 
var textAreaFields = {
    init: function() {
        this.textAreas = $('textarea');
        this.isMobile = isMobile.phone;
        this.textareaBoxes = $([]); // empty collection

        // initialize only if there are textarea fields present, and not on moblie
        if(this.textAreas.length && !this.isMobile) {
            console.log('we got textareas!');
            this.textAreas.each(function(i){

                var $textarea = $(this),
                    textareaClass = $textarea.attr('class'),
                    textareaPlaceHolder = $textarea.attr('placeholder'),
                    textareaBoxID = $textarea.attr('id') + '-box',
                    textareaContent = $textarea.val();

                // create textarea replacement and wrapper
                var $textareaWrapper = $('<div class="textarea-wrapper ' + textareaClass + '" />'),
                    $textareaBox = $('<div class="textarea ' + textareaClass +'" />'),
                    $placeholder = $('<div class="textarea__place-holder" />').text(textareaPlaceHolder),
                    $boxEditable = $('<div id="' + textareaBoxID +'" class="textarea__box-editable" contenteditable />');

                    // set textareaBox structure
                    $textarea.after($textareaWrapper);
                    $textareaWrapper.append($textarea);
                    $textarea.after($textareaBox);
                    $textareaBox.append($placeholder, $boxEditable);

                    // store data into textareaBoxes
                    $boxEditable.data({
                        'placeholder': $placeholder,
                        'textarea': $textarea,
                        'textareaBox': $textareaBox
                    });


                    // store into textareaBoxes collection for scrollbar resizing updates
                    textAreaFields.textareaBoxes = textAreaFields.textareaBoxes.add($textareaBox);

                    // copy content or set placeholder
                    if(textareaContent.length > 0) {
                        $boxEditable.html(textareaContent); 
                    } else {
                        textAreaFields.placeholder($boxEditable);
                    }

                // initialize scrollbar
                $textareaBox.perfectScrollbar(perfectScrollbarOptions);


                // events for boxEditable
                $boxEditable.on({
                    // copy content into textarea field
                    'keyup keydown': function(event) {
                        var inputText = $boxEditable.html(),
                            outputText = inputText.replace(/<div>/g, '')
                                        .replace(/<\/div>/g, '\n')
                                        .replace(/&nbsp;/g, ' ')
                                        .replace(/<br>/g, '\n')
                                        .replace(/<p>/g, '\n')
                                        .replace(/<\/p>/g, '\n');

                        $textarea.val(outputText);
                        $textareaBox.perfectScrollbar('update');
                        $placeholder.hide(); // remove placeholder
                    },

                    // block drag and drop
                    'dragover drop': function(event) {
                        event.preventDefault();
                        return false;
                    },

                    'focus.textareaBox click.textareaBox': function(event) {
                        $textareaBox.addClass('focus');
                    },

                    'keyup.textareaBox': function(event) {
                        if(event.keyCode == 8) {

                            console.log($boxEditable.text().length);

                            if($boxEditable.text().length === 0) {
                            // if($textarea.val().length === 0) {
                                $textarea.val('');
                                textAreaFields.placeholder($boxEditable);
                            }
                        }
                    },

                    'blur.textareaBox': function(event) {
                        $textareaBox.removeClass('focus');
                        
                        // Add remove placeholder
                        textAreaFields.placeholder($boxEditable);
                    },
                });


                // convert paste data into plain text to avoid HTML tags
                $boxEditable.on('paste', function(event) {
                    event.preventDefault();
                    var text;

                    if((event.originalEvent || event) && !window.clipboardData) {
                        text = (event.originalEvent || event).clipboardData.getData('text/plain');
                        window.document.execCommand('insertText', false, text);
                    }
                    else if(window.clipboardData) {
                        console.log('paste B');
                        text = window.clipboardData.getData('Text');
                        window.getSelection().getRangeAt(0).insertNode( document.createTextNode(text) );
                    }
                });

            });

            // update scroll basrs on resize
            this.resize(this.textareaBoxes);

        }

    },

    // Add/remove placeholder
    placeholder: function(boxEditable) {
        var $boxEditable = boxEditable,
            $textarea = boxEditable.data('textarea'),
            $textareaBox = boxEditable.data('textareaBox'),
            textareaContent = $textarea.val(),
            $placeholder = boxEditable.data('placeholder');

        if(textareaContent <= 0) {
            $placeholder.show();
            $textareaBox.addClass('placeholder');
        }
        else {
            $placeholder.hide();
            $textareaBox.removeClass('placeholder');
        }
    },

    // handle resize to update scrollbar
    resize: function(textareaBoxes) {

        var $textareaBoxes = textareaBoxes;

        $(window).on({
            'resize.textAreas.debounce': debounce(
                function() {
                    console.log('resizing!!, with ' + $textareaBoxes.length);
                    $textareaBoxes.perfectScrollbar('update'); 
                }
            , 200)
        });
    }
}

module.exports = textAreaFields;