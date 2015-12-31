var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var compress = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var copy = require('gulp-copy');
var del = require('gulp-clean');
var rename = require('gulp-rename');
var beautify = require('gulp-beautify');
var strip = require('gulp-strip-comments');

//gulp.task('default',[])

gulp.task('build', ['jshint','index','extlib','templates','languages'], function() {
  return gulp.src(['src/js/**/module.js', 'src/js/**/routing.js', 'src/js/**/*.js'])
    .pipe(concat('winecards.js'))
    .pipe(beautify())
    .pipe(gulp.dest('dist/app/'))
    .pipe(stripDebug())
    .pipe(compress())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('jshint', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function(){
  return gulp.src(['dist'], { read: false }).pipe(del());
});

gulp.task('extlib',['extlibjs','extlibcss','extlibfonts'],function(){
  return;
});

gulp.task('extlibjs', function(){
  var extlib = 'src/extlib/';
  var libdir = 'dist/lib';
  return gulp.src([ extlib + 'angular/angular.min.js',
             extlib + 'angular-route/angular-route.min.js',
             extlib + 'angular-translate/angular-translate.min.js',
             extlib + 'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
             extlib + 'angular-animate/angular-animate.min.js',
             extlib + 'angular-aria/angular-aria.min.js',
             extlib + 'angular-material/angular-material.min.js',
             extlib + 'angular-messages/angular-messages.min.js' ]).pipe(gulp.dest(libdir));
});

gulp.task('extlibcss', function(){
  var extlib = 'src/extlib/';
  var libdir = 'dist/lib';
  return gulp.src([ extlib + 'angular-material/angular-material.min.css',
             extlib + 'font-awesome/css/font-awesome.min.css'])
  .pipe(gulp.dest(libdir));
});

gulp.task('extlibfonts', function(){
  var extlib = 'src/extlib/';
  var fontdir = 'dist/fonts';
  return gulp.src([ extlib + 'font-awesome/fonts/fontawesome-webfont.woff',
             extlib + 'font-awesome/fonts/fontawesome-webfont.woff2'])
  .pipe(gulp.dest(fontdir));
});

gulp.task('templates', function(){
  var tmplsrc = 'src/tmpl/**/*';
  var tmpldest = 'dist/tmpl';
  return gulp.src(tmplsrc).pipe(gulp.dest(tmpldest));
});

gulp.task('languages', function(){
  var tmplsrc = 'src/lang/**/*';
  var tmpldest = 'dist/lang';
  return gulp.src(tmplsrc).pipe(gulp.dest(tmpldest));
});

gulp.task('index', function(){
  var src = 'src/index.html';
  var dest = 'dist/';
  return gulp.src(src).pipe(gulp.dest(dest));
});
