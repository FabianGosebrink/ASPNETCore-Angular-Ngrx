(function () {
    'use strict';

    angular
        .module('components.food')
        .controller('foodFormController', foodFormController);

    foodFormController.$inject = [];

    function foodFormController() {
        var ctrl = this;

        ctrl.$onChanges = function (changes) {
            if (changes.food) {
                this.food = Object.assign({}, changes.food.currentValue);
            }
        };

        ctrl.saveFood = function () {
            if (ctrl.food.id) {
                ctrl.onUpdate({
                    $event: {
                        food: ctrl.food
                    }
                });
            } else {
                ctrl.onAdd({
                    $event: {
                        food: ctrl.food
                    }
                });
            }
        };
    }
})();
