var gulp          = require('gulp'),
    nunjucks      = require('gulp-nunjucks'),
    fs            = require('fs');


// --- building templates
handleData = (page) => {


// the once thing at the end is to make sure it ends the process
// when it's done [3]
gulp.src("./src/"+page)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('build'))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
}

// filters non-html files from array
onlyHTML = (file) => file.indexOf('html') > -1

gulp.task('build_template', () =>{
  fs.readdir('./src/', (err, list)=> {
    list.filter(onlyHTML).forEach(handleData)
  })
}
);

// --- DEFAULT

gulp.task('default', ['build_template'])



// [1]: http://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
// [2]: https://zellwk.com/blog/nunjucks-with-gulp/
// [3]: https://stackoverflow.com/questions/33191377/gulp-hangs-after-finishing
