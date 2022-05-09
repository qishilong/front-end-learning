// 书写 gulp 的配置

// gulp 配置文件

var gulp = require('gulp');

// 导入插件
var cssmin = require('gulp-cssmin'); // 压缩 CSS 的插件
var autoprefixer = require('gulp-autoprefixer'); // CSS 代码添加前缀
var uglify = require('gulp-uglify'); // 压缩 JS 代码
var htmlmin = require('gulp-htmlmin'); // 压缩 HTML 代码
const babel = require('gulp-babel'); // 导入 gulp-babel

// 接下来就针对不同类型的文件书写各种各样的任务
const htmlHandler = function () {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示移出空格
            removeEmptyAttributes: true, // 表示移出空的属性(仅限于原生属性)
            collapseBooleanAttributes: true, // 移出 checked 类似的布尔值属性
            removeAttributeQuotes: true, // 移出属性上的双引号
            minifyCSS: true, // 压缩内嵌式 css 代码(只能基本压缩, 不能自动添加前缀)
            minifyJS: true, // 压缩内嵌式 JS 代码(只能基本压缩, 不能进行转码)
            removeStyleLinkTypeAttributes: true, // 移出 style 和 link 标签上的 type 属性
            removeScriptTypeAttributes: true, // 移出 script 标签上默认的 type 属性
        }))
        .pipe(gulp.dest('./dist/html'));
}

var cssminHandler = function(){
    return gulp.src('./src/css/*.css')
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css'));
}

var jsHandler = function(){
    return gulp.src('./src/js/*.js')
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'));
}

var imgHandler = function () {
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./dist/images'))
}

module.exports.default = gulp.parallel(htmlHandler,cssminHandler,jsHandler,imgHandler);