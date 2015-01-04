var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    less        = require('gulp-less'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    autoprefixer= require('gulp-autoprefixer'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    gm          = require('gulp-gm'),
    rename      = require('gulp-rename');


// --- Basic Tasks ---
gulp.task('css', function() {
  return gulp.src([
      'src/assets/css/*.less'])
    .pipe( 
      less( { 
        includePaths: ['src/assets/css'],
        errLogToConsole: true
      } ) )
    .pipe( autoprefixer({
      browsers: ['last 2 versions']
    }) )
    .pipe( csso() )
    .pipe( concat('all.min.css'))
    .pipe( gulp.dest('dist/assets/css/') )
    .pipe( livereload());
});

gulp.task('js', function() {
  return gulp.src('src/assets/scripts/*.js')
    .pipe( uglify() )
    .pipe( concat('all.min.js'))
    .pipe( gulp.dest('dist/assets/scripts/'))
    .pipe( livereload());
});

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
    .pipe( livereload());
});

gulp.task('images', ['images-large', 'images-medium'], function() {
  return gulp.src('src/assets/images/*.png')
    .pipe(imagemin({
      progressive:true
    }))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('images-large', function(){
  return gulp.src('src/assets/images/*@responsive.png')
    .pipe(gm(function(gmfile){
      return gmfile.resize(1500).setFormat("jpg");
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace("@responsive", "@large");
    }))
    .pipe(gulp.dest('dist/assets/images')); 
});

gulp.task('images-medium', function(){
  return gulp.src('src/assets/images/*@responsive.png')
    .pipe(gm(function(gmfile){
      return gmfile.resize(750).setFormat("jpg");
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace("@responsive", "@medium");
    }))
    .pipe(gulp.dest('dist/assets/images')); 
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('_watch', function () {
  livereload.listen(35729);

  gulp.watch('src/assets/css/site.less',['css']);

  gulp.watch('src/assets/scripts/*.js',['js']);

  gulp.watch('src/assets/images/*.png',['images']);

  gulp.watch('src/*.jade',['templates']);
});

gulp.task('fonts', function (){
  return gulp.src([
    'src/assets/fonts/*/stylesheet.css',
    'src/assets/fonts/*/*.eot',
    'src/assets/fonts/*/*.woff',
    'src/assets/fonts/*/*.woff2',
    'src/assets/fonts/*/*.ttf'
    ])
  .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('watch', ['default','express','_watch']);

gulp.task('default', ['js','css','templates', 'images','fonts']);