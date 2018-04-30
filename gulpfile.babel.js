'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://jonashcroft.local'
    });
});

/*------------------------------------
Our JS functions,

TODO: gulp-plumber doesn't work, gulp will
crash when this task errors.
------------------------------------*/

gulp.task('browserify', () => {
    const b = browserify({
        entries: './assets/js/app.js',
        debug: true,
    });

    return b
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./assets/'));
});

gulp.task("bundle", ['browserify'], () => {
    return gulp.src([
        './assets/app.js',
        './assets/js/vendor/*.js'
    ])
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat("app.js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function(){
//     return gulp.src('src/scripts/**/*.js')
//       .pipe(plumber({
//         errorHandler: function (error) {
//           console.log(error.message);
//           this.emit('end');
//       }}))
//       .pipe(concat('main.js'))
//       .pipe(babel())
//       .pipe(gulp.dest('dist/scripts/'))
//       .pipe(rename({suffix: '.min'}))
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/scripts/'))
//       .pipe(browserSync.reload({stream:true}))
//   });


/*------------------------------------
Sass & CSS

TODO: There's a bug where if you make a
new file, this task won't pick up the new
files and gulp will need to be restarted.
------------------------------------*/
gulp.task('Styles', () => {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: 'Something\'s gone wrong',
                message:  'Error: Sass could not compile'
            })(err);
            this.emit('end');
        }}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/')) // unminified
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function (path) {
            if(path.extname === '.css') {
                path.basename += '.min';
            }
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});


// Watch for changes and reload browser
gulp.task('default', ['browser-sync'], () => {
    gulp.watch('./assets/scss/**/*.scss', ['Styles']);
    gulp.watch('./assets/js/**/*.js', ['browserify', 'bundle']);
    gulp.watch('**/*.php').on('change', browserSync.reload);
});