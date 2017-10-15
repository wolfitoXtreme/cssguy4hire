// 
// manipulate DOM to create desired layout
//
var domAdjust = {
    init: function() {
        this.header =       $('.js-header'); // original Header
        this.wrapper =      $('.js-panels');
        this.panels =       $('.panel', this.wrapper);
        this.cover =        this.panels.eq(0).clone().empty();
        this.signature =    $('.js-footer').find('.footer-signature').clone();

        console.log('Header ID -->' + domAdjust.header.attr('id'))

        // apply all original 'header' characteristics to 'cover'
        domAdjust.cover
            .html(domAdjust.header.html())
            .attr({
                'id' : domAdjust.header.attr('id'),
                'title' : domAdjust.header.attr('title')
            })
            // .addClass('cover')
            .prependTo(domAdjust.wrapper);

        // remove original 'header'
        domAdjust.header.remove();

        // add signature logo to all panels
        domAdjust.signature.attr('class', 'panel__signature');
        domAdjust.panels.append(domAdjust.signature);
    }
}

module.exports = domAdjust;