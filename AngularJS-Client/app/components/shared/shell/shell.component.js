(function () {

    'use strict';

    var shell = {
        templateUrl: 'app/components/shared/shell/shell.template.html'
    };

    angular
        .module('components.shared')
        .component('shell', shell);
})();
