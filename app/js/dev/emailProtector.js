'use strict';

// 
// Convert e-mails written with "[at]" into working e-mail links
// 
var emailProtector = {
    init: function() {

        this.hookClass = 'js-email';
        this.emails = $('.' + this.hookClass);
        
        $(this.emails).each(function(i){
            var emailText = $(this).text(),
                emailLink = emailText.replace(/\s*\{.+\}\s*/, "@"),
                newTag = $('<a href="mailto:' + emailLink +'">').text(emailText);

            // remove hookClass
            $(this).removeClass(emailProtector.hookClass);

            // get class names if any
            var emailClasses = $(this).attr('class');

            // insert class names
            if(emailClasses.length > 0) {
                newTag.attr('class', emailClasses);
            }

            $(this).after(newTag).remove();

            console.log(
                'emailText = ' + emailText + '\n' +
                'emailLink = ' + emailLink + '\n' +
                'emailClasses = ' + emailClasses.length
            );

        });
    }
}

module.exports = emailProtector;