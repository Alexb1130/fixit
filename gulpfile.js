'use strict';

var gulp     = require('gulp'),
    brSync   = require('browser-sync'),
    pngquant = require('imagemin-pngquant'),
    del      = require('del'),
    glp      = require('gulp-load-plugins')();

gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(glp.less())
    .pipe(glp.autoprefixer({
      browsers: ['last 2 versions']
    }))
    // .pipe(glp.csso())
    .pipe(glp.rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(brSync.reload({stream: true}))
});

gulp.task('htmlBuild', function () {
    return gulp.src('src/*.html')
      .pipe(glp.rigger())
      .pipe(gulp.dest('build'))
      .pipe(brSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
  return gulp.src('src/libs/jquery/dist/jquery.min.js')
    .pipe(glp.concat('libs.min.js'))
    .pipe(glp.uglifyjs())
    .pipe(gulp.dest('src/js'));
});

gulp.task('jsBuild', function () {
  return gulp.src('src/js/main.js')
    .pipe(glp.rigger())
    .pipe(glp.uglifyjs())
    .pipe(gulp.dest('build/js'))
    .pipe(brSync.reload({ stream: true }))
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(glp.imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      une: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'))
    .pipe(brSync.reload({ stream: true }));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/roboto/**/*')
    .pipe(gulp.dest('build/fonts/roboto'));
});

gulp.task('brSync', function() {
  brSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  });
});

gulp.task('watch', ['brSync', 'less', 'fonts', 'img', 'scripts', 'jsBuild', 'htmlBuild'], function() {
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/**/*.html', ['htmlBuild']);
  gulp.watch('src/js/**/*.js', ['jsBuild']);
  gulp.watch('src/img/**/*', ['img']);
});

gulp.task('clean', function () {
  return del('build/**/*');
});

gulp.task('default', ['watch']);
