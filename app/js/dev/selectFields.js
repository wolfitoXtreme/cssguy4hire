'use strict';

var selectbox = require('selectbox'),
    debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs'),
    perfectScrollbar = require('perfectScrollbar');


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
                this.selects.each(function(i){
                    var $select = $(this),
                        $selectClass = $select.attr('class'),
                        $selectWrapper = $('<div class="selectBox-mobile-wrapper" />').addClass($selectClass);

                    // add wrapper and include select inside
                    $select.before($selectWrapper);
                    $select.appendTo($selectWrapper);

                    // initialize mobile behavior
                    selectFields.mobile($select);
                });
            }
            else {
                // initialize selectBox plugin
                this.selects.selectBox(this.selectBoxOptions);

                // handle open/close events
                this.selects.each(function(i) {
                    selectFields.selectOpen($(this));
                });

            }
        }
    },

    // mobile version
    mobile: function(select) {
        var $select = select,
            $label = $('<span class="selectBox-label" />'),
            $arrow = $('<span class="selectBox-arrow" />'),
            $dropDown = $('<div class="selectBox-dropdown" />'),
            $arrowIcon = $('<svg class="selectBox-arrow__icon" width="0" height="0"><use xlink:href="#ui-select-arrow" /></svg>'),
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
                var currentValue = $select.find(':selected').text();
                $label.text(currentValue);
            }
        });

    },

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
            }
        });
    }
}

module.exports = selectFields;