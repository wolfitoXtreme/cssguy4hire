'use strict';

// require installed modules
var loader = require('pace');

loader.start();
console.log('...loading app');



loader.on('start', function() {
    console.log('...loading started');
});

loader.on('done', function() {

    var loadingOverlay = document.getElementsByClassName('pace')[0];
        
    var removeLoader = function() {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
    };

    console.log(loadingOverlay.length);

    document.body.removeAttribute('title');

    loadingOverlay.addEventListener('transitionend', function() {
        removeLoader();
    }, false);

    loadingOverlay.addEventListener('webkitTransitionEnd', function() {
        removeLoader();
    }, false);

});