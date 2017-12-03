'use strict';

var selectbox = require('selectbox'),
    debounce = require('lodash/debounce');

// 
// initialize forms
// 
var forms = {
    init: function() {
        this.selects = $('select');
           
        if(this.selects.length) {
            // initialize selectBox plugin
            this.selects.selectBox();

            forms.resize();
        }
    },
    resize: function() {
        $(window).on({
            'resize.select.debounce': debounce(
                function() {

                    // destroy selectBox instances
                    forms.selects.selectBox('destroy');
                    
                    // get selected options
                    var $options = forms.selects.find('option');

                    console.log($options.length);

                    $options.each(function(i){
                        if($(this).is(':selected')) {
                            $(this).attr('selected', 'selected');
                        }
                        else {
                            $(this).removeAttr('selected');
                        }
                    });

                    // recreate selectBox instances
                    forms.selects.selectBox('create');
                }
            , 200),
        });
    }
}

module.exports = forms;