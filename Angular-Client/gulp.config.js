'use strict';

module.exports = {
    general: {
        appName: 'AngularFoodChooser',
    },
    assets: {
        electron: './assets/electron/',
        cordova: './assets/cordova/',
        systemJsConfigProd: './assets/systemjs.config.js',
        electronloadjQuery: './assets/electron/loadjQuery.js'
    },
    sources: {
        allAppFiles: ['app/**/*.*', '!app/**/*.spec.ts'],
        allAppTsFiles: 'app/**/*.ts',
        allAppJsFiles: 'app/**/*.js',

        allAngular: 'node_modules/@angular/**/*.*',
        allRxJS: 'node_modules/rxjs/**/*.*',
        vendorAppJs: [
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/jquery/dist/jquery.js'
        ],
        vendorAngularJs: [
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ],
        allFonts: 'node_modules/bootstrap/dist/fonts/*.*',
        vendorCss: 'node_modules/bootstrap/dist/css/bootstrap.css',
        appCss: './css/*.css',
        indexHtml: 'index.html',
        favIcon: 'favicon.ico',
    },
    targets: {
        distWeb: '.dist/web/',
        distElectron: './.dist/desktop/',
        distCordova: './.dist/mobile/',
        tempMain: './.tmp/',
        tempWeb: './.tmp/web/',
        tempElectron: './.tmp/electron/',
        tempCordova: './.tmp/mobile/',
    },
    fileNames: {
        minVendor: 'vendor.min.js',
        minApp: 'app.min.js',
        minStyles: 'styles.min.css'
    }
};