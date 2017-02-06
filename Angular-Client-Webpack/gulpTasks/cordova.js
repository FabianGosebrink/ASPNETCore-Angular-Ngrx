var gulp = require('gulp');
var runSeq = require('run-sequence');
var path = require('path');
var sh = require('shelljs');
var del = require('del');
var inject = require('gulp-inject');

var buildConfig = require('../gulp.config');

gulp.task('build:apps', function (done) {
    runSeq(
        'cordova-clean-temp',
        'cordova-clean-dist',
        'cordova-copy-config-to-temp',
        'cordova-copy-winstore-to-temp',
        'cordova-copy-web-to-temp-folder',
        'cordova-inject-in-html',
        'cordova-build-windows',
        'cordova-build-android',
        'cordova-copy-to-dist',
        done);
});

gulp.task('cordova-clean-temp', function (done) {
    return del(buildConfig.temp.cordova, { force: true }, done);
});

gulp.task('cordova-clean-dist', function (done) {
    return del(buildConfig.targets.cordovaOutputPath, { force: true }, done);
});

gulp.task('cordova-copy-config-to-temp', function () {
    var configFile = path.join(buildConfig.assets.cordova, 'config.xml');

    return gulp.src([
        configFile
    ])
        .pipe(gulp.dest(buildConfig.temp.cordova));
});

gulp.task('cordova-copy-winstore-to-temp', function () {
    var winStore = path.join(buildConfig.assets.cordova, 'winstore-jscompat.js');

    return gulp.src([
        winStore
    ])
        .pipe(gulp.dest(path.join(buildConfig.temp.cordova, 'www', 'js')));
});

gulp.task('cordova-copy-web-to-temp-folder', function (done) {
    return gulp.src(path.join(buildConfig.sources.webSource, '**/*.*'))
        .pipe(gulp.dest(path.join(buildConfig.temp.cordova, 'www')));
});

gulp.task('cordova-inject-in-html', function (done) {
    var target = gulp.src(
        path.join(buildConfig.temp.cordova, 'www', 'index.html'));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.temp.cordova, 'www', 'js', 'winstore-jscompat.js')
    );


    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: path.join(buildConfig.temp.cordova, 'www'),
        addRootSlash: false
    }))
        .pipe(gulp.dest(path.join(buildConfig.temp.cordova, 'www')));
});

gulp.task('cordova-build-windows', function (done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add windows');
    sh.exec('cordova build windows');
    sh.cd('../..');
    done();
});

gulp.task('cordova-build-android', function (done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add android');
    sh.exec('cordova build android');
    sh.cd('../..');
    done();
});

gulp.task('cordova-copy-to-dist', function (done) {
    var sourceFolder = path.join(buildConfig.temp.cordova, 'platforms', '**', '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(buildConfig.targets.cordovaOutputPath));
});