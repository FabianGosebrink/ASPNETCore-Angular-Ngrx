(function () {

    'use strict';

    var food = {
        bindings: {
            food: '<',
        },
        templateUrl: 'app/components/food/food/food.template.html'
    };

    angular
        .module('components.food')
        .component('food', food);
})();
