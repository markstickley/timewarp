var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    // debug = require('gulp-debug'),
    clone = require('gulp-clone'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream'),
    karma = require('karma'),
    KarmaServer = karma.Server;


// Concatenate & Minify JS
gulp.task('build-scripts', () => {
    var transcodedConcat = gulp.src('src/*.es6')
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('timewarp.js'));

    var minified = transcodedConcat
        .pipe(clone())
        .pipe(rename('timewarp.min.js'))
        .pipe(uglify());

    return merge(transcodedConcat, minified)
        .pipe(gulp.dest('dist'));
});

gulp.task('build-complete-message', () => {
    console.log('Build complete 😊');
});

gulp.task('default', () => {
    console.log("Options: build, test");
});

gulp.task('build', callback => {
    runSequence('build-scripts',
                'test-build',
                'test-build-min',
                'build-complete-message',
                callback);
});

gulp.task('test', done => {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, () => done()).start();
});

gulp.task('test-build', done => {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.build.js',
        singleRun: true
    }, () => done()).start();
});

gulp.task('test-build-min', done => {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.build.min.js',
        singleRun: true
    }, () => done()).start();
});