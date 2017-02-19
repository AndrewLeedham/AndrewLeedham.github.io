var gulp = require("gulp"),
    spawn = require("child_process").spawn,
    plugins = require("gulp-load-plugins")(),
    sync = require("browser-sync").create(),
    webp = require("imagemin-webp"),
    path = require("path");

var SASS_INCLUDES = [
    path.join(__dirname, "/node_modules/bourbon-neat/core/"),
    path.join(__dirname, "/node_modules/bourbon/app/assets/stylesheets/")
]

console.log(SASS_INCLUDES);

gulp.task("default", ["watch", "sass", "img", "jekyll", "favicons", "js"]);

gulp.task("watch", function(){
    sync.init({
        files: ["./source/_site/**"],
        port: 4000,
        server: {
            baseDir: "./dest/"
        }
    });
    gulp.watch("./source/_sass/**/*.{sass,scss}", ["sass"]);
    gulp.watch("./source/_img/**/*.jpg", ["jpg"]);
    gulp.watch("./source/_js/**/*.js", ["js"]);
});

gulp.task("sass", function(){
    return gulp.src("./source/_sass/**/*.{sass,scss}")
        .pipe(plugins.sass({includePaths: SASS_INCLUDES}))
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("./source/css/"));
});

gulp.task("img", ["jpg"/*, "png", "svg"*/]);

gulp.task("jpg", function(){
    return gulp.src("./source/_img/**/*.jpg")
    .pipe(plugins.imagemin([ plugins.imagemin.jpegtran({progressive: true}) ]))
    .pipe(gulp.dest("./source/img/"))
    .pipe(plugins.imagemin([ webp({quality: 80}) ]))
    .pipe(plugins.rename({extname: ".webp"}))
    .pipe(gulp.dest("./source/img/"));
});

gulp.task("favicons", function(cb){
    return gulp.src("./source/_img/logo.svg")
    .pipe(plugins.favicons({
        appName: "Andrew Leedham's Portfolio",
        appDescription: "Andrew Leedham: Web Developer and Designer",
        developerName: "Andrew Leedham",
        developerUrl: "http://andrewleedham.me",
        background: "#FFFFFF",
        path: "./source/",
        display: "browser",
        orientation: "portrait",
        start_url: "./source/",
        version: "2.0",
        logging: false,
        online: false,
        html: "./source/_includes/head.html",
        pipeHTML: false,
        replace: false
    }))
    .pipe(gulp.dest("./source/"));
});

gulp.task("js", function(cb){
    return gulp.src("./source/_js/**/*.js")
    .pipe(plugins.uglify())
    .pipe(plugins.concatUtil("script.js"))
    .pipe(plugins.concatUtil.header("(function(){'use scrict';"))
    .pipe(plugins.concatUtil.footer("})();"))
    .pipe(gulp.dest("./source/js/"));
});

gulp.task("jekyll", function(cb){
    var jekyll = spawn("jekyll.bat", ["serve", "--skip-initial-build", "--incremental", "--quiet"]);

    var log = function(buffer, post){
        buffer.toString().split(/\n/).forEach(function(message){
            if(/\S/.test(message)){
                plugins.util.log("Jekyll-" + post + ": " + message);
            }
        });
    }

    jekyll.stdout.on("data", function(buffer){log(buffer, "out")});
    jekyll.stderr.on("data", function(buffer){log(buffer, "err")});
});