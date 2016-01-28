var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    cssnano         = require('gulp-cssnano'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};


gulp.task('copy', function() {
    gulp
        .src(['node_modules/font-awesome/fonts'])
        .pipe(gulp.dest('public/build/fonts/font-awesome'));

    gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap'])
        .pipe(gulp.dest('public/build/fonts/bootstrap'));

    gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
        .pipe(gulp.dest('public/js/vendor/bootstrap'));


});

gulp.task('frontend', function() {
    gulp.src([
            'resources/assets/scss/frontend/app.scss',
            'resources/assets/scss/plugin/sweetalert/sweetalert.scss'
        ])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('resources/assets/css/frontend'))
        .pipe(concat('frontend.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest('public/css/'));

    gulp.src([
            'resources/assets/js/plugin/sweetalert/sweetalert.min.js',
            'resources/assets/js/plugins.js',
            'resources/assets/js/frontend/app.js'
        ])
        .pipe(concat('frontend.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('backend', function() {
    gulp.src([
            'resources/assets/scss/backend/app.scss',
            'resources/assets/scss/backend/plugin/toastr/toastr.scss',
            'resources/assets/scss/plugin/sweetalert/sweetalert.scss'
        ])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('resources/assets/css/backend'))
        .pipe(concat('backend.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));

    gulp.src([
            'resources/assets/js/plugin/sweetalert/sweetalert.min.js',
            'resources/assets/js/plugins.js',
            'resources/assets/js/backend/app.js',
            'resources/assets/js/backend/plugin/toastr/toastr.min.js',
            'resources/assets/js/backend/custom.js'
        ])
        .pipe(concat('backend.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});


gulp.task('default', ['copy', 'frontend', 'backend']);

/*
@todo:
    /!**
      * Apply version control
      *!/
     .version(["public/css/frontend.css", "public/js/frontend.js", "public/css/backend.css", "public/js/backend.js"]);
});*/
