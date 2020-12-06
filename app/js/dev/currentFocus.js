'use strict';

// 
// get current focused element if any
// 
var currentFocus = {
    init: function(container, exception) {
        this.focused = $();
        this.focusInElements = $(':focusable', container).filter('input, textarea');
        this.focusOutElements = $('a, select, button', container);
        this.exception = exception;

        // this.focusOutElements = $(':focusable', container).not(this.focusInElements[0]);
        
        this.focusInclude();
        // this.focusExclude();

        console.log('init focused length = ' + currentFocus.focused.length);
    },

    // set the current focused element from focusInElements elements
    focusInclude: function() {
        var $focusInElements = this.focusInElements;

        $focusInElements.on({
            'focusin': function () {
                console.log('focusin');
                currentFocus.focused = $(this);

                console.log(
                    'focused length = ' + currentFocus.focused.length + '\n' + 
                    'focused is -> ' + currentFocus.focused.attr('name')
                );
            },

            'blur': function() {
                var $trigger = $(event.relatedTarget),
                    $exception = currentFocus.exception;

                if(!$trigger.is($focusInElements) && !$trigger.is($exception)) {
                    console.log('blur by' + $(event.relatedTarget).prop('tagName'));
                    currentFocus.reset();

                    console.log(
                        'focused length = ' + currentFocus.focused.length
                    );

                }
            }
        });
    },

    // reset focus object
    reset: function() {
        this.focused = $();
    }
};

module.exports = currentFocus;