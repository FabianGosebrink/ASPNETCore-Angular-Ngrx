'use strict';

module.exports = {
    application: {
        indexHtml: './index.html',
        rootModuleName: 'AngularJsDemoApp',
        allModules: [
            './app/**/*.module.js',
        ],
        allComponents: [
            './app/**/*.component.js',
        ],
        allControllers: [
            './app/**/*.controller.js',
        ],
        allServices: [
            './app/**/*.service.js',
        ],
        allTemplates: [
            './app/**/*.html',
        ],
        allStyles: [
            './css/*.css',
        ]
    },
    vendor: {
        allJs: [
            './node_modules/angular/angular.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/angular-loading-bar/build/loading-bar.js',
            './node_modules/angular-toastr/dist/angular-toastr.tpls.js'
        ],
        allCss: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            './node_modules/angular-loading-bar/build/loading-bar.css',
            './node_modules/angular-toastr/dist/angular-toastr.css'
        ],
        allFonts: './node_modules/bootstrap/fonts/*.*'
    },
    targets: {
        distributionFolder: '.dist/',
        templateJsFileName: 'templates.js'
    },
};