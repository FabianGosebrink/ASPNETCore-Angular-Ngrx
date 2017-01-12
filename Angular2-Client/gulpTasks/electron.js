var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var path = require('path');
var sysBuilder = require('systemjs-builder');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var embedTemplates = require('gulp-angular-embed-templates');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');

const tscConfig = require('../tsconfig.json');
const buildConfig = require('../gulp.config');

gulp.task('build:electron', function (done) {
    runSeq(
        'electron-clean-dist-folder',
        'electron-clean-temp-folder',
        'electron-copy-app-to-temp',
        'electron-compile-typescript',
        'electron-embed-templates',
        'electron-copy-angular2',
        'electron-copy-rxjs',
        'electron-copy-systemjs',
        'electron-copy-others',
        'electron-build-app',
        'electron-copy-index-html',
        'electron-copy-css',
        'electron-copy-fonts',
        'electron-vendor',
        'electron-copy-assets-to-temp-folder',
        'electron-copy-jquery-to-temp-folder',
        'electron-inject',
        'electron-build-win',
        'electron-build-linux',
        'electron-clean-temp-folder',
        'electron-delete-temp-folder',
        done);
});

gulp.task('electron-clean-dist-folder', function (done) {
    del(buildConfig.targets.distElectron, { force: true }).then(function () {
        done();
    });
});

gulp.task('electron-clean-temp-folder', function (done) {
    del(buildConfig.targets.tempElectron, { force: true }).then(function () {
        done();
    });
});

gulp.task('electron-delete-temp-folder', function (done) {
    del(buildConfig.targets.tempMain, { force: true }).then(function () {
        done();
    });
});

gulp.task('electron-copy-app-to-temp', function (done) {
    return gulp.src(buildConfig.sources.allAppFiles)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'app')));
});

gulp.task('electron-compile-typescript', function () {
    return gulp
        .src(path.join(buildConfig.targets.tempElectron, buildConfig.sources.allAppTsFiles))
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'app')));
});

gulp.task('electron-embed-templates', function (done) {
    return gulp.src(path.join(buildConfig.targets.tempElectron, buildConfig.sources.allAppJsFiles))
        .pipe(embedTemplates({ sourceType: 'js' }))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'app')));

});

gulp.task('electron-copy-angular2', function (done) {
    return gulp.src(buildConfig.sources.allAngular)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'lib', '@angular')));

});

gulp.task('electron-copy-rxjs', function (done) {
    return gulp.src(buildConfig.sources.allRxJS)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'lib', 'rxjs')));
});

gulp.task('electron-copy-systemjs', function (done) {
    return gulp.src(buildConfig.assets.systemJsConfigProd)
        .pipe(gulp.dest(buildConfig.targets.tempElectron));
});

gulp.task('electron-copy-others', function (done) {
    return gulp.src(buildConfig.sources.vendorAppJs)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'lib')));
});

gulp.task('electron-build-app', function (done) {
    var builder = new sysBuilder(buildConfig.targets.tempElectron, path.join(buildConfig.targets.tempElectron, 'systemjs.config.js'));

    return builder.buildStatic('app', path.join(buildConfig.targets.tempElectron, 'toBuild', 'js', buildConfig.fileNames.minApp), { minify: true })
        .catch(function (err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('electron-copy-index-html', function (done) {
    return gulp.src([
        buildConfig.sources.indexHtml,
        buildConfig.sources.favIcon
    ])
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild')));
});

gulp.task('electron-copy-css', function (done) {
    return gulp.src([
        buildConfig.sources.vendorCss,
        buildConfig.sources.appCss,
    ])
        .pipe(concat(buildConfig.fileNames.minStyles))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild', 'css')));
});

gulp.task('electron-copy-fonts', function (done) {
    return gulp.src(buildConfig.sources.allFonts)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild', 'fonts')));
});

gulp.task('electron-vendor', function (done) {
    return gulp.src(buildConfig.sources.vendorAngularJs)
        .pipe(concat(buildConfig.fileNames.minVendor))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild', 'js')));
});

gulp.task('electron-inject', function (done) {
    var target = gulp.src(path.join(buildConfig.targets.tempElectron, 'toBuild', buildConfig.sources.indexHtml));
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([
        path.join(buildConfig.targets.tempElectron, 'toBuild', 'js', 'loadjQuery.js'),
        path.join(buildConfig.targets.tempElectron, 'toBuild', 'js', buildConfig.fileNames.minVendor),
        path.join(buildConfig.targets.tempElectron, 'toBuild', 'js', buildConfig.fileNames.minApp),
        path.join(buildConfig.targets.tempElectron, 'toBuild', 'css', buildConfig.fileNames.minStyles)
    ], { read: false });

    return target.pipe(inject(sources, {
        ignorePath: path.join(buildConfig.targets.tempElectron, 'toBuild'),
        addRootSlash: false
    }))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild')));
});

gulp.task('electron-copy-assets-to-temp-folder', function (done) {
    return gulp.src([
        path.join(buildConfig.assets.electron, 'index.js'),
        path.join(buildConfig.assets.electron, 'package.json')
    ])
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild')));
});

gulp.task('electron-copy-jquery-to-temp-folder', function (done) {

    var sourcesToCopy = [
        buildConfig.assets.electronloadjQuery,
        'node_modules/jquery/dist/jquery.min.js'
    ];

    return gulp.src(sourcesToCopy)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempElectron, 'toBuild', 'js')));
});

gulp.task('electron-build-win', function (done) {
    return gulp.src(path.join(buildConfig.targets.tempElectron, 'toBuild', '**', '*'))
        .pipe(electron({
            version: '1.4.2',
            platform: 'win32',
            companyName: 'Offering Solutions',
            linuxExecutableName: buildConfig.general.appName,
        }))
        .pipe(symdest(buildConfig.targets.distElectron + 'windows'));
});

gulp.task('electron-build-linux', function (done) {
    return gulp.src(path.join(buildConfig.targets.tempElectron, 'toBuild', '**', '*'))
        .pipe(electron({
            version: '1.4.2',
            platform: 'linux',
            companyName: 'Offering Solutions',
            linuxExecutableName: buildConfig.general.appName,
        }))
        .pipe(symdest(buildConfig.targets.distElectron + 'linux'));
});