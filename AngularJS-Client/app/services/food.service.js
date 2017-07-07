(function () {
    'use strict';

    angular
        .module('services')
        .factory('foodService', foodService);

    foodService.$inject = ['$http', 'appSettings'];

    /* @ngInject */
    function foodService($http, appSettings) {

        var url = appSettings.serverPath + 'api/foods/';
        //var url = 'api/foodItems.json';

        var _getAllFood = function () {
            return $http.get(url);
        };

        var _getSingleFood = function (id) {
            return $http.get(url + id);
        };

        var _updateFood = function (foodToUpdate) {
            return $http.put(url + foodToUpdate.id, foodToUpdate);
        };

        var _addFood = function (newFoodToAdd) {
            newFoodToAdd.created = new Date();
            console.log(newFoodToAdd);
            return $http.post(url, newFoodToAdd);
        };

        var _deleteFood = function (foodToDelete) {
            return $http.delete(url + foodToDelete.id);
        };

        return {
            getAllFood: _getAllFood,
            getSingleFood: _getSingleFood,
            addFood: _addFood,
            updateFood: _updateFood,
            deleteFood: _deleteFood
        };
    }
})();
