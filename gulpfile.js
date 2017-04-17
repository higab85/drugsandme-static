var gulp          = require('gulp'),
    nunjucks      = require('gulp-nunjucks'),
    fs            = require('fs');


// --- building templates
handleData = (err, list) =>{
  if(err)
    return console.log(err);

// the once thing at the end is to make sure it ends the process
// when it's done [3]
  list.forEach( function(page){
   gulp.src("./production/all/"+page)
       .pipe(nunjucks.compile())
       .pipe(gulp.dest('build'))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
   })
}

gulp.task('build_template', () =>{
  fs.readdir('./production/non_templates', handleData)
}
);

// --- DEFAULT

gulp.task('default', ['build_template'])



// [1]: http://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
// [2]: https://zellwk.com/blog/nunjucks-with-gulp/
// [3]: https://stackoverflow.com/questions/33191377/gulp-hangs-after-finishing
