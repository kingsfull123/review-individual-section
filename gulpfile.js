var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    cssImport = require('postcss-import'),
    autoprefixer = require('autoprefixer'),
    simpleVars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    browserSync = require('browser-sync').create();
    
    gulp.task('default', function() {
        console.log('this is a default message from gulpfile.js');
    })
    
    gulp.task('html', function() {
        console.log('Your html file has been edited...');
    })
    
    gulp.task('style', function() {
     return   gulp.src('./travel-site-files/app/assets/styles/style.css')
        .pipe(postcss([cssImport, autoprefixer, simpleVars, nested]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./travel-site-files/app/temp/styles'));
    })
    
    gulp.task('watch', function() {
        
        browserSync.init({
            notify: false,
            server: {
                baseDir: 'app'
            }
        })
        
        watch('./travel-site-files/app/index.html', function() {
            browserSync.reload();
        })
        
        watch('./travel-site-files/app/assets/styles/style.css', function() {
            gulp.start('cssInject');
        })
        
    })
    
    gulp.task('cssInject', ['style'], function() {
        return gulp.src('./app/temp/styles/style.css')
                .pipe(browserSync.stream());
    })