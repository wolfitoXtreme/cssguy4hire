// 
// manipulate DOM to create desired layout
//
var domAdjust = {
    init: function() {
        this.header =       $('.js-header'); // original Header
        this.wrapper =      $('.js-panels');
        this.panels =       $('.panel', this.wrapper);
        this.contact =      $('.js-contact', this.wrapper);
        this.cover =        this.panels.eq(0).clone().empty();
        this.signature =    $('.js-footer').find('.footer-signature').clone();
        this.hidden =       $('.js-hidden');
        this.utilMenu =     $('.js-nav-util-menu');

        console.log('Header ID -->' + domAdjust.header.attr('id'))

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
            // .addClass('cover')
            .prependTo(domAdjust.wrapper);

        // remove original 'header'
        domAdjust.header.remove();

        // add signature logo to all panels
        domAdjust.signature.appendTo(domAdjust.panels);

        // relocate 'contact' panel
        domAdjust.contact.appendTo('body');

        // hide all non required markup
        domAdjust.hidden.hide();
    
    }
}

module.exports = domAdjust;