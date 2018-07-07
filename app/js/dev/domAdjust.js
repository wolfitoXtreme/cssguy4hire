'use strict';

// 
// manipulate DOM to create desired layout
//
var domAdjust = {
    init: function() {
        this.header =       $('.js-header'); // original Header
        this.container =    $('<div class="js-panels-container swiper-container panels-container" />'); // swipper container
        this.wrapper =      $('.js-panels');
        this.panels =       $('.panel', this.wrapper).not('.form-panel');
        this.formPanel =    $('.js-form-panel', this.wrapper);
        this.cover =        this.panels.eq(0).clone().empty();
        this.signature =    $('.js-footer').find('.footer-signature').clone();
        this.hidden =       $('.js-hidden');
        this.utilMenu =     $('.js-nav-util-menu');
        this.blockOverlay = $('<div class="panel__block-overlay" />');

        console.log('Header ID -->' + domAdjust.header.attr('id'));

        // relocate utilities menu
        domAdjust.utilMenu.prependTo(domAdjust.header);
        domAdjust.utilMenu.clone()
            .removeClass('js-nav-util-menu')
            .addClass('nav-util-menu--internal')
            .prependTo(domAdjust.panels);

        // append 'header' contents and apply all characteristics to 'cover'
        domAdjust.header.children().appendTo(domAdjust.cover);
        domAdjust.cover
            .attr({
                'id' : domAdjust.header.attr('id'),
                'title' : domAdjust.header.attr('title'),
                'class' : domAdjust.header.attr('class')
            })
            .prependTo(domAdjust.wrapper);

        // remove original 'header'
        domAdjust.header.remove();

        // wrap 'wrapper' under 'container'
        this.wrapper.before(this.container).appendTo(this.container);

        // relocate 'contact' panel
        domAdjust.formPanel.wrapInner('<div class="form-panel-content-wrapper" />');
        domAdjust.formPanel.appendTo('body');

        // add signature logo to all panels
        domAdjust.signature.appendTo(domAdjust.panels);

        // add blocker overlay to avoid user interaction while 'Mobile Navigation Panel' is open
        domAdjust.panels.add(domAdjust.cover).prepend(this.blockOverlay);

        // hide all non required markup
        domAdjust.hidden.hide();
    
    }
};

module.exports = domAdjust;