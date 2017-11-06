'use strict';

// 
// Test variables on screen
// 
var onScreenTest = {
    test: function(testing, testParams, debug) {

        if(debug) {

            var outPutVars = ''
                + '<strong>' + testing + '</strong><br>'
                + '<strong>';
        
            for (var i=0; i<testParams.length; i++) {
                outPutVars += testParams[i] + '<br>'
            }
        
            outPutVars += '<br><strong>';
        
            if($('#testVars').length === 0) {
                $('<div/>', {'id': 'testVars'}).html(outPutVars).css({
                    'left' : '0px',
                    'top' : '0px',
                    'color' : '#000000',
                    'height' : 'auto',
                    'font-size' : '0.8rem',
                    'position' : 'fixed',
                    'z-index' : '1120',
                    'background-color' : 'rgba(255, 255, 255, 0.5)'
                }).prependTo('body');
            }
            else {
                $('#testVars').html(outPutVars).on({
                    'click' : function(event) {
                        $('#testVars').remove();
                    }
                });
            }
        }
    }
}

module.exports = onScreenTest;