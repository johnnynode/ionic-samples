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
    htmlreplace = require('gulp-html-replace'),
    inject = require('gulp-inject'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'), // 清空文件和文件夹
    open = require('gulp-open'),
    order = require("gulp-order"), // 判断引入优先级
    stripDebug = require('gulp-strip-debug'), // Strip console, alert, and debugger statements
    _if = require('gulp-if'); // 引用判断

var platform = process.platform, // 判断操作系统
    // 定义一组browser的判断
    browser = platform === 'linux' ? 'google-chrome' : (
    platform === 'darwin' ? 'google chrome' : (
        platform === 'win32' ? 'chrome' : 'firefox')),
    // 定义标识
    connectFlag = 0, // 用于控制connect任务中的root路径
    portFlag = 0, // 用于控制端口不同
    timeStamp = new Date().getTime(); // 添加时间戳，标识每次构建生成的不同的文件

// 定义所有的路径
var allPath = {
    src: './src',
    dist: './www',
    watchPath:['./src', './bower.json'],
    index:'./src/index.html',
    fonts:['./src/fonts/**/*', './src/lib/ionic/release/fonts/**/*'],
    // 用于替换的路径
    replacePath: {
        'bowerCss': 'app/vendor.' + timeStamp + '.min.css',
        'appCss':'app/app.' + timeStamp + '.min.css',
        'bowerJs':'app/vendor.' + timeStamp + '.min.js',
        'appJs': 'app/app.' + timeStamp + '.min.js',
        'templates': 'app/app.templates.' + timeStamp + '.min.js'
    },
    // 图片路径
    images: './src/images/**',
    // css路径
    appCss: './src/css/**/*.css',
    // js 路径
    appJs: ['./src/js/**/*.js', './src/components/**/*.js', './src/pages/**/*.js', '!./src/js/app.templates.js'],
    // html 模板路径
    templates:['./src/components/**/*.html', './src/pages/**/*.html']
};

// 定义动态插入的路径
allPath.injectPath = {
    'bowerFiles': bowerFiles(),
    'appCss': allPath.appCss,
    'appJs': allPath.appJs
};

// 生产模式任务
var productionTask = ["index", "data", "images", "fonts", "bower-files", "app-css", "app-js", "templates"];

// 处理index.html相关引入脚本，包括样式和脚本
gulp.task('index', function () {
    return gulp.src(allPath.index)
        .pipe(plumber())
        .pipe(htmlreplace(allPath.replacePath))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(allPath.dist + '/.'));
});

// 处理图片
gulp.task('images', function() {
    return gulp.src(allPath.images)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(allPath.dist + '/images'));
});

// 处理字体图标
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});

// 处理bower相关的样式和脚本构建, 只针对css和js进行处理
gulp.task('bower-files', function() {
    return gulp.src(allPath.injectPath.bowerFiles)
        .pipe(plumber())
        .pipe(order(["ionic.bundle.min.js"]))
        .pipe(_if('*.css', cleanCSS({rebase: true})))
        .pipe(_if('*.css', concat(allPath.replacePath.bowerCss)))
        .pipe(_if('*.css', gulp.dest(allPath.dist + '/.')))
        .pipe(_if('*.js', uglify()))
        .pipe(_if('*.js', concat(allPath.replacePath.bowerJs)))
        .pipe(_if('*.js', gulp.dest(allPath.dist + '/.')))
});

// 处理app 样式
gulp.task('app-css', function() {
    return gulp.src(allPath.appCss)
        .pipe(plumber())
        // todo sass
        .pipe(cleanCSS({rebase: true}))
        .pipe(postcss([autoprefixer()]))
        .pipe(concat(allPath.replacePath.appCss))
        .pipe(gulp.dest(allPath.dist + '/.'));
});

// 处理 appjs
gulp.task('app-js', function() {
    return gulp.src(allPath.appJs)
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat(allPath.replacePath.appJs))
        .pipe(gulp.dest(allPath.dist + '/.'));
});

// 压缩 html 并将它们模板化
gulp.task('templates', function() {
    return gulp.src(allPath.templates)
        .pipe(plumber())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(uglify())
        .pipe(concat(allPath.replacePath.templates))
        .pipe(gulp.dest(allPath.dist + '/.'));
});

// 插入任务
gulp.task('inject', function () {
    gulp.src(allPath.index)
        .pipe(plumber())
        // 注入bower相关的 css 和 js
        .pipe(inject(gulp.src(allPath.injectPath.bowerFiles, {read: false}).pipe(order(["ionic.bundle.min.js"])), {name:'bower', relative: true}))
        // 注入自己模块的css
        .pipe(inject(gulp.src(allPath.injectPath.appCss, {read: false}), {starttag: '<!-- inject:appCss:{{ext}} -->', relative: true}))
        // 注入自己模块的js
        .pipe(inject(gulp.src(allPath.injectPath.appJs, {read: false}), {starttag: '<!-- inject:appJs:{{ext}} -->', relative: true}))
        .pipe(gulp.dest(allPath.src))
});

// clean task
gulp.task('clean', function() {
    return del([
        allPath.dist
    ]);
});

// 使用connect启动一个Web服务器
gulp.task('connect', function() {
    var root = connectFlag ? allPath.dist : allPath.src,
        hostname = '127.0.0.1';
    connect.server({
        root: root,
        fallback: root + '/index.html',
        host: hostname,
        livereload: {
            hostname: hostname,
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
    gulp.src(allPath.watchPath)
        .pipe(plumber())
        .pipe(watch(allPath.watchPath,function (vinyl) {
            var type = vinyl.event;
            // 监控添加和移除的加入
            if (type === 'add' || type === 'unlink') {
                runSequence(['inject']); // 执行插入功能
            }
        }))
        .pipe(connect.reload());
});

// 复制任务
gulp.task('copy', function() {
    return gulp.src(allPath.src + '/**')
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist + '/'));
});

// 复制数据任务，在实际项目中不存在
gulp.task('data', function() {
    return gulp.src(allPath.src + '/data/**')
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist + '/data'));
});

// audio 任务 根据原项目添加，大部分情况是线上的，不会存在这个任务
gulp.task('audio', function() {
    return gulp.src(allPath.src + '/audio/**', { base: allPath.src })
        .pipe(plumber())
        .pipe(gulp.dest(allPath.dist + '/'));
});

// 打开浏览器的任务
gulp.task('open', function() {
    // gulp-open 的选项
    var browserOptions = {
        uri: 'http://127.0.0.1:' + (portFlag ? '8012' : '9012'),
        app: browser
    };
    gulp.src(allPath.src)
        .pipe(open(browserOptions));
});

//运行Gulp时,搭建起跨域服务器 开发模式下
gulp.task('server', function() {
    connectFlag = 0;
    portFlag = 0;
    runSequence(['connect', 'watch', 'inject', 'open']);
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
gulp.task('build-server', function() {
    connectFlag = 1;
    portFlag = 1;
    runSequence(['connect', 'open']);
});