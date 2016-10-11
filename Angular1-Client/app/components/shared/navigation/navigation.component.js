(function () {

    'use strict';

    var navigation = {
        templateUrl: 'app/components/shared/navigation/navigation.template.html'
    };

    angular
        .module('components.shared')
        .component('navigation', navigation);
})();
