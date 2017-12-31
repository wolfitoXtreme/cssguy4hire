'use strict';

//,
// Add rating dots form a given 'skill' number
// 
var skillsRating = {
    init: function() {
        this.ratingList = $('.js-skills-rating');
        this.ratingItems = this.ratingList.children();
        this.expertiseAmount = 5;
        this.dotWrapper = $('<span class="skills-expertise__item-dots expertise-dots" />');
        this.dot = $('<span class="expertise-dots__dot" />');
        this.fulfilledClass = 'expertise-dots__dot--fulfilled'

        console.log('rating items = ' + this.ratingList.length);

        this.ratingItems.each(function(i){
            var $item = $(this),
                $dotWrapper = skillsRating.dotWrapper.clone(),
                itemExpertise = $(this).data('skill-degree'),
                dotsAmount = skillsRating.expertiseAmount,
                fulfilledClass = skillsRating.fulfilledClass;

            console.log('rating itemExpertise = ' + itemExpertise);

            for(var j = 0; j < dotsAmount; j++) {
                var $dot = skillsRating.dot.clone();

                if(j < itemExpertise) {
                    $dot.addClass(fulfilledClass);
                }

                console.log('rating dots = ' + j);
                $dotWrapper.append($dot);
            }

            $item.append($dotWrapper);
        });

    }
}

module.exports = skillsRating;