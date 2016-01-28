var gulp = require("gulp"),
    browserSync = require('browser-sync');

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: './'
    }
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    '*.html',
    'scripts/**/*.js',
    'styles/**/*.css'
  ]).on('change', browserSync.reload);
});

// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);