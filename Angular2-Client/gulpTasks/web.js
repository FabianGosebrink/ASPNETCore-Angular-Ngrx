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

const tscConfig = require('../tsconfig.json');
const buildConfig = require('../gulp.config');

gulp.task('build:web', function (done) {
    runSeq(
        'web-clean-dist-folder',
        'web-clean-temp-folder',
        'web-copy-app-to-temp',
        'web-compile-typescript',
        'web-embed-templates',
        'web-copy-angular2',
        'web-copy-rxjs',
        'web-copy-systemjs',
        'web-copy-others',
        'web-build-app',
        'web-copy-index-html',
        'web-copy-css',
        'web-copy-fonts',
        'web-vendor',
        'web-inject',
        // 'web-clean-temp-folder',
        // 'web-delete-temp-folder',
        done);
});

gulp.task('web-clean-dist-folder', function (done) {
    del(buildConfig.targets.distWeb, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-clean-temp-folder', function (done) {
    del(buildConfig.targets.tempWeb, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-delete-temp-folder', function (done) {
    del(buildConfig.targets.tempMain, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-copy-app-to-temp', function (done) {
    return gulp.src(buildConfig.sources.allAppFiles)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'app')));
});

gulp.task('web-compile-typescript', function () {
    return gulp
        .src(path.join(buildConfig.targets.tempWeb, buildConfig.sources.allAppTsFiles))
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'app')));
});

gulp.task('web-embed-templates', function (done) {
    return gulp.src(path.join(buildConfig.targets.tempWeb, buildConfig.sources.allAppJsFiles))
        .pipe(embedTemplates({ sourceType: 'js' }))
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'app')));

});

gulp.task('web-copy-angular2', function (done) {
    return gulp.src(buildConfig.sources.allAngular)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'lib', '@angular')));

});

gulp.task('web-copy-rxjs', function (done) {
    return gulp.src(buildConfig.sources.allRxJS)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'lib', 'rxjs')));
});

gulp.task('web-copy-systemjs', function (done) {
    return gulp.src(buildConfig.assets.systemJsConfigProd)
        .pipe(gulp.dest(buildConfig.targets.tempWeb));
});

gulp.task('web-copy-others', function (done) {
    return gulp.src(buildConfig.sources.vendorAppJs)
        .pipe(gulp.dest(path.join(buildConfig.targets.tempWeb, 'lib')));
});

gulp.task('web-build-app', function (done) {
    var builder = new sysBuilder(buildConfig.targets.tempWeb, path.join(buildConfig.targets.tempWeb, 'systemjs.config.js'));

    return builder.buildStatic('app', path.join(buildConfig.targets.distWeb, 'js', buildConfig.fileNames.minApp), { minify: true })
        .catch(function (err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('web-copy-index-html', function (done) {
    return gulp.src([
        buildConfig.sources.indexHtml,
        buildConfig.sources.favIcon
    ])
        .pipe(gulp.dest(buildConfig.targets.distWeb));
});

gulp.task('web-copy-css', function (done) {
    return gulp.src([
        buildConfig.sources.vendorCss,
        buildConfig.sources.appCss,
    ])
        .pipe(concat(buildConfig.fileNames.minStyles))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.join(buildConfig.targets.distWeb, 'css')));
});

gulp.task('web-copy-fonts', function (done) {
    return gulp.src(buildConfig.sources.allFonts)
        .pipe(gulp.dest(path.join(buildConfig.targets.distWeb, 'fonts')));
});

gulp.task('web-vendor', function (done) {
    return gulp.src(buildConfig.sources.vendorAngularJs)
        .pipe(concat(buildConfig.fileNames.minVendor))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildConfig.targets.distWeb, 'js')));
});

gulp.task('web-inject', function (done) {
    var target = gulp.src(path.join(buildConfig.targets.distWeb, buildConfig.sources.indexHtml));
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([
        path.join(buildConfig.targets.distWeb, 'js', buildConfig.fileNames.minVendor),
        path.join(buildConfig.targets.distWeb, 'js', buildConfig.fileNames.minApp),
        path.join(buildConfig.targets.distWeb, 'css', buildConfig.fileNames.minStyles)
    ], { read: false });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.distWeb,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.distWeb));
});
