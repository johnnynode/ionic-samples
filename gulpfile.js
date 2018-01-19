//引入插件
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    plumber = require('gulp-plumber'),
    process = require('process'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'), // 压缩image
    sass = require('gulp-sass'), // sass 文件处理
    cleanCSS = require('gulp-clean-css'), // 压缩css
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'), // 压缩html
    uglify = require('gulp-uglify'), // 压缩js
    gutil = require('gulp-util'),
    bowerFiles = require('main-bower-files'), // bower相关文件处理
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    del = require('del'), // 清空文件和文件夹
    open = require('gulp-open'),
    _if = require('gulp-if'); // 引用判断


var allPath = {
    src: './src',
    dist: './www'
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
        allPath.dist
    ]);
});

// 使用connect启动一个Web服务器
gulp.task('connect', function() {
    var root = connectFlag ? allPath.dist : allPath.src;
    connect.server({
        root: root,
        fallback: root + '/index.html',
        host: '127.0.0.1',
        livereload: {
            hostname: '127.0.0.1',
            enable: true,
            port: portFlag ? 36000 : 35729
        },
        port: portFlag ? 8012 : 9012,
        middleware: function(connect, opt) {
            return [
                /* 这里做跨域处理
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

// 监控任务
gulp.task('watch', function() {
    gulp.src(allPath.src)
        .pipe(plumber())
        .pipe(watch(allPath.src))
        .pipe(connect.reload());
});

// 复制任务
gulp.task('copy', function() {
    return gulp.src(allPath.src + '/**')
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist + '/'));
});

// audio 任务 根据原项目添加，大部分情况是线上的，不会存在这个任务
gulp.task('audio', function() {
    return gulp.src(allPath.src + '/audio/**', { base: allPath.src })
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist + '/'));
});

// css 任务
gulp.task('css', function() {
    return gulp.src(allPath.src + '/css/**', { base: allPath.src })
        .pipe(plumber())
        .pipe(_if('*.scss', sass.sync()))
        .pipe(cleanCSS({ rebase: false }))
        .pipe(concat('/css/app.min.css'))
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist));
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
    console.time('build');
    gutil.log(gutil.colors.yellow('🚄 构建开始!'));
    runSequence(productionTask, function() {
        gutil.log(gutil.colors.yellow('🔥 构建完成,总共用时：'));
        console.timeEnd('build');
    });
});

// 构建之后开启服务器
gulp.task('build-server', ['connect'], function() {
    connectFlag = 1;
    portFlag = 1;
    runSequence(['open']);
});