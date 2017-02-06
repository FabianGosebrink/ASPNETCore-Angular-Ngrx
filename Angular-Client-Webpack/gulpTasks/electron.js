var gulp = require('gulp');
var runSeq = require('run-sequence');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');
var path = require('path');
var del = require('del');

var buildConfig = require('../gulp.config');

gulp.task('build:electron:prod', function (done) {
    runSeq(
        'electron-clean-temp',
        'electron-clean-dist',
        'electron-copy-assets-to-temp-folder',
        'electron-copy-web-to-temp-folder',
        'electron-build-win',
        'electron-build-linux',
        done);
});

gulp.task('electron-clean-temp', function (done) {
    return del(buildConfig.temp.electronTempFolder, { force: true }, done);
});

gulp.task('electron-clean-dist', function (done) {
    return del(buildConfig.temp.electronOutputPath, { force: true }, done);
});

gulp.task('electron-copy-web-to-temp-folder', function (done) {
    return gulp.src(path.join(buildConfig.sources.webSource, '**/*.*'))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-copy-assets-to-temp-folder', function (done) {
    return gulp.src(buildConfig.assets.electron + '*.*')
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-build-win', function (done) {
    return gulp.src(path.join(buildConfig.temp.electronTempFolder, '**', '*'))
        .pipe(electron({
            version: '1.4.13',
            platform: 'win32',
            companyName: 'Offering Solutions',
            linuxExecutableName: buildConfig.general.appName,
        }))
        .pipe(symdest(buildConfig.targets.electronOutputPath + 'win'));
});

gulp.task('electron-build-linux', function (done) {
    return gulp.src(path.join(buildConfig.temp.electronTempFolder, '**', '*'))
        .pipe(electron({
            version: '1.4.2',
            platform: 'linux',
            companyName: 'Offering Solutions',
            linuxExecutableName: buildConfig.general.appName,
        }))
        .pipe(symdest(buildConfig.targets.electronOutputPath + 'linux'));
});

