(function () {
    'use strict';

    angular
        .module('components.food')
        .controller('foodDetailController', foodDetailController);

    foodDetailController.$inject = ['$stateParams', 'foodService'];

    function foodDetailController($stateParams, foodService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            foodService.getSingleFood($stateParams.id)
                .then(function (response) {
                    ctrl.food = response.data;
                    console.log(ctrl.food);
                });
        };
    }
})();
