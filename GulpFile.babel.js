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

settings.hbs.helpers = {
    icon: function (name) {
        return "icons/" + name;
    }
};

const hbsGlobals = JSON.parse(fs.readFileSync("./globals.json"));

export function compile(){
    return gulp.src(['source/templates/**/*.hbs', '!source/templates/_partials/**/*'])
        .pipe(flatmap((templateStream, template) => {
            return gulp.src('source/content/**/*.md')
                .pipe(flatmap((markdownStream, markdownFile) => {
                    let content = markdown(String(markdownFile.contents)),
                        json = {},
                        temp = {};
                    json[markdownFile.stem] = content;
                    markdownFile.relative.substring(0, markdownFile.relative.lastIndexOf('\\')).split('\\').forEach(function(element) {
                        if(element != ''){
                            temp[element] = json;
                            json = Object.assign({}, temp);
                        }
                    }, this);
                    markdownFile.contents = new Buffer(JSON.stringify(json));
                    return markdownStream;
                }))
                .pipe(merge({"endObj": hbsGlobals}))
                .pipe(flatmap((jsonStream, jsonFile) => {
                    return templateStream.pipe(hbs(JSON.parse(jsonFile.contents), settings.hbs));;
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