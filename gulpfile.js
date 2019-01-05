var gulp = require('gulp'),
iconfont = require('gulp-iconfont'),
iconfontCss = require('gulp-iconfont-css'),
batch = require('gulp-batch'),
browserSync = require('browser-sync'),
nodemon = require('gulp-nodemon'),
path = require('path');
gulp.task('iconfont', function () {
    let svg ='./svgs/*.svg';
    let fontName = 'iconfont';
    gulp.src(svg).pipe(iconfontCss({
        fontName: fontName,
        targetPath: 'font.css', //生成的css样式的路径
        fontPath: './' //生成的iconfont的路径
    })).pipe(iconfont({
        fontName: fontName, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
        timestamp: new Date().getTime()
    })).pipe(gulp.dest('./dist'));
})
gulp.task('watch', function() {
    gulp.watch(path.join('./svgs', '/**.svg'), ['iconfont', 'browser-sync']);    
});

gulp.task('browser-sync', ['nodemon'], function() {
    if(!started) {
            browserSync.init(null, {
            proxy: "http://localhost:8097", // 注意这里要换成你在koa中设定的 服务端口一般是3000
            files: ["dist/**/*.*"],
            browser: "google chrome",
            port: 7000,
        });
    } else {
        browserSync.reload()
    }
    
});
var started = false;
gulp.task('nodemon', function (cb) {
    
    
    
    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            
            started = true; 
        } 
        cb();
    });
});