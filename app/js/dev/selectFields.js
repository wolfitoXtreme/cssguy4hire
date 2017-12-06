'use strict';

var selectbox = require('selectbox'),
    debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs');

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

        console.log('isMobile = ' + this.isMobile);
           
        if(this.selects.length) {
            // if mobile, create wrapper for native select and selectBox replacement
            if(this.isMobile) {
                this.selects.each(function(i){
                    var $select = $(this),
                        $selectClass = $select.attr('class'),
                        $selectWrapper = $('<div class="selectBox-mobile-wrapper" />').addClass($selectClass);

                    // add wrapper and include select inside
                    $select.before($selectWrapper);
                    $select.appendTo($selectWrapper);

                    selectFields.mobile($select);
                });
            }
            else {
                // initialize selectBox plugin
                this.selects.selectBox(this.selectBoxOptions);
                // handle resizing for non mobile devices
                this.resize();
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

    // resize events to update options width
    resize: function() {
        $(window).on({
            'resize.select.debounce': debounce(
                function() {
                    console.log('resizing!!');
                    
                    // refresh select options width on resize
                    selectFields.selects.next('.selectBox-dropdown').each(function(i){
                        var $options = $(this).data('selectBox-options'),
                            optionsWidth = $(this).innerWidth() >= $options.innerWidth() ? $(this).innerWidth() + 'px' : 'auto';

                        $options.width(optionsWidth);

                        console.log($options.length);

                    });
                }
            , 200),
        });
    }
}

module.exports = selectFields;