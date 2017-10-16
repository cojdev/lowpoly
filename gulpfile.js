//--npm install gulp gulp-sass gulp-cssnano gulp-sourcemaps gulp-concat gulp-rename gulp-uglify gulp-newer gulp-filter --save-dev

var gulp = require('gulp'),

    //--General
    concat = require('gulp-concat'),//Join multiple files 
    newer = require('gulp-newer'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),//Show sources in dev tools
    filter = require('gulp-filter'),

    //--CSS
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),

    //--Javascript
    uglify = require('gulp-uglify');

//--Parse and minify Sass
gulp.task('sass', function() {
return gulp.src('src/scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('docs/css'))
    .pipe(filter('**/*.css'))
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('docs/css'))
});

//--Concat and uglify Javascript files
gulp.task('js', function() {
return gulp.src(['src/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('docs/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('docs/js'))
});

//--Run tasks once
gulp.task('run', ['sass', 'js']);

//--Watch edits
gulp.task('watch', function(){
gulp.watch('src/**/*.scss', ['sass']);
gulp.watch('src/js/**/*.js', ['js']);
});

//--Default task
gulp.task('default', ['run', 'watch']);