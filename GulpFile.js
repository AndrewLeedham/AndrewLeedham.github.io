var gulp = require("gulp"),
    spawn = require("child_process").spawn,
    plugins = require("gulp-load-plugins")();

gulp.task("default", ["watch"]);

gulp.task("watch", ["sass", "jekyll"], function(){
    gulp.watch("./_sass/**/*.{sass,scss}", ["sass"]);
});

gulp.task("sass", function(){
    gulp.src("./_sass/**/*.{sass,scss}")
        .pipe(plugins.sass())
        .pipe(gulp.dest("./css/"));
});

gulp.task("jekyll", function(cb){
    var jekyll = spawn("jekyll.bat", ["serve", "--watch"]);

    var log = function(buffer){
        buffer.toString().split(/\n/).forEach(function(message){
            plugins.util.log('Jekyll: ' + message);
        });
    }

    jekyll.stdout.on("data", log);
    jekyll.stderr.on("data", log);
});