(function () {

    'use strict';

    angular
        .module('AngularJsDemoApp', [
            'components',
            'services',

            'angular-loading-bar',
            'toastr'
        ])
        .constant('appSettings',
        {
            serverPath: 'http://localhost:5655/'
        })
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }])
        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                autoDismiss: false,
                containerId: 'toast-container',
                maxOpened: 0,
                newestOnTop: true,
                positionClass: 'toast-bottom-right',
                preventDuplicates: false,
                preventOpenDuplicates: false,
                target: 'body'
            });
        }]);
} ());
