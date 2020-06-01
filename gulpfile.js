
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
 const less = require('gulp-less');
 const smart_grid = require('smart-grid');
 const path = require('path');
 const gridOptPath = './smartgrid.js';



 function grid(done){
   delete require.cache[path.resolve(gridOptPath)];
   let settings =require(gridOptPath);
   smart_grid('./assets/src/css',settings);
   done();
 }


 var filesToMove = [
         './assets/build/**/*',
         './*php'
     ];



 let is_dev = true;
 let isProd = !is_dev;


const jsFiles = [
  './assets/src/js/jquery-3.2.0.min.js',
  './assets/src/js/main.js'

];


function watch(){

  gulp.watch('./assets/src/css/**/*.less',styles);
  gulp.watch('./assets/src/js/**/*.js',script);
  gulp.watch('./assets/src/fonts/*',fonts);
  gulp.watch('./assets/src/img/*',img);
    gulp.watch(gridOptPath, grid);
  gulp.watch('./*').on('change',browserSync.reload);

  console.log('hi');
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
   return gulp.src('./assets/src/css/styles.less')
                .pipe(gulpif(is_dev,sourcemaps.init()))
                .pipe(less())

                .pipe(autoprefixer({
                     Browserslist :['> 0.01%'],
                     cascade: false

                 }))
                 .pipe(clean_css({compatibility: 'ie8',
                                  level:2}))
                .pipe(gulpif(is_dev,sourcemaps.write('../maps')))
                 .pipe(gulp.dest('./assets/build/css'))


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
     './*.php'
   ]
   browserSync.init(files,{
   proxy:'http://localhost/fishfish/',
 })
 })
gulp.task('grid',grid);
gulp.task('styles',styles);
gulp.task('script',script);
gulp.task('img',img);
gulp.task('fonts',fonts);
gulp.task('watch',watch);
gulp.task('build', gulp.series(clear, gulp.parallel(styles, script,img,fonts)));
gulp.task('default',gulp.series('build','browser-sync','watch'))
