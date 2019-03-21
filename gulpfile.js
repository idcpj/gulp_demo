/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
// Load plugins
const {src, dest, watch} = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

const Src = {
    css: ["src/scss/**/*.scss","src/sass/**/*.sass","src/css/**/*.css"],
    scripts : ["src/scripts/"],
    images : ["src/images/**/*"],
};


const Dist = {
    styles : "dist/assets/styles/",
    script : "dist/assets/script/",
    images : "dist/assets/images/",
}

// Styles
async function styles() {
    await Scss();
    await Sass();
}

function Scss() {
    return src(Src.css)
        .pipe(sass({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(dest(Dist.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(dest(Dist.styles))
        .pipe(notify({message: 'Styles task complete'}));
}
function Sass() {
    return src(Src.css)
        .pipe(sass({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(dest(Dist.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(dest(Dist.styles))
        .pipe(notify({message: 'Styles task complete'}));
}

// Scripts
function scripts() {
    return src(sscripts + '**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(dest(dscript))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(dest(dscript))
        .pipe(notify({message: 'Scripts task complete'}));
}

// Images
function images() {
    return src(simage)
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(dest(dimages))
        .pipe(notify({message: 'Images task complete'}));
}

// Clean
function clean(cb) {
    del([dist], cb)
}

// Default task
async function defaultTask() {
    await styles();
    await scripts();
    await images();
}

// Watch
function Watch() {
    // Watch .scss files
    watch(sstyles + '**/*.scss', styles);
    // Watch .js files
    watch(sscripts + '**/*.js', scripts);
    // Watch image files
    watch(simages + '/**/*', images);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    watch([dist + '**']).on('change', livereload.changed);
};

exports.scss = Scss;
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.clean = clean;
exports.default = defaultTask;

exports.watch = Watch;