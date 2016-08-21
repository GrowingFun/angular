var fs = require('fs'),
    gulp = require("gulp"),
    plumber = require('gulp-plumber'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var serverPath = './src/',//服务器资源路径
    rootPath = './src',//根性
    staticDir = 'src/app/',//静态资源根目录
    lessFiles = staticDir + '**/*.less',//less文件路径
    hashFiles = staticDir + '**/*.min',//hash处理文件 hashFiles+".js"
    htmlDir = './src/app/index.html',//页面基础路径
    jsArr = [
        "src/app/config/config.js",
        "src/app/controller/**/*.js"
    ];

gulp.task('look', function () {
    gulp.watch([lessFiles], ['less-min','js-min']);
});
gulp.task('less-min',function(){
  return gulp.src( [lessFiles] )
        .pipe(plugins.less({
            relativeUrls: true
        }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest( staticDir ));
});

gulp.task("js-min",function(){
   return gulp.src(jsArr)
        .pipe(plugins.uglify({
            mangle: true,
            compress: {
                drop_console: true
            },
            outSourceMap: false
        }))
        .pipe(plugins.concat("app.min.js"))
        .pipe(gulp.dest("src/app/"));
});

var connect = plugins.connect;
gulp.task('localhost', function() {
    connect.server({
        root: serverPath,
        port: 1000
    });
});

gulp.task("default",[ 'localhost','look']);

gulp.task("clean",function(){
    return gulp.src(staticDir + '*.min-*', {read: false})
    .pipe(plugins.clean());
});

gulp.task("rev",["min"],function(){
    return gulp.src( [ staticDir + "*.min.css", staticDir + "*.min.js"] )
        .pipe(plugin.rev())
        .pipe(gulp.dest( staticDir ));
});

gulp.task('min',["clean"],function(){
    gulp.run('less-min','js-min');
});

gulp.task('inject',["rev"],function(){
    var target = gulp.src( 'src/app/index.html' );
    var sources = gulp.src( ['src/app/app.min-*.js','src/app/app.min-*.css'] , {read: false});
    return target.pipe(plugin.inject(sources , {
        ignorePath : ['.','src']
    }))
    .pipe(gulp.dest( 'src/app/' ));
});



