'use strict';

// Destination
var dest = 'build/assets/';

var vendorFiles = [

  'src/bower_components/angular/angular.js',
  'src/bower_components/angular-route/angular-route.js',
  'src/bower_components/api-check/dist/api-check.js',
  'src/bower_components/angular-formly/dist/formly.js',
  'src/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
  'src/bower_components/angular-jwt/dist/angular-jwt.js'

];

// Source JS files
var srcFiles = [

];

var jsFiles = vendorFiles.concat(srcFiles);

// Source SCSS files
var sassFiles = [
  '!src/app/**/_*.scss',
  'src/sass/**/*.scss',
  'src/app/**/*.scss'
]

// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsdoc = require('gulp-jsdoc3');
var Server = require('karma').Server;
var addStream = require('add-stream');
var angularTemplateCache = require('gulp-angular-templatecache');
var protractor = require('gulp-protractor');

// Concatenate/Uglify JS Files
gulp.task('scripts', ['css'], function() {
  return gulp
    .src(jsFiles)
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest(dest + 'js'));
});

// Linting
gulp.task('lint', ['scripts', 'css', 'docs'], function() {
  return gulp
    .src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

// Code styling
gulp.task('style', ['scripts', 'css', 'docs', 'lint'], function() {
  return gulp
    .src(srcFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// Clear template
gulp.task('clean-template', function() {
  return gulp.src('build/assets/js/templates.js', {read: false})
    .pipe(clean());
});

// Compile CSS from SCSS files
gulp.task('css', function() {
  return gulp
    .src(sassFiles)
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(dest + 'css'));
});

// Documentation (JSDoc)
gulp.task('docs', ['scripts'], function(callback) {
  return gulp.src([]);
  //There is a bug, need to revisit [Tamas]
  //gulp.src(srcFiles, {read: false}).pipe(jsdoc(callback));
});

// Unit Testing
// gulp.task('test', function(done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

gulp.task('test', function(done) {
  Server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

// Angular Template Cache
function prepareTemplates() {
  return gulp.src('src/app/**/*.tpl.html')
    .pipe(angularTemplateCache());
}

//e2e testing
gulp.task('webdriver_update', protractor.webdriver_update);

// this run following task will keep running indefinitely.
gulp.task('webdriver_standalone', ['webdriver_update'], protractor.webdriver_standalone);

gulp.task('e2e', ['webdriver_update'], function(done) {
  gulp.src(['src/test/**/*.spec.js'])
    .pipe(protractor.protractor({
      configFile: 'src/test/protractor.conf.js'
    }), done());
});

// Watcher
gulp.task('watch', ['scripts', 'css', 'lint', 'style', 'docs'], function() {
  gulp.watch(srcFiles, ['lint', 'style', 'docs', 'scripts']);
  gulp.watch('src/app/**/*.tpl.html', ['lint', 'style', 'docs', 'scripts']);
  gulp.watch(sassFiles, ['css']);
});

// Default Task
gulp.task('default', ['scripts', 'css', 'lint', 'style', 'docs', 'watch']);

// Deployment Task
gulp.task('deploy', ['scripts', 'css', 'lint', 'style', 'docs']);