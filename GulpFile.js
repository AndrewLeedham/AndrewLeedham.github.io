var gulp = require("gulp"),
    spawn = require("child_process").spawn,
    plugins = require("gulp-load-plugins")(),
    sync = require("browser-sync").create(),
    webp = require("imagemin-webp");

gulp.task("default", ["watch", "sass", "img", "jekyll"]);

gulp.task("watch", function(){
    sync.init({
        files: ["./_site/**"],
        port: 4000,
        server: {
            baseDir: "./_site/"
        }
    });
    gulp.watch("./_sass/**/*.{sass,scss}", ["sass"]);
    gulp.watch("./_img/**/*.jpg", ["jpg"]);
});

gulp.task("sass", function(){
    gulp.src("./_sass/**/*.{sass,scss}")
        .pipe(plugins.sass())
        .pipe(gulp.dest("./css/"));
});

gulp.task("img", ["jpg"/*, "png", "svg"*/]);

gulp.task("jpg", function(){
    gulp.src("./_img/**/*.jpg")
    .pipe(plugins.imagemin([ plugins.imagemin.jpegtran({progressive: true}) ]))
    .pipe(gulp.dest("./img/"))
    .pipe(plugins.imagemin([ webp({quality: 80}) ]))
    .pipe(plugins.rename({extname: ".webp"}))
    .pipe(gulp.dest("./img/"));
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