(function(angular) {
    "use strict";
    angular.module('ionic-samples')
        .directive('mp3Container', function($timeout, appUtils) {
            return {
                restrict: 'EA',
                templateUrl: 'pages/directives/html/mp3.html',
                scope: {
                    source: '='
                },
                link: function(scope, element) {
                    // 初始化变量和数据成员
                    var audio = element.find('audio')[0]; // 获取视频元素
                    var audioData = scope.audioData = {};
                    audioData.playing = false; // 控制是否播放中
                    audioData.currentOrigin = 0; // 当前播放进度

                    /* 播放与暂停 */
                    scope.play = function() {
                        if (!audioData.playing) {
                            audio.autoplay = audioData.playing = true;
                            audio.play();
                            scope.$emit('audio:playState', true); // 发送广播
                        } else {
                            audio.autoplay = audioData.playing = false;
                            audio.pause();
                            scope.$emit('audio:playState', false); // 发送广播
                        }
                    };

                    // 滑动功能实现
                    scope.seeking = function() {
                        audio.currentTime = audioData.currentOrigin;
                    };

                    // 事件监听: loadstart
                    ionic.EventController.on('loadstart', function() {}, audio);

                    // 事件监听: 元数据加载完成后 此时获取时长
                    ionic.EventController.on('loadedmetadata', function() {
                        appUtils.checkToGetMediaDuration(scope, audio, audioData);
                        this.autoplay = audioData.playing = false; // 为了兼容
                        scope.$apply();
                    }, audio);

                    // 事件监听: durationchange
                    ionic.EventController.on('durationchange', function() {
                        appUtils.checkToGetMediaDuration(scope, audio, audioData);
                        this.autoplay = true; // 为了兼容
                        scope.$apply();
                    }, audio);

                    // 事件监听: onprogress 正在下载中
                    ionic.EventController.on('progress', function() {
                        appUtils.checkToGetMediaDuration(scope, audio, audioData);
                        scope.$apply();
                    }, audio);

                    // 事件监听: waiting
                    ionic.EventController.on('waiting', function() {
                        this.autoplay = audioData.playing = false;
                        scope.$apply();
                    }, audio);

                    // 事件监听: seeking
                    ionic.EventController.on('seeking', function() {
                        audioData.playing = this.autoplay = false; // 为了兼容 = true ; 无法继续播放时loading ; seeking 保持播放状态
                        scope.$emit('audio:playState', false); // 发送广播
                        $timeout(function() {
                            audio.play(); // 强制播放
                            scope.$emit('audio:playState', true); // 发送广播
                        });
                        scope.$apply();
                    }, audio);

                    // 事件监听: 在可播放时 只会触发一次 , 播放按钮状态 : 可播放
                    ionic.EventController.on('playing', function() {
                        appUtils.checkToGetMediaDuration(scope, audio, audioData);
                        this.autoplay = audioData.playing = true; // 为了兼容 此处 loading 应为false,但安卓低端机器存在问题
                        scope.$emit('audio:playState', true); // 发送广播
                        scope.$apply();
                    }, audio);

                    // 事件监听: 监听暂停事件
                    ionic.EventController.on('pause', function() {
                        audioData.playing = false;
                        scope.$apply();
                    }, audio);

                    // 事件监听: 音频播放位置发生改变时触发
                    ionic.EventController.on('timeupdate', function() {
                        appUtils.checkToGetMediaDuration(scope, audio, audioData);
                        audioData.currentOrigin = audio.currentTime; // 获取视频当前时间
                        audioData.current = appUtils.handlePlayingTime(audio.currentTime); // 获取格式转换之后的视频当前时间
                        scope.$apply();
                    }, audio);

                    // 事件监听: 视频可以流畅播放到结束
                    ionic.EventController.on('canplaythrough', function() {}, audio);

                    // 事件监听: 视频可以流畅播放
                    ionic.EventController.on('canplay', function() {}, audio);

                    // 事件监听: 播放完成
                    ionic.EventController.on('ended', function() {
                        this.pause();
                        scope.$emit('audio:playState', false); // 发送广播
                        scope.$apply();
                    }, audio);
                }
            };
        });
})(angular);
