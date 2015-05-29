var fs = require('fs'),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    plumber = require('gulp-plumber'),
    rev = require('gulp-rev'),
    inject = require('gulp-inject'),
    minifycss = require("gulp-minify-css"),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var serverPath = './src/',//服务器资源路径
    rootPath = './src',//根性
    staticDir = 'src/app/',//静态资源根目录
    lessFiles = staticDir + '**/*.less',//less文件路径
    hashFiles = staticDir + '**/*.min',//hash处理文件 hashFiles+".js"
    htmlDir = './src/app/index.html';//页面基础路径
/*
    构建文件配置
*/
var config = require("./build");

gulp.task('look', function () {
    gulp.watch([lessFiles], ['less-min']);
});
gulp.task('less-min',function(){
  return gulp.src( [lessFiles] )
        .pipe(plugins.less({
            relativeUrls: true
        }))
        .pipe(minifycss())
        .pipe(gulp.dest( staticDir ));
});

var connect = plugins.connect;
gulp.task('localhost', function() {
    connect.server({
        root: serverPath,
        port: 1000,
        livereload: true
    });
});

gulp.task("default",[ 'localhost','look']);

gulp.task("clean",function(){
    return gulp.src(staticDir + '**/*.min-*', {read: false})
    .pipe(plugins.clean());
});

gulp.task("rev",["clean"],function(){
    return gulp.src( [ hashFiles + ".css", hashFiles + ".js"] )
        .pipe(rev())
        .pipe(gulp.dest( staticDir ));
});
gulp.task('inject',["rev"],function(){
    config.build.forEach(function(o){
        var target = gulp.src( htmlDir );
        var sources = gulp.src( rootPath + o.dependency , {read: false});
        return target.pipe(inject(sources , {
            ignorePath : ['.','src']
        }))
        .pipe(gulp.dest( htmlDir ));
    });
});



