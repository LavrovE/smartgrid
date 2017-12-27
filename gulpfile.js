var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    autoprefixer    = require('gulp-autoprefixer'),
    gulpImport      = require('gulp-html-import'),
    sourcemaps      = require('gulp-sourcemaps'),
    cors            = require('cors'),
    gcmq            = require('gulp-group-css-media-queries'),
    cleanCSS        = require('gulp-clean-css'),
    smartgrid       = require('smart-grid'),
    connect         = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        middleware: function() {
            return [cors()];
        }
    });
});

gulp.task('connectDist', function () {
    connect.server({
        port: 3000
    });
});

gulp.task('connectDev', function () {
    connect.server({
        port: 8000
    });
});

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        .pipe(sourcemaps.write('../css', {addComment: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});



gulp.task('maincssfinal', function () {
    gulp.src('app/css/main.css')
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'));
});




gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jquery-validation/dist/jquery.validate.js',
        'app/libs/jquery-validation/dist/additional-methods.js',
        'app/libs/bootstrap/dist/js/bootstrap.js',
        'app/libs/dropzone/dist/dropzone.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('import', function () {
    gulp.src('app/src/*.html')
        .pipe(gulpImport('app/layouts/'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['connectDist', 'connectDev',  'browser-sync', 'css-libs', 'scripts', 'import', 'maincssfinal'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/src/*.html', ['import']);
    gulp.watch('app/layouts/*.html', ['import']);
    gulp.watch('app/css/main.css', ['maincssfinal']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/layouts/*.html', browserSync.reload);
    gulp.watch('app/src/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/sass/**/*.scss', browserSync.reload);
});

gulp.task('glyphicon-bootstrap', function() {
    return gulp.src('app/libs/bootstrap/dist/fonts/**/*')
        .pipe(gulp.dest('app/fonts'));
});



// run one time before work
gulp.task('grid', function () {
    smartgrid('app/sass', {
        container: {
            maxWidth: '1170px'
        },
        outputStyle: 'scss', /* less || scss || sass || styl */
    });
});