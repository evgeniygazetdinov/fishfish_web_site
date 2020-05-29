
 const gulp = require('gulp');
 const concat = require('gulp-concat');
 const autoprefixer = require('gulp-autoprefixer');
 let clean_css = require('gulp-clean-css');
 let uglify = require('gulp-uglify');
 let del = require('del');
 var sourcemaps = require('gulp-sourcemaps');
 const browserSync = require('browser-sync').create();
 var gulpif = require('gulp-if');
 const terser = require('gulp-terser');
 const imagemin = require('gulp-imagemin');
 let  fontmin = require('gulp-fontmin');

 var filesToMove = [
         './assets/build/**/*',
         './*php'
     ];



 let is_dev = true;
 let isProd = !is_dev;

const cssFiles = [
  './node_modules/normalize.css/normalize.css',
    './assets/src/styles/body.css',

];
const jsFiles = [
  './assets/src/js/jquery-3.2.0.min.js',
  './assets/src/js/main.js'

];


function watch(){

  gulp.watch('./assets/src/styles/**/*.css',styles);
  gulp.watch('./assets/src/js/**/*.js',script);
  gulp.watch('./assets/src/fonts/*',fonts);
  gulp.watch('./assets/src/img/*',img);
  gulp.watch('./assets/src/').on('change',browserSync.reload);

  }

function img(){
  return gulp.src('./assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/build/img'))


}
function fonts(){
  return gulp.src('./assets/src/fonts/*')
        // .pipe(fontmin())
        .pipe(gulp.dest('./assets/build/css/fonts'))
  }
 function styles(){
   return gulp.src(cssFiles)
                .pipe(gulpif(is_dev,sourcemaps.init()))
                .pipe(concat('style.css'))

                .pipe(autoprefixer({
                     Browserslist :['> 0.01%'],
                     cascade: false

                 }))
                 .pipe(clean_css({compatibility: 'ie8',
                                  level:2}))
                .pipe(gulpif(is_dev,sourcemaps.write('../maps')))
                 .pipe(gulp.dest('./assets/build/css'))
                // .pipe(browserSync.stream())


  }
 function script(){
   return gulp.src(jsFiles)

                .pipe(concat('script.js'))
                // .pipe(uglify({toplevel:true}))
                .pipe(terser())
                .pipe(gulp.dest('./assets/build/js'))

 }

 function clear(){
   return del(['./assets/build'])
 }

 function deploy(done) {
   gulp.src(filesToMove)
     .pipe(rsync({
       root: '',
       hostname: 'u1063792@37.140.192.157',
       destination: '/var/www/u1063792/data/www/fishfishstudio.site/wp-content/themes/fishfish_web_site/',
     }))
    done();};




 gulp.task('browser-sync',function(){
   let files = [
     './assets/build/css/*',
     './assets/build/js/*',
     './assets/build/img/*',
     './assets/build/css/*',
     './assets/build/css/*',
     './*.php'
   ]
   browserSync.init(files,{
   proxy:'http://localhost/fishfish/',
 })
 })

gulp.task('styles',styles);
gulp.task('script',script);
gulp.task('img',img);
gulp.task('fonts',fonts);

gulp.task('watch',watch);
gulp.task('build', gulp.series(clear, gulp.parallel(styles, script,img,fonts)));
gulp.task('default',gulp.series('build','browser-sync','watch'))
