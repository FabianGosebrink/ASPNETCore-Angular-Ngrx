(function () {

    'use strict';

    var foodList = {
        bindings: {
            foods: '<',
            onDelete: '&',
            onEdit: '&'
        },
        templateUrl: 'app/components/food/food-list/food-list.template.html',
        controller: 'foodListController'
    };

    angular
        .module('components.food')
        .component('foodlist', foodList);
})();
