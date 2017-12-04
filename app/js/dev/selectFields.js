'use strict';

var selectbox = require('selectbox'),
    debounce = require('lodash/debounce'),
    isMobile = require('ismobilejs');


function mobileSelect($select, $selectBox) {
    var $selectBoxLabel = $selectBox.find('.selectBox-label');

    $select.on({
        'change': function(event) {
            var currentValue = $select.find(':selected').text();
            console.log('change');
            $selectBoxLabel.text(currentValue);
        }
    });
}

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

                });
            }

            // initialize selectBox plugin
            this.selects.selectBox(this.selectBoxOptions);

            // if mobile, native select takes over select behavior
            if(this.isMobile) {
                this.selects.each(function(i){
                    var $select = $(this),
                        $selectBox = $select.next('.selectBox-dropdown');

                    mobileSelect($select, $selectBox);

                    // remove click events added by selectBox
                    $select.off('click');
                    $selectBox.off('mousedown');
                });
            }
            else {
                // handle resizing for non mobile devices
                this.resize();
            }
        }
    },
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