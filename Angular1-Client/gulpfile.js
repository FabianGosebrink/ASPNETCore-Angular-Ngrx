var gulp = require('gulp');
var runSeq = require('run-sequence');
var concat = require('gulp-concat');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var taskListing = require('gulp-task-listing');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var path = require('path');
var templateCache = require('gulp-angular-templatecache');

var buildConfig = require('./gulp.config');

gulp.task('default', ['help']);
gulp.task('help', taskListing.withFilters(/-/));


gulp.task('build:web', function (done) {
    runSeq(
        'web-clean-dist-folder',
        'web-copy-index-to-dist-folder',
        'web-copy-fonts-to-dist-folder',
        'web-concat-uglify-app-js-and-copy-to-dist',
        'web-concat-uglify-vendor-js-and-copy-to-dist',
        'web-concat-uglify-app-css-and-copy-to-dist',
        'web-concat-uglify-vendor-css-and-copy-to-dist',
        'web-create-templates',
        'web-inject-in-html',
        done);
});

gulp.task('web-clean-dist-folder', function (done) {
    del(buildConfig.targets.distributionFolder, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-copy-index-to-dist-folder', function (done) {
    return gulp.src(buildConfig.application.indexHtml)
        .pipe(gulp.dest(buildConfig.targets.distributionFolder));
});

gulp.task('web-copy-fonts-to-dist-folder', function (done) {
    return gulp.src(buildConfig.vendor.allFonts)
        .pipe(gulp.dest(path.join(buildConfig.targets.distributionFolder, 'fonts')));
});

gulp.task('web-concat-uglify-app-js-and-copy-to-dist', function (done) {

    var compeleteApp = [].concat(
        buildConfig.application.allModules,
        buildConfig.application.allComponents,
        buildConfig.application.allControllers,
        buildConfig.application.allServices
    );

    return gulp.src(compeleteApp)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.distributionFolder + '/js/'));
});

gulp.task('web-concat-uglify-vendor-js-and-copy-to-dist', function (done) {
    return gulp.src(buildConfig.vendor.allJs)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.distributionFolder + '/js/'));
});

gulp.task('web-concat-uglify-app-css-and-copy-to-dist', function (done) {

    return gulp.src(buildConfig.application.allStyles)
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildConfig.targets.distributionFolder + '/css/'));
});

gulp.task('web-concat-uglify-vendor-css-and-copy-to-dist', function (done) {

    return gulp.src(buildConfig.vendor.allCss)
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildConfig.targets.distributionFolder + '/css/'));
});

gulp.task('web-inject-in-html', function (done) {
    var target = gulp.src(
        path.join(buildConfig.targets.distributionFolder, 'index.html'));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.targets.distributionFolder, '/js/vendor.js'),
        path.join(buildConfig.targets.distributionFolder, '/js/app.js'),
        path.join(buildConfig.targets.distributionFolder, '/js/templates.js')
    );

    sourcesToInject.push(
        path.join(buildConfig.targets.distributionFolder, '/css/vendor.css'),
        path.join(buildConfig.targets.distributionFolder, '/css/app.css')
    );

    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.distributionFolder,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.distributionFolder));
});

gulp.task('web-create-templates', function () {
    return gulp.src(buildConfig.application.allTemplates)
        .pipe(templateCache(buildConfig.targets.templateJsFileName, {
            root: 'app/',
            module: buildConfig.application.rootModuleName
        }))
        .pipe(gulp.dest(buildConfig.targets.distributionFolder + '/js/'));
});