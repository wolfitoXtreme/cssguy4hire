'use strict';

// 
// Convert e-mails written with "[at]" into working e-mail links
// 
var emailProtector = {
    init: function() {
        this.emails = $('.email');
        $(this.emails).each(function(i){
            var emailText = $(this).text(),
                emailLink = emailText.replace(/\s*\{.+\}\s*/, "@");

            $(this).after('<a href="mailto:' + emailLink +'" class="contactLink">' + emailText + '</a>').remove();

            console.log(emailText);
            console.log(emailLink);

        });
    }
}

module.exports = emailProtector;