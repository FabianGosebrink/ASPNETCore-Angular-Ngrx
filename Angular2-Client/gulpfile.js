var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var path = require("path");
var sysBuilder = require('systemjs-builder');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var embedTemplates = require('gulp-angular-embed-templates');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

const tscConfig = require('./tsconfig.json');

gulp.task('default', ['build:web']);
// gulp.task('help', taskListing.withFilters(/-/));

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
        'web-clean-temp-folder',
        done);
});

gulp.task('web-compile-typescript', function () {
    return gulp
        .src('.tmp/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/app/'));
});

gulp.task('web-clean-dist-folder', function (done) {
    del('./.dist', { force: true }).then(function () {
        done();
    });
});

gulp.task('web-clean-temp-folder', function (done) {
    del('./.tmp', { force: true }).then(function () {
        done();
    });
});

gulp.task('web-copy-app-to-temp', function (done) {
    return gulp.src(['app/**/*.*', '!app/**/*.spec.ts'])
        .pipe(gulp.dest('.tmp/app/'));
});

gulp.task('web-copy-angular2', function (done) {
    return gulp.src('node_modules/@angular/**/*.*')
        .pipe(gulp.dest('./.tmp/lib/@angular/'));
});

gulp.task('web-build-app', function (done) {
    var builder = new sysBuilder('.tmp', './.tmp/systemjs.config.js');
    return builder.buildStatic('app', '.dist/js/app.min.js', { minify: true })
        .catch(function (err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('web-embed-templates', function (done) {
    return gulp.src('.tmp/app/**/*.js')
        .pipe(embedTemplates({ sourceType: 'js' }))
        .pipe(gulp.dest('.tmp/app/'));

});

gulp.task('web-copy-rxjs', function (done) {
    return gulp.src('node_modules/rxjs/**/*.*')
        .pipe(gulp.dest('./.tmp/lib/rxjs/'));
});

gulp.task('web-copy-others', function (done) {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/jquery/dist/jquery.js',
        './assets/systemjs.config.js',
    ])
        .pipe(gulp.dest('./.tmp/lib/'));
});

gulp.task('web-copy-systemjs', function (done) {
    return gulp.src('./assets/systemjs.config.js')
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('web-copy-app', function (done) {
    return gulp.src('./app/**/*.*')
        .pipe(gulp.dest('./.dist/app/'));
});

gulp.task('web-copy-fonts', function (done) {
    return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('./.dist/fonts/'));
});

gulp.task('web-copy-index-html', function (done) {
    return gulp.src(['./index.html', './favicon.ico'])
        .pipe(gulp.dest('./.dist/'));
});

gulp.task('web-vendor', function (done) {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./.dist/js/'));
});

gulp.task('web-copy-css', function (done) {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        './css/*.css'
    ])
        .pipe(concat("styles.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./.dist/css/'));
});

gulp.task('web-inject', function (done) {
    var target = gulp.src('./.dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([
        './.dist/js/vendor.js',
        './.dist/js/app.min.js',
        './.dist/css/*.css'
    ], { read: false });

    return target.pipe(inject(sources, {
        ignorePath: ".dist/",
        addRootSlash: false
    }))
        .pipe(gulp.dest('./.dist/'));
});