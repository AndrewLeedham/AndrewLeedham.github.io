var gulp = require("gulp"),
    spawn = require("child_process").spawn,
    plugins = require("gulp-load-plugins")(),
    sync = require("browser-sync").create();

gulp.task("default", ["watch", "sass", "jekyll"]);

gulp.task("watch", function(){
    sync.init({
        files: ["./_site/**"],
        port: 4000,
        server: {
            baseDir: "./_site/"
        }
    });
    gulp.watch("./_sass/**/*.{sass,scss}", ["sass"]);
});

gulp.task("sass", function(){
    gulp.src("./_sass/**/*.{sass,scss}")
        .pipe(plugins.sass())
        .pipe(gulp.dest("./css/"));
});

gulp.task("jekyll", function(cb){
    var jekyll = spawn("jekyll.bat", ["serve", "--skip-initial-build", "--incremental", "--quiet"]);

    var log = function(buffer, post){
        buffer.toString().split(/\n/).forEach(function(message){
            if(!/\S/.test(message)){
                plugins.util.log("Jekyll-" + post + ": " + message);
            }
        });
    }

    jekyll.stdout.on("data", function(buffer){log(buffer, "out")});
    jekyll.stderr.on("data", function(buffer){log(buffer, "err")});
});