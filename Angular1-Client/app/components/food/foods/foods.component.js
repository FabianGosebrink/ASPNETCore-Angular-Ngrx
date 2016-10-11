(function () {

    'use strict';

    var foods = {
        templateUrl: 'app/components/food/foods/foods.template.html',
        controller: 'foodsController'
    };

    angular
        .module('components.food')
        .component('foods', foods)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('foods', {
                        url: '/foods',
                        component: 'foods',
                    });
            }]);
})();
