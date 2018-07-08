'use strict';

// require installed modules
var loader = require('pace');

loader.start();
console.log('...loading app');



loader.on('start', function() {
    // alert('started!');
});

loader.on('done', function() {

    var loadingOverlay = document.getElementsByClassName('pace')[0];
        
    var removeLoader = function() {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
    };

    console.log(loadingOverlay.length);


    loadingOverlay.addEventListener('transitionend', function(event) {
        removeLoader();
    }, false);

    loadingOverlay.addEventListener('webkitTransitionEnd', function(event) {
        removeLoader();
    }, false);

});