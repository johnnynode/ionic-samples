//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var plumber = require('gulp-plumber');
var process = require('process');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin'); // 压缩image
var cleanCSS = require('gulp-clean-css'); // 压缩css
var htmlmin = require('gulp-htmlmin'); // 压缩html
var uglify = require('gulp-uglify'); // 压缩js
var gutil = require('gulp-util');
var del = require('del'); // 清空文件和文件夹
var open = require('gulp-open');

var allPath = {
    src: ['./src'],
    dist: ['./dist']
};

var connectFlag = 0; // 用于控制connect任务中的root路径
var portFlag = 0; // 用于控制端口不同

// 生产模式任务
var productionTask = [];

// 判断操作系统
var platform = process.platform;

// 定义一组browser的判断
var browser = platform === 'linux' ? 'google-chrome' : (
    platform === 'darwin' ? 'google chrome' : (
        platform === 'win32' ? 'chrome' : 'firefox'));

// clean task
gulp.task('clean', function() {
    return del([
        allPath.dist + '/**/*'
    ]);
});

// 使用connect启动一个Web服务器
gulp.task('connect', function() {
    connect.server({
        root: connectFlag ? './dist' : './src',
        livereload: {
            enable: true,
            port: portFlag ? 36000 : 36000
        },
        port: portFlag ? 8012 : 9012,
        middleware: function(connect, opt) {
            return [
                /*
                proxy(["/api"], {
                    target: 'your-url',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/'
                    }
                })
                */
            ]
        }
    });
});

gulp.task('watch', function() {
    gulp.src(allPath.src)
        .pipe(plumber())
        .pipe(watch(allPath.src))
        .pipe(connect.reload());
});

// 打开浏览器的任务
gulp.task('open', function() {
    // gulp-open 的选项
    var browserOptions = {
        uri: 'http://localhost:' + (portFlag ? '8012' : '9012'),
        app: browser
    };
    gulp.src(allPath.src)
        .pipe(open(browserOptions));
});

//运行Gulp时,搭建起跨域服务器 开发模式下
gulp.task('server', ['connect'], function() {
    connectFlag = 0;
    portFlag = 0;
    runSequence(['watch', 'open']);
});

// 开始构建 todo
gulp.task('build', ['clean'], function() {
    gutil.log(gutil.colors.yellow('构建开始!'));
    runSequence(productionTask, function() {
        gutil.log(gutil.colors.yellow('构建完成!'));
    });
});

gulp.task('build-server', ['connect'], function() {
    connectFlag = 1;
    portFlag = 1;
    runSequence(['open']);
});