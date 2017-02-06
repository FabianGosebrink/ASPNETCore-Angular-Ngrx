'use strict';

module.exports = {
    general: {
        appName: 'FoodChooserAppAngular',
        rootFolder: 'app/',
        indexHtml: './index.html'
    },
    assets: {
        electron: './assets/electron/',
        cordova: './assets/cordova/'
    },
    sources: {
        allAppImgFiles: [
            './img/*.*',
            './img/windows/*.*'
        ],
        webSource: '.dist/web/aot/'
    },
    temp: {
        electronTempFolder: '.temp/electron/',
        cordova: '.temp/cordova/'
    },
    targets: {
        electronOutputPath: './.dist/desktop/',
        cordovaOutputPath: './.dist/mobile/'
    }
};