'use strict';

module.exports = {
    general: {
        appName: "FoodChooserAppAngular2",
        rootFolder: "app/",
        indexHtml: "./index.html"
    },
    assets: {
        electron: "../assets/electron/",
        cordova: "../assets/cordova/",
        shared: "../assets/shared/"
    },
    sources: {
        sourceFolder: "src/",
        webpackConfig: '../webpack.config.js',
        appEntryPoint: './app/main.js',
        allAppJsFiles: [
            "./app/*.js",
            "./app/*/**/*.js",
        ],
        allAppHtmlFiles: [
            "./app/**/*.html"
        ],
        allVendorJsFiles: [
            "./js/*.js"
        ],
        allAppCssFiles: [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./css/*.css"
        ],
        allAppImgFiles: [
            "./img/*.*",
            "./img/windows/*.*"
        ],
        vendorScripts: [
            "node_modules/zone.js/dist/zone.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/jquery/dist/jquery.js",
            "node_modules/bootstrap/dist/js/bootstrap.js"
        ],
        allAngular2: [
            "node_modules/@angular/**/*.js"
        ],
        allRxJs: [
            "node_modules/rxjs/**/*.js"
        ],
        filesToCopyAsIsCordova: [
            "js/winstore-jscompat.js",
            "node_modules/es6-shim/es6-shim.min.js"
        ]
    },
    temp: {
        electronTempFolder: "../.temp/electron/",
        cordova: "../.temp/cordova/",
        cordovaWww: "../.temp/cordova/www/",
        web: "../.temp/web/",
    },
    targets: {
        vendorScriptsMinFileName: "vendor.min.js",
        webOutputPath: "./.dist/web/",
        electronOutputPath: "./.dist/electron/",
        cordovaOutputPath: "./.dist/cordova/",
        scriptsOutputPath: "./.dist/web/scripts/",
        cssOutputPath: "./.dist/web/css/"
    }
};