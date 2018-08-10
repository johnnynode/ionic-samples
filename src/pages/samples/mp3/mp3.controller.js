angular.module('ionic-samples')
    .controller('Mp3Ctrl', [
        '$scope',
        '$sce',
        'appUtils',
        'global',
        function($scope, $sce, appUtils, global) {
            $scope.back = appUtils.back;
            var renderData = $scope.renderData = {};
            var sourceUrl = global.mediaUrl + '/audio/music.mp3';
            console.log("sourceUrl: ", sourceUrl);
            renderData.source = $sce.trustAsResourceUrl(sourceUrl);

            // 接收广播事件
            $scope.$on('audio:playState', function(event, data) {
                renderData.playAnimation = data;
            });
        }
    ]);
