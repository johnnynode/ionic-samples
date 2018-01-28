(function(angular) {
    "use strict";
    angular.module('ionic-samples')
        .directive('videoContainer', function(appUtils) {
            return {
                restrict: 'EA',
                templateUrl: 'pages/directives/html/video.html',
                scope: {
                    source: '='
                },
                link: function(scope, element) {
                    // 初始化数据成员
                    // 视频默认是要点击后播放的
                    var video = element.find('video')[0]; // 获取视频元素
                    var videoFlag = 0; // 用于检测video播放
                    var videoData = scope.videoData = {};
                    videoData.playing = false; // 控制是否播放中
                    videoData.currentOrigin = 0; // 当前播放进度

                    // 点击播放按钮或暂停功能
                    scope.play = function() {
                        if (!videoData.playing) {
                            video.autoplay = videoData.playing = true;
                            video.play();
                        } else {
                            video.autoplay = videoData.playing = false;
                            video.pause();
                        }
                    };

                    // 滑动功能实现
                    scope.seeking = function() {
                        video.currentTime = videoData.currentOrigin;
                        videoFlag = 0;
                    };

                    // 事件监听
                    // 开始播放 , 初始化所有数据
                    ionic.EventController.on('loadstart', function() {
                        videoData.playing = this.autoplay = false; // 默认是播放状态，同loading
                        videoData.isLoading = true; // 开始loading
                        scope.$apply();
                    }, video);

                    // 元数据加载完成后 此时获取时长
                    ionic.EventController.on('loadedmetadata', function() {
                        appUtils.checkToGetMediaDuration(scope, video, videoData);
                        videoFlag = 0; // 此处归零 表示视频
                        this.autoplay = videoData.isLoading = false; // 为了兼容
                        scope.$apply();
                    }, video);

                    ionic.EventController.on('durationchange', function() {
                        appUtils.checkToGetMediaDuration(scope, video, videoData);
                        this.autoplay = true; // 为了兼容
                        scope.$apply();
                    }, video);

                    // onprogress 正在下载中
                    ionic.EventController.on('progress', function() {
                        appUtils.checkToGetMediaDuration(scope, video, videoData);
                        scope.$apply();
                    }, video);

                    // waiting
                    ionic.EventController.on('waiting', function() {
                        videoData.isLoading = this.autoplay = true; // 为了兼容 true; // 无法继续播放时loading
                        videoData.playing = true; // 同样保持播放状态
                        scope.$apply();
                    }, video);

                    // seeking
                    ionic.EventController.on('seeking', function() {
                        videoData.isLoading = videoData.playing = this.autoplay = true; // 为了兼容 = true ; 无法继续播放时loading ; seeking 保持播放状态
                        this.play(); // 强制播放
                        scope.$apply();
                    }, video);

                    // 在可播放时 只会触发一次 , 播放按钮状态 : 可播放
                    ionic.EventController.on('playing', function() {
                        appUtils.checkToGetMediaDuration(scope, video, videoData);
                        this.autoplay = videoData.isLoading = true; // 为了兼容 此处 loading 应为 false ,但安卓低端机器存在问题
                        scope.$apply();
                    }, video);

                    // 监听暂停事件
                    ionic.EventController.on('pause', function() {
                        videoData.playing = videoData.isLoading = false;
                        scope.$apply();
                    }, video);

                    // 音频播放位置发生改变时触发

                    /* 设置为自动隐藏  */
                    ionic.EventController.on('timeupdate', function() {
                        appUtils.checkToGetMediaDuration(scope, video, videoData);
                        videoData.currentOrigin = video.currentTime; // 获取视频当前时间
                        videoData.current = appUtils.handlePlayingTime(video.currentTime); // 获取格式转换之后的视频当前时间

                        if (videoFlag >= 1) { // timeupdate 时,开始播放 兼容问题
                            videoData.isLoading = false;
                            videoData.playing = true; // 播放按钮呈现
                        }

                        if (videoFlag === 10) {
                            videoData.hide = true;
                            scope.$emit('videoBarHide', 1); // 发送广播, 隐藏bar
                        }

                        videoFlag++;
                        scope.$apply();
                    }, video);

                    // 触摸取消隐藏
                    ionic.EventController.on('touchstart', function() {
                        videoFlag = 0;
                        scope.$emit('videoBarShow', 1); // 发送广播, 显示bar
                    }, video);

                    // 视频可以流畅播放到结束
                    ionic.EventController.on('canplaythrough', function() {}, video);

                    // 视频可以流畅播放
                    ionic.EventController.on('canplay', function() {}, video);

                    // 播放完成
                    ionic.EventController.on('ended', function() {
                        this.pause();
                        scope.hide = false; // 显示
                        scope.$apply();
                    }, video);
                }
            };
        });
})(angular);
