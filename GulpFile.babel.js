import gulp from 'gulp';
import shell from 'gulp-shell';
import postcss from 'gulp-postcss';
import del from 'del';
import browsersync from 'browser-sync';

gulp.task('reload', (cb) => {
  browsersync.reload()
  cb();
});

gulp.task('clean', () => del('./_site/'));

gulp.task('generate', shell.task('eleventy'));

gulp.task('css', () => gulp.src('./_css/*.css')
  .pipe(postcss())
  .pipe(gulp.dest('./_site/css/'))
  .pipe(browsersync.stream())
);

gulp.task('assets', gulp.parallel('css'));

gulp.task('build', gulp.series('clean', 'generate', 'assets'));

gulp.task('watch', () => {
  browsersync.init({
    server: {
      baseDir: './_site/'
    }
  });

  gulp.watch(['./**/*.{md,njk,html}', '!_*/**'], gulp.series('generate', 'reload'));
  gulp.watch('./_css/**/*.css', gulp.series('css'));
});

gulp.task('serve', gulp.series('build', 'watch'));
