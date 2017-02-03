var gulp = require('gulp');
var runSeq = require('run-sequence');
var path = require('path');
var sh = require('shelljs');
var del = require('del');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var embedTemplates = require('gulp-angular-embed-templates');
var sysBuilder = require('systemjs-builder');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

const tscConfig = require('../tsconfig.json');
const buildConfig = require('../gulp.config');

gulp.task('build:apps', function (done) {
    runSeq(
        'cordova-clean-temp',
        'cordova-clean-dist',
        'cordova-copy-app-to-temp',
        'cordova-compile-typescript',
        'cordova-embed-templates',
        'cordova-copy-angular2',
        'cordova-copy-rxjs',
        'cordova-copy-systemjs',
        'cordova-copy-others',
        'cordova-build-app',
        'cordova-copy-index-html',
        'cordova-copy-config-to-temp',
        'cordova-copy-winstore-to-temp',
        'cordova-copy-css',
        'cordova-copy-fonts',
        'cordova-vendor',
        'cordova-inject-in-html',
        'cordova-build-windows',
        'cordova-build-android',
        'cordova-copy-to-dist',
        'cordova-delete-temp-folder',
        done);
});

gulp.task('cordova-clean-temp', function (done) {
    return del(buildConfig.targets.tempCordova, { force: true }, done);
});

gulp.task('cordova-clean-dist', function (done) {
    return del(buildConfig.targets.distCordova, { force: true }, done);
});

gulp.task('cordova-copy-app-to-temp', function (done) {
    return gulp.src(buildConfig.sources.allAppFiles)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'app')));
});

gulp.task('cordova-compile-typescript', function () {
    return gulp
        .src(path.join(buildConfig.targets.tempCordova, buildConfig.sources.allAppTsFiles))
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'app')));
});

gulp.task('cordova-embed-templates', function (done) {
    return gulp.src(path.join(buildConfig.targets.tempCordova, buildConfig.sources.allAppJsFiles))
        .pipe(embedTemplates({ sourceType: 'js' }))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'app')));

});

gulp.task('cordova-copy-angular2', function (done) {
    return gulp.src(buildConfig.sources.allAngular)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'lib', '@angular')));

});

gulp.task('cordova-copy-rxjs', function (done) {
    return gulp.src(buildConfig.sources.allRxJS)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'lib', 'rxjs')));
});

gulp.task('cordova-copy-systemjs', function (done) {
    return gulp.src(buildConfig.assets.systemJsConfigProd)
        .pipe(gulp.dest(buildConfig.targets.tempCordova));
});

gulp.task('cordova-copy-others', function (done) {
    return gulp.src(buildConfig.sources.vendorAppJs)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'lib')));
});

gulp.task('cordova-build-app', function (done) {
    var builder = new sysBuilder(buildConfig.targets.tempCordova, path.join(buildConfig.targets.tempCordova, 'systemjs.config.js'));

    return builder.buildStatic('app', path.join(buildConfig.targets.tempCordova, 'www', 'js', buildConfig.fileNames.minApp), { minify: true })
        .catch(function (err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('cordova-copy-index-html', function (done) {
    return gulp.src([
        buildConfig.sources.indexHtml,
        buildConfig.sources.favIcon
    ])
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'www')));
});

gulp.task('cordova-copy-config-to-temp', function () {
    var configFile = path.join(buildConfig.assets.cordova, 'config.xml');

    return gulp.src([
        configFile
    ])
        .pipe(gulp.dest(buildConfig.targets.tempCordova));
});

gulp.task('cordova-copy-winstore-to-temp', function () {
    var winStore = path.join(buildConfig.assets.cordova, 'winstore-jscompat.js');

    return gulp.src([
        winStore
    ])
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'www', 'js')));
});

gulp.task('cordova-copy-css', function (done) {
    return gulp.src([
        buildConfig.sources.vendorCss,
        buildConfig.sources.appCss,
    ])
        .pipe(concat(buildConfig.fileNames.minStyles))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'www', 'css')));
});

gulp.task('cordova-copy-fonts', function (done) {
    return gulp.src(buildConfig.sources.allFonts)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'www', 'fonts')));
});

gulp.task('cordova-vendor', function (done) {
    return gulp.src(buildConfig.sources.vendorAngularJs)
        .pipe(concat(buildConfig.fileNames.minVendor))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildConfig.targets.tempCordova, 'www', 'js')));
});

gulp.task('cordova-inject-in-html', function (done) {
    var target = gulp.src(path.join(buildConfig.targets.tempCordova, 'www', 'index.html'));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.targets.tempCordova, 'www', 'js', 'winstore-jscompat.js')
    );

    sourcesToInject.push(
        path.join(buildConfig.targets.tempCordova,
            'www', 'js',
            buildConfig.fileNames.minVendor),
        path.join(buildConfig.targets.tempCordova,
            'www', 'js',
            buildConfig.fileNames.minApp));

    sourcesToInject.push(
        path.join(buildConfig.targets.tempCordova, 'www',
            'css', buildConfig.fileNames.minStyles)
    );

    var wwwpath = path.join(buildConfig.targets.tempCordova, 'www');

    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: wwwpath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(wwwpath));
});

gulp.task('cordova-build-windows', function (done) {
    sh.cd(buildConfig.targets.tempCordova);
    sh.exec('cordova platform add windows');
    sh.exec('cordova build windows');
    sh.cd('../..');
    done();
});

gulp.task('cordova-build-android', function (done) {
    sh.cd(buildConfig.targets.tempCordova);
    sh.exec('cordova platform add android');
    sh.exec('cordova build android');
    sh.cd('../..');
    done();
});

gulp.task('cordova-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.targets.tempCordova, 'platforms', "**", '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(path.join(buildConfig.targets.distCordova, 'apps')));
});

gulp.task('cordova-delete-temp-folder', function (done) {
    del(buildConfig.targets.tempMain, { force: true }).then(function () {
        done();
    });
});