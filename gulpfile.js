var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    stylus = require('gulp-stylus'),
    spritesmith  = require('gulp.spritesmith')
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    nib = require('nib');







gulp.task('stylus', function() {
    gulp.src('./sources/styl/main.styl')
        .pipe(stylus({use: nib(), compress: true}))
        .on('error', console.log) // Выводим ошибки в консоль
        .pipe(gulp.dest('./public/css/')); // Выводим сгенерированные CSS-файлы в ту же папку по тем же именем, но с другим расширением
});





gulp.task('concat', function(){
  gulp.task('js');
	gulp.src('./public/js/*.js')
		.pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/min/'));
  gulp.task('styl');
	gulp.src('./public/css/*.css')
		.pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/min/'));
});





gulp.task('imagemin',function(){
	 gulp.src('./sources/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});




gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./sources/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: '../img/sprite.png',
                cssName: 'sprite.styl',
                cssFormat: 'styl',
                algorithm: 'binary-tree',
                // cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./sources/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sources/styl/')); // путь, куда сохраняем стили
});






/*
* Создадим задачу, смотрящую за изменениями
*/
gulp.task('watch_stylus', function() {
    gulp.watch('./sources/styl/*.styl', ['stylus']);
    gulp.watch('./src/assets/images/sprite/*.*', ['sprite', 'stylus']);
});



gulp.task('default',['sprite', 'stylus', 'concat','imagemin']);
