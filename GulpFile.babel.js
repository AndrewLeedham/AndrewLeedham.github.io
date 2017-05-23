import gulp from 'gulp';
import babel from 'gulp-babel';
import merge from 'gulp-merge-json';
import data from 'gulp-data';
import flatmap from 'gulp-flatmap';
import markdown from 'marked';
import hbs from 'gulp-compile-handlebars';
import rename from 'gulp-rename';
import fs from 'fs';
import del from 'del';

const settings = JSON.parse(fs.readFileSync("./settings.json"));

export function compile(){
    return gulp.src(['source/templates/**/*.hbs', '!source/templates/_partials/**/*'])
        .pipe(flatmap((templateStream, template) => {
            console.log("test");
            return gulp.src('source/content/**/*.md')
                .pipe(flatmap((markdownStream, markdownFile) => {
                    // console.log(String(markdownFile.contents));
                    var content = markdown(String(markdownFile.contents));
                    var json = {};
                    json[markdownFile.stem] = content;
                    markdownFile.contents = new Buffer(JSON.stringify(json));
                    return markdownStream;
                }))
                .pipe(merge({}))
                .pipe(flatmap((jsonStream, jsonFile) => {
                    console.log(String(jsonFile.contents));
                    return templateStream.pipe(hbs(JSON.parse(jsonFile.contents)));;
                }));
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('./dest/'));
}

export function clean(cb){
    del(['dest']);
    cb();
}

const temp = gulp.series(clean, compile);

export default temp;