angular.module('samples.mp3.controller', [])
    .controller('Mp3Ctrl', [
        '$scope',
        '$sce',
        'appUtils',
        function($scope, $sce, appUtils) {
            $scope.back = appUtils.back;
            var renderData = $scope.renderData = {};
            renderData.source = $sce.trustAsResourceUrl('audio/music.mp3');

            // 接收广播事件
            $scope.$on('audio:playState', function(event, data) {
                renderData.playAnimation = data;
            });
        }
    ]);
