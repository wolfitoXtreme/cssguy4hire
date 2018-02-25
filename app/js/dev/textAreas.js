'use strict';

var debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs'),
    perfectScrollbar = require('perfectScrollbar');

// Form function constructor
var Form = function(instance){

    var form = this;

    form.instance = instance;
    form.textareas = form.instance.find('textarea');
    form.boxEditables = [];
    form.timer; // for handling form reset delay interactions

    // form instance events
    form.instance.on({
        'reset': function(event) {
            
            clearTimeout(form.timer);
            form.timer = setTimeout(function() {
                
                for(var i = 0; i < form.boxEditables.length; i++) {
                    var boxEditable = form.boxEditables[i],
                        textareaContent = boxEditable.textarea.val();

                    // reinitialize content
                    boxEditable.initContent();

                    // $textareaBox.scrollTop(0);

                    // update scrollbars
                    boxEditable.textareaBox.perfectScrollbar('update');
                }
            }, 5);
        },
        'submit': function(event){
            event.preventDefault();

            for(var i = 0; i < form.boxEditables.length; i++) {
                var boxEditable = form.boxEditables[i],
                    textareaContent = boxEditable.textarea.val();
                
                // reinitialize content
                boxEditable.changeContent();
            }
        }
    });
};

// BoxEditable function constructor
var BoxEditable = function(instance){
    this.instance = instance;
    this.label;
    this.placeholder;
    this.textarea;
    this.textareaBox;
    this.timer; // for handling field delay interactions
};

// BoxEditable initialize
BoxEditable.prototype.init = function() {
    var boxEditable = this,
        textareaContent = boxEditable.textarea.val();

    // initialize content
    boxEditable.initContent();

    // disable boxEditable if attribute disabled is set
    if(boxEditable.textarea.attr('disabled')) {
        boxEditable.instance.attr('contenteditable', false);
    }
    console.log('BoxEditable initialize, BoxEditable is -> ' + boxEditable.textarea.attr('class'));

    // events for label focus
    boxEditable.label.on({
        'mousedown': function(event) {
            console.log('label mousedown!');

            clearTimeout(boxEditable.timer);
            boxEditable.timer = setTimeout(function() {
                boxEditable.focus(); // simulated focus
                boxEditable.instance.focus(); // real focus
                console.log('focused!');
            }, 5);
        }
    });

    // boxEditable instance events
    boxEditable.instance.on({

        // typing printable characters
        'keypress': function(event) {

            clearTimeout(boxEditable.timer);
            boxEditable.timer = setTimeout(function() {
                console.log(
                    '---\n' +
                    'keypress\n' + 
                    'children length = ' + boxEditable.instance.children().length + '\n' +
                    'text length = ' + boxEditable.instance.text().length + '\n' +
                    '---'
                );
                // boxEditable.changeContent();
                // setup placeholder, more than one character
                if(boxEditable.instance.text().length === 0 || boxEditable.instance.children().length < 2) {
                    boxEditable.setPlaceholder();
                }
            }, 5);
            
        },

        // hitting any key
        // this will catch keyboard cut, paste and undo
        'keydown': function(event) {
            // count children for scrollbar update
            var childrenBerore = boxEditable.instance.children().length;

            clearTimeout(boxEditable.timer);
            boxEditable.timer = setTimeout(function() {
                console.log(
                    '---\n' +
                    'keydown\n' + 
                    'children length = ' + boxEditable.instance.children().length + '\n' +
                    'text length = ' + boxEditable.instance.text().length + '\n' +
                    '---'
                );

                // if(event.keyCode === 8 && boxEditable.instance.text().length === 0) { // backspace
                if(boxEditable.instance.text().length === 0 && boxEditable.instance.children().length < 2) {
                    // boxEditable.changeContent();
                    boxEditable.setPlaceholder();
                }

                // for handling focus on keyboard tabbing navigation
                if(event.keyCode === 9) { // tab
                    boxEditable.blur();
                }

                // less children, therefore scroll bars need to be updated
                if(event.keyCode === 8 && boxEditable.instance.children().length < childrenBerore) { // backspace
                    boxEditable.textareaBox.perfectScrollbar('update');
                }

            }, 5);
        },

        'focus': function(event) {
            boxEditable.focus(); // simulated focus
        },

        'blur': function(event) {
            var target = event.relatedTarget;

            console.log('boxEditable blur!! target =' + target);

            // blur origin is triggered by some other element gaining focus 
            if(target !== null) {
                boxEditable.blur();
            }
            
        },

        // convert paste data into plain text to avoid HTML tags
        'paste': function(event) {
            event.preventDefault();
            var text;

            console.log(
                '---\n' +
                'paste\n' + 
                'children length = ' + boxEditable.instance.children().length + '\n' +
                'text length = ' + boxEditable.instance.text().length + '\n' +
                '---'
            );
            
            if((event.originalEvent || event) && !window.clipboardData) {
                console.log('paste A');
                text = (event.originalEvent || event).clipboardData.getData('text/plain');
                console.log('text = ' + text);
                window.document.execCommand('insertText', false, text);
            }
            else if(window.clipboardData) {
                console.log('paste B');
                text = window.clipboardData.getData('Text');
                window.getSelection().getRangeAt(0).insertNode( document.createTextNode(text) );
            }

            // setup placeholder, more than one character
            if(boxEditable.instance.text().length > 0) {
                boxEditable.setPlaceholder();
            }

            boxEditable.textareaBox.perfectScrollbar('update');

        },

        'cut': function(event) {
            console.log('cutting!');
            clearTimeout(boxEditable.timer);
            boxEditable.timer = setTimeout(function() {
                if(boxEditable.instance.text().length === 0) {
                    boxEditable.setPlaceholder();

                    // update scrollbars if no text left
                    if(boxEditable.instance.text().length === 0 || boxEditable.instance.children().length < 2) {
                        boxEditable.textareaBox.perfectScrollbar('update');
                    }
                }
            }, 5);
        },

        // block drag and drop
        'dragover drop': function(event) {
            event.preventDefault();
            return false;
        }
    });
}

// set or remove placeholder
BoxEditable.prototype.setPlaceholder = function() {
    var boxEditable = this;

    console.log('setPlaceholder!!!! - ' + boxEditable.instance.text().length);

    if(boxEditable.instance.text().length < 1 && boxEditable.instance.children().length < 2) {
        boxEditable.placeholder.show();
        boxEditable.textareaBox.addClass('placeholder');
    }
    else {
        boxEditable.placeholder.hide();
        boxEditable.textareaBox.removeClass('placeholder');
    }
}

// initialize content
BoxEditable.prototype.initContent = function() {
    var boxEditable = this,
        textareaContent = boxEditable.textarea.val();

    console.log('init content = ' + (textareaContent.length > 0));

    // set initial content
    if(textareaContent.length > 0) {
        boxEditable.instance.html(textareaContent); 
    } else {
        boxEditable.instance.html('');
    }

    // set placeholder
    boxEditable.setPlaceholder();

}

// change content (typing)
BoxEditable.prototype.changeContent = function() {
    var boxEditable = this,
        inputText = boxEditable.instance.html(),
        outputText = inputText.replace(/<div>/g, '')
                .replace(/<\/div>/g, '\n')
                .replace(/&nbsp;/g, ' ')
                .replace(/<br>/g, '\n')
                .replace(/<p>/g, '') // IE inserting content
                .replace(/<\/p>/g, '\n'); // IE inserting content

    boxEditable.textarea.val(outputText);

    console.log('setting content ->' + outputText);
}

// focus imitation
BoxEditable.prototype.focus = function() {
    this.textareaBox.addClass('focus');
    console.log('this.textareaBox FOCUS!');
}

// blur imitation
BoxEditable.prototype.blur = function() {
    this.textareaBox.removeClass('focus');
    
    // set real textarea behavior
    this.changeContent();
    this.textarea.trigger('blur');

    console.log('BoxEditable BLUR!');
}

// scroll bar default options
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
        this.forms = $('form');
        this.textAreas = $('textarea');
        this.isMobile = isMobile.phone;
        this.textareaBoxes = $([]); // empty collection
        this.boxEditables = []; // all editable
        this.timer;

        // initialize only if there are textarea fields present, and not on mobile
        if(this.textAreas.length && !this.isMobile) {

            this.forms.each(function(i){
                
                // create new form object
                var form = new Form($(this));
                
                form.textareas.each(function(j){

                    var $textarea = $(this),
                        $label = $textarea.prev('label'),
                        textareaClass = $textarea.attr('class'),
                        textareaPlaceHolder = $textarea.attr('placeholder'),
                        textareaBoxID = $textarea.attr('id') + j + '-box',
                        textareaContent = $textarea.val();

                    // create textarea replacement and wrapper
                    var $textareaWrapper = $('<div class="textarea-wrapper ' + textareaClass + '" />'),
                        $textareaBox = $('<div class="textarea ' + textareaClass +'" />'),
                        $placeholder = $('<div class="textarea__place-holder" />').text(textareaPlaceHolder),
                        $boxEditable = $('<div id="' + textareaBoxID +'" class="textarea__box-editable" contenteditable="true" tabindex="0" />');

                    // set textareaBox structure
                    $textarea.after($textareaWrapper);
                    $textareaWrapper.append($textarea);
                    $textarea.after($textareaBox);
                    $textareaBox.append($placeholder, $boxEditable);

                    // create new boxEditable object, and set its properties
                    var boxEditable = new BoxEditable($boxEditable);

                        boxEditable.label = $label;
                        boxEditable.placeholder = $placeholder;
                        boxEditable.textarea = $textarea;
                        boxEditable.textareaBox = $textareaBox;

                        boxEditable.init();

                    console.log('--- BOX-EDITABLE ---');
                    for(var prop in boxEditable) {
                        console.log('boxEditable prop = ' + prop);
                    }
                    console.log('--- BOX-EDITABLE ---\n\n');

                    // store boxEditable into current form
                    form.boxEditables.push(boxEditable);

                    // same for textAreaFields
                    textAreaFields.boxEditables.push(boxEditable);

                    // initialize scrollbar
                    $textareaBox.perfectScrollbar(perfectScrollbarOptions);

                    // store $textareaBox for scrollbar resizing updates
                    textAreaFields.textareaBoxes = textAreaFields.textareaBoxes.add($textareaBox);

                });

                console.log('form.boxEditables.length = ' + form.boxEditables.length);

            });


            // handle focus/blur simulation for textareaBox
            $(document).on({
                'mousedown.textarea': function(event) {
                    var isContainer;

                    for(var i = 0; i < textAreaFields.boxEditables.length; i++) {
                        var boxEditable = textAreaFields.boxEditables[i],
                            textareaBox = boxEditable.textareaBox;
                            
                        isContainer = $(event.target)[0] === textareaBox[0] || $(event.target).closest(textareaBox).length;

                        console.log('yes isContainer = ' + isContainer);
                        if(isContainer) {
                            boxEditable.focus(); // simulated focus
                            break;
                        }
                        else {
                            boxEditable.blur(); // simulated blur
                        }
                    }
                }
            });

            // window blur, blur simulation for textareaBox
            $(window).on({
                'blur': function(event){
                    event.stopPropagation();
                    event.stopImmediatePropagation();

                    for(var i = 0; i < textAreaFields.boxEditables.length; i++) {
                        var boxEditable = textAreaFields.boxEditables[i];
                        
                        boxEditable.blur(); // simulated blur
                    }
                }
                
            });

            // update scroll bars on resize for all instances
            this.resize(this.textareaBoxes);

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