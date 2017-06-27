angular.module('samples.video.controller', [])
    .controller('VideoCtrl', [
        '$scope',
        '$sce',
        'appUtils',
        function($scope, $sce, appUtils) {
            $scope.back = appUtils.back;
            var renderData = $scope.renderData = {};
            renderData.videoSrc = $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4');
            renderData.hideBar = false; // 控制是否隐藏 bar

            /* 视图事件 */
            $scope.$on('$ionicView.afterEnter', function() {
                // 锁定屏幕,让其全屏横屏显示
                if (!window.cordova) {
                    return;
                }
                window.screen.orientation.lock('landscape');
            });
            $scope.$on('$ionicView.afterLeave', function() {
                // 还原成竖屏
                if (!window.cordova) {
                    return;
                }
                window.screen.orientation.lock('portrait');
            });

            // 接收广播
            $scope.$on('videoBarHide', function(event, data) {
                if (!data) {
                    return;
                }
                renderData.hideBar = true;
                $scope.$apply();
            });
            $scope.$on('videoBarShow', function(event, data) {
                if (!data) {
                    return;
                }
                renderData.hideBar = false;
                $scope.$apply();
            });
        }
    ]);
