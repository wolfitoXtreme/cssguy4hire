'use strict';

var selectbox = require('selectbox'),
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
// initialize selectFields
// 
var selectFields = {
    init: function() {
        this.forms = $('form');
        this.selects = $('select');
        this.selectBoxOptions = {
            mobile: true
        }
        this.isMobile = isMobile.phone;

        // initialize only if there are selects present
        if(this.selects.length) {

            // if mobile, create wrapper for native select and selectBox replacement
            // otherwise initialize selectBox
            if(this.isMobile) {

                this.forms.each(function(i){

                    var $form = $(this),
                        $selects = $form.find('select');

                    $selects.each(function(j){
                        var $select = $(this),
                            $selectClass = $select.attr('class'),
                            $selectWrapper = $('<div class="selectBox-mobile-wrapper" />').addClass($selectClass);

                        // add wrapper and include select inside
                        $select.before($selectWrapper);
                        $select.appendTo($selectWrapper);

                        // initialize mobile behavior
                        selectFields.mobile($select);

                    });

                    // set placeholder
                    $selects.each(function(i){
                        selectFields.setPlaceholder($(this));
                    });

                    // handle form reset
                    $form.on({
                        'reset.selects': function(event) {
                            console.log('reset.selects, selects =' + $selects.length);

                            var waitForClean = setTimeout(function() {
                                $selects.trigger('change');
                            }, 10);
                        }
                    });
                });
            }
            else {
                this.forms.each(function(i){

                    var $form = $(this),
                        $selects = $form.find('select');

                    $selects.each(function(j){
                        var $select = $(this);

                        // add select class allowing the plugin clone to pick it up
                        $select.addClass('select');

                        // initialize selectBox plugin
                        $select.selectBox(selectFields.selectBoxOptions);

                        // handle open/close events
                        selectFields.selectOpen($select);

                        // set placeholder
                        selectFields.setPlaceholder($select);

                        // handle form reset
                        $form.on({
                            'reset.selects': function(event) {
                                console.log('reset.selects, selects =' + $('selects').length);

                                var waitForClean = setTimeout(function() {
                                    $select.selectBox('refresh');
                                    $select.trigger('close'); // will update the placeholder
                                }, 10);
                            }
                        });

                    });
                });
            }

        }
    },

    // set placeholder
    setPlaceholder: function(select, remove) {

        var $select = select,
            $dropDown = $select.next('.selectBox-dropdown'),
            currentVal = $select.find(':selected').val(),
            placeholderClass = 'placeholder';

        if(currentVal === '' && remove !== true) {
            $select.add($dropDown).addClass(placeholderClass);
        }
        else if(currentVal !== '' || remove == true) {
            $select.add($dropDown).removeClass(placeholderClass);
        }
    },

    // mobile version
    mobile: function(select) {
        var $select = select,
            $label = $('<span class="selectBox-label" />'),
            $arrow = $('<span class="selectBox-arrow" />'),
            $dropDown = $('<div class="select selectBox-dropdown" />'),
            $arrowIcon = $('<svg class="selectBox-arrow__icon" width="0" height="0"><use xlink:href="#icon-select-arrow" /></svg>'),
            selectClass = $select.attr('class');

        // include arrow icon
        $arrowIcon.appendTo($arrow);

        // attach classes and components to dropDown 
        $dropDown.addClass(selectClass).append($label, $arrow);

        // insert dropDown after select field
        $select.after($dropDown);

        // add label value
        $label.text($select.find(':selected').text());


        // handle on change events
        $select.on({
            'change': function(event) {
                var currentOption = $select.find(':selected').text();
                $label.text(currentOption);

                // set placeholder
                selectFields.setPlaceholder($select);
                console.log('select changed!');
            },
            'focus': function(event) {

                // remove placeholder class
                selectFields.setPlaceholder($select, true);

                $select.next($dropDown).addClass('focus');
            },
            'blur': function(event) {
                // set placeholder
                selectFields.setPlaceholder($select);

                $select.next($dropDown).removeClass('focus');
            }
        });

    },

    // refresh size and scrollbar when opened
    selectOpen: function(select) {
        var $select = select;

        $select.on({
            'open': function(event) {

                var $dropDown = $select.next('.selectBox-dropdown'),
                    $options = $dropDown.data('selectBox-options'),
                    optionsWidth = $dropDown.innerWidth() >= $options.innerWidth() ? $dropDown.innerWidth() + 'px' : 'auto';

                $options.width(optionsWidth);

                // initialize scrollbar
                $options.css('overflow', 'hidden').perfectScrollbar(perfectScrollbarOptions);

            },
            'close': function(event) {
                var $dropDown = $select.next('.selectBox-dropdown'),
                    $options = $dropDown.data('selectBox-options');

                // destroy scrollbar
                $options.perfectScrollbar('destroy');

                // set placeholder
                selectFields.setPlaceholder($select);
            }
        });
    }
}

module.exports = selectFields;