/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
// Load plugins
const {src, dest, watch} = require('gulp'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
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
    minifyHtml = require("gulp-minify-html"),
    requireOptimize = require('gulp-requirejs-optimize');

const Src = {
    css: ["src/scss/**/*.scss","src/sass/**/*.sass","src/css/**/*.css","src/stylus/**/*.styl",],
    scripts : ["src/scripts/*.js","src/scripts/**/*.js"],
    images : ["src/images/**/*"],
    html:['src/html/**/*.html'],
    requirejs:'src/scripts/require.config.js',
};


const Dist = {
    styles : "dist/assets/styles/",
    script : "dist/js/",
    images : "dist/assets/images/",
    html:"dist/html/"
};

let DisPath ="dist/";
let DistArr=Object.values(Dist);

// Styles
async function styles() {
    await Scss();
    await Sass();
    await Stylus();
}

function Scss() {
    return src(Src.css)
        .pipe(sass({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(dest(Dist.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(dest(Dist.styles))
        .pipe(notify({message: 'Scss task complete'}));
}
function Sass() {
    return src(Src.css)
        .pipe(sass({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(dest(Dist.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(dest(Dist.styles))
        .pipe(notify({message: 'Sass task complete'}));
}
function Stylus() {
    return src(Src.css)
        .pipe(stylus({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(dest(Dist.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(dest(Dist.styles))
        .pipe(notify({message: 'Stylus task complete'}));
}

// Scripts
function scripts() {
    return src(Src.scripts )
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(dest(Dist.script))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(dest(Dist.script))
        .pipe(notify({message: 'Scripts task complete'}));
}

// Images
// 支持 *.jpg, *.jpeg, *.png, *.gif, *.svg 不能压缩 webp
function images() {
    return src(Src.images)
        .pipe(cache(imagemin({ progressive: true, interlaced: true})))
        .pipe(dest(Dist.images))
        .pipe(notify({message: 'Images task complete'}));
}

function Html(){
    return src(Src.html) // 要压缩的html文件
        .pipe(minifyHtml())    //压缩
        .pipe(dest(Dist.html))
        .pipe(notify({message:" "}))
}

// Clean
function clean(cb) {
    del(DisPath, cb)
}
function Rjs(){
    return src(Src.scripts)
        .pipe(requireOptimize({
            mainConfigFile: Src.requirejs,
        }))
        .pipe(dest(Dist.script));
}

// Default task
async function defaultTask() {
    await styles();
    // await scripts();
    await images();
    await Html();
    await Rjs();
}

// Watch
function Watch() {
    // Watch .scss files
    watch(Src.css, styles);
    // Watch .js files
    // watch(Src.scripts, scripts);
    watch(Src.scripts, Rjs);
    // Watch image files
    watch(Src.images , images);
    watch(Src.html , Html);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    watch(DistArr).on('change', livereload.changed);
};

exports.rjs = Rjs;
exports.html = Html;
exports.styles = styles;
exports.images = images;
exports.scripts = Rjs;
exports.clean = clean;
exports.default = defaultTask;

exports.watch = Watch;