(function () {
    'use strict';

    angular
        .module('components.food')
        .controller('foodListController', foodListController);

    foodListController.$inject = [];

    function foodListController() {
        var ctrl = this;

        ctrl.deleteFood = function (foodToDelete) {
            ctrl.onDelete({
                $event: {
                    food: foodToDelete
                }
            });
        };

        ctrl.setFoodItemForEdit = function (foodItem) {
            ctrl.onEdit({
                $event: {
                    food: foodItem
                }
            });
        }
    }
})();
