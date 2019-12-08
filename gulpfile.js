//variables
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');
//task
gulp.task('sass', function(){ 
    //'return' will multiply task!
   return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'})) //compres 'css'!
        .pipe(rename({suffix : '.min'})) //addes a suffix '.min'!
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        })) //parses CSS and adds vendor prefixes!
        .pipe(gulp.dest('app/css')) //converts 'scss' to 'css'!
        .pipe(browserSync.reload({ stream: true })) //task 'browserSync' refreshes page if occour any change!
});

gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js', 
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js'
    ])
        .pipe(concat('libs.min.js')) //unites all files 'js' to unic file 'libs.min.js'!
        .pipe(uglify()) //minimazes all js libs!
        .pipe(gulp.dest('app/js')) //destination!
});


gulp.task('style', function(){
    return gulp.src([
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules//rateyo/src/jquery.rateyo.css',
        'node_modules/ion-rangeslider/css/ion.rangeSlider.css'

    ])
        .pipe(concat('libs.min.css')) //unites all files 'css' to unic file 'libs.css'!
        .pipe(cssmin()) //minimazes all css libs!
        .pipe(gulp.dest('app/css')) //destination! 
});

gulp.task('html', function(){  //refreshes page by writting 'html' in terminal!
    return gulp.src('app/*.html')    
        .pipe(browserSync.reload({stream: true}))

});

gulp.task('js', function(){
    return gulp.src('app/js/*.js') //refreshes page by writting 'js' in terminal!
        .pipe(browserSync.reload({stream: true}))

});

gulp.task('browser-sync', function(){ //refreshes page automatically!
    return browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
});


gulp.task('watch', function(){ //'watch' watches for changes to files and executes the task when a change occurs!
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); //'watch' convertes 'cscc' to 'css' automatically!
    gulp.watch('app/*.html', gulp.parallel('html')); //'watch' refreshes page if in any file with suffix '.html' occur a change!
    gulp.watch('app/js/*.js', gulp.parallel('js')); //'watch' refreshes page if in any file with suffix '.js' occur a change!

});

gulp.task('default', gulp.parallel('script', 'style', 'sass', 'watch', 'browser-sync')) //'default' multitask for gulp!
