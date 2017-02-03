(function () {

    'use strict';

    var homeComponent = {
        templateUrl: 'app/components/home/home/home.template.html',
        controller: 'homeController'
    };

    angular
        .module('components.home')
        .component('homeComponent', homeComponent)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        component: 'homeComponent',
                    });
            }]);
})();
