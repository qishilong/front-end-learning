/* function defaultTask(cb) {
	// place code for your default task here
	console.log('陈学辉');
	cb();
  }
  
  exports.default = defaultTask */

//公开任务、私有任务

const { series, parallel } = require('gulp');
// console.log(gulp);

/* function fn1(cb){
	console.log('fn1被调用了');
	cb();
}
function fn2(cb){
	console.log('fn2被调用了');
	cb();
}

exports.build=fn1;
exports.default=series(fn1, fn2); */


//任务
/* function js(cb) {
	console.log('js被执行了');
	cb();
}
function css(cb) {
	console.log('css被执行了');
	cb();
}
function html(cb) {
	console.log('html被执行了');
	cb();
}
exports.default = series(js, css);
exports.default = parallel(js, css);
exports.default = series(html, parallel(js, css)); */


//处理文件
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

//I(input) O(output)
//less -> css -> css加上css3的前缀 -> 压缩 -> 输出

exports.default = function () {
	return src('src/js/*.js')
		.pipe(dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(dest('dist/js'))
}

//文件监控
const { watch } = require('gulp');
watch('src/css/*', {
	delay: 2000,
}, function (cb) {
	console.log('文件被修改了');
	cb();
});

