(function(angular) {
    // 配置模块，控制不同平台的兼容性
    angular.module('utils', [])
        .factory('appUtils', [
            '$state',
            '$ionicViewSwitcher',
            '$ionicNativeTransitions',
            '$ionicHistory',
            '$cookies',
            '$ionicModal',
            '$cordovaInAppBrowser',
            '$cordovaToast',
            '$cordovaKeyboard',
            '$ionicScrollDelegate',
            function($state, $ionicViewSwitcher, $ionicNativeTransitions, $ionicHistory, $cookies, $ionicModal,
                $cordovaInAppBrowser, $cordovaToast, $cordovaKeyboard, $ionicScrollDelegate) {
                /* util 构造函数 */
                var Util = function() {};

                /* util 原型对象 */
                Util.prototype = {
                    /* 通用返回函数 */
                    back: function() {
                        // 不同平台分别处理,此处使用了ionic-native-transitions插件
                        $ionicViewSwitcher.nextDirection('back');
                        ionic.Platform.isIOS() ? $ionicHistory.goBack() : $ionicNativeTransitions.goBack();
                    },

                    /* 进入某个路由模块 */
                    /* 路由的跳转不推荐使用a标签加上相应属性来做,用事件和下面的方法来跳转有效果较好的转场动画 */
                    go: function(route, params, callback) {
                        $ionicViewSwitcher.nextDirection('forward');
                        $state.go(route, params);
                        callback && typeof callback === 'function' && callback();
                    },

                    /* 解决双平台刷新问题的直接进入 tab栏 on-select 时使用 直接进入模块(无动画) */
                    doGo: function(url) {
                        $ionicNativeTransitions.locationUrl(url, {
                            "type": "fade",
                            "duration": 0
                        });
                    },

                    /* 字符串 trim 函数 */
                    trim: function(str) {
                        if (typeof str === 'string') {
                            return str.replace(/^\s+|\s+$/g, "");
                        }
                    },

                    /* 截取字符串的方法 */
                    textCut: function(str, num) {
                        if (typeof str === 'string' && typeof num === 'number' && str.length >= num) {
                            var temp = str.slice(0, num);
                            var last = temp.lastIndexOf(' '); // 找到空格的索引
                            temp = null; // 内存回收
                            return str.slice(0, last) + '...';
                        }
                        return str;
                    },

                    /* 此处只演示基于cookie的存储方法 | flag标识: 0 -> ip用户(匿名) , 1 -> 正常用户 */
                    /* isLogin为同步存储的登录标识 */
                    storage: function(data, flag, callback) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 90); // 设置过期时间为3个月(90天)
                        $cookies.put('token', data.token, { 'expires': expireDate }); // cookie 存储token
                        $cookies.put('user', JSON.stringify(data), { 'expires': expireDate }); // cookie 存储 userInfo

                        // 下面是为正常用户和匿名ip用户的设置，登录与否的标识是isLogin
                        flag ? $cookies.put('isLogin', true, { 'expires': expireDate }) : $cookies.remove('isLogin');
                        callback && angular.isFunction(callback) && callback();
                    },

                    /* 判断是否登录 */
                    isLogin: function() {
                        return $cookies.get('isLogin');
                    },

                    /* 退出功能 */
                    logout: function(fn) {
                        $cookies.remove('user');
                        $cookies.remove('token');
                        $cookies.remove('isLogin');
                        fn && typeof fn === "function" && fn();
                    },

                    /* 获取用户信息 */
                    getUser: function() {
                        return $cookies.get('user');
                    },

                    /* 用户提示功能 */
                    tips: function(prompt, index) {
                        // 位置信息 0 上 , 1 中 , 2 下
                        switch (index) {
                            case 0:
                                return window.cordova ? $cordovaToast.showShortTop(prompt) : alert(prompt);
                                break;
                            case 1:
                                return window.cordova ? $cordovaToast.showShortCenter(prompt) : alert(prompt);
                                break;
                            case 2:
                                return window.cordova ? $cordovaToast.showShortBottom(prompt) : alert(prompt);
                                break;
                        }
                    },

                    /* 弹出模态窗口功能 */
                    showModal: function(path, scope, animation, cb) {
                        $ionicModal.fromTemplateUrl(path, {
                            scope: scope,
                            animation: animation
                        }).then(function(modal) {
                            cb && angular.isFunction(cb) && cb(modal);
                        });
                    },

                    /* 隐藏 modal */
                    hideModal: function(modal) {
                        modal.hide();
                    },

                    /* 移除 modal 支持多个modal一起移除 */
                    destroyModal: function(scope, modal) {
                        scope.$on('$destroy', function() {
                            // 如果是单个，则直接移出，如果是数组，则迭代移除
                            if (Array.isArray(modal)) {
                                modal.forEach(function(item) {
                                    item.remove();
                                })
                            } else {
                                modal && modal.remove();
                            }
                        });
                    },

                    /* 清除历史记录功能，每次回到tab根目录调用,修复ionic偶尔无法回退bug */
                    clearHistory: function() {
                        $ionicHistory.clearHistory();
                    },

                    /* pdf的方法 */
                    openPdf: function(url) {
                        // 安卓平台进入pdf模块打开，使用的是嵌入了一个pdf的h5网页(后台处理之后的页面)
                        if (!ionic.Platform.isIOS()) {
                            return this.go('pdf', { pdf: url });
                        }
                        // iOS平台通过内置safari打开
                        var options = {
                            location: 'yes',
                            clearcache: 'yes',
                            toolbar: 'yes'
                        };
                        // 下面此处只有真机能够打开,浏览器打不开
                        document.addEventListener("deviceready", function() {
                            $cordovaInAppBrowser.open(url, '_system', options)
                        }, false);
                    },

                    /* 测试用户是否登录 */
                    checkAndGoLogin: function(cb1, cb2) {
                        var flag = this.isLogin(); // 是否登录
                        if (flag) return cb1();
                        this.go('login', null, cb2);
                    },

                    /* 数组去重功能 */
                    arrayUnique: function(arr) {
                        if (!Array.isArray(arr)) return;
                        var res = [];
                        var json = {};
                        for (var i = 0; i < arr.length; i++) {
                            if (!json[arr[i]]) {
                                res.push(arr[i]);
                                json[arr[i]] = 1;
                            }
                        }
                        return res;
                    },

                    /* 存储搜索记录 */
                    getSearchTextStorage: function(searchText) {
                        var searchList = [];
                        var res = [];
                        if (localStorage.searchList && searchText) {
                            searchList = JSON.parse(localStorage.searchList);
                            searchList.unshift(searchText); // 头部加1
                            res = this.arrayUnique(searchList); // 数组去重
                        } else if (!localStorage.searchList && searchText) {
                            res.unshift(searchText);
                        } else {
                            return localStorage.searchList ? JSON.parse(localStorage.searchList) : [];
                        }
                        localStorage.searchList = JSON.stringify(res); // 本地存储
                        return res;
                    },
                    /* 键盘监听 只针对安卓,ios会自动处理 */
                    /* 其中window.addEventListener可使用ionic内置的 ionic.EventController.on代替 */
                    listenKeyBoard: function(cb_show, cb_hide) {
                        if (ionic.Platform.isIOS()) return;
                        window.addEventListener('native.keyboardshow', function() {
                            cb_show && typeof cb_show === 'function' && cb_show();
                        });
                        window.addEventListener('native.keyboardhide', function() {
                            cb_hide && typeof cb_hide === 'function' && cb_hide();
                        });
                    },

                    /* 隐藏键盘 */
                    hideKeyBoard: function() {
                        if (!$cordovaKeyboard.isVisible()) return;
                        $cordovaKeyboard.close();
                    },

                    /* 媒体文件相关功能 */

                    /* 用于判断数字是否 < 10 , < 10 则补0 */
                    tenFormat: function(num) {
                        return num / 10 < 1 ? '0' + num : num;
                    },

                    /* 处理时分秒 */
                    handleTime: function(hour, min, sec) {
                        var hh = this.tenFormat(hour);
                        var mm = this.tenFormat(min);
                        var ss = this.tenFormat(sec);
                        return hh + ':' + mm + ':' + ss;
                    },

                    /* 获取音频或视频时长 */
                    getMediaDuration: function(scope, media, mediaData) {
                        if (!media.duration) {
                            return;
                        }
                        mediaData.current = mediaData.duration = '00:00:00'; // 先初始化时间
                        mediaData.durationOrigin = media.duration; // 得到音频或视频时长
                        var hh = Math.floor(media.duration / 3600);
                        var mm = Math.floor(media.duration % 3600 / 60);
                        var ss = Math.floor(media.duration % 60);
                        mediaData.duration = this.handleTime(hh, mm, ss); // 得到经过格式转换之后的音频或视频时长
                        scope.$apply();
                    },

                    /* 检查媒体时长 */
                    checkToGetMediaDuration: function(scope, media, mediaData) {
                        !mediaData.durationOrigin && this.getMediaDuration(scope, media, mediaData);
                    },

                    /* 处理正在进行的时间 格式为: hh:mm:ss */
                    handlePlayingTime: function(time) {
                        var hh = Math.floor(time / 3600);
                        var mm = Math.floor(time % 3600 / 60);
                        var ss = Math.floor(time % 60);
                        return this.handleTime(hh, mm, ss);
                    },
                    // 隐藏闪屏
                    enterSettings: function() {
                        navigator.splashscreen && navigator.splashscreen.hide && navigator.splashscreen.hide(); // 设置闪屏
                        window.StatusBar && window.StatusBar.show(); // 显示状态栏
                    },

                    // 滚动到最顶部方法
                    scrollToTop: function(name, flag) {
                        $ionicScrollDelegate.$getByHandle(name).scrollTop(flag);
                    }
                };

                return new Util();
            }
        ]);
})(angular);
