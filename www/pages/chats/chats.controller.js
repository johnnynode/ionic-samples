angular.module('chats.controller', [])
    .controller('ChatsCtrl', [
    	'$scope', 
    	'categoryData', 
    	function($scope, ionicScrollDelegate, categoryData) {
    		// 接收广播事件
                $scope.$on('touchMove', function (event, data) {
                    getScrollData(data);
                });
        	// 隐藏悬浮的字母
            $scope.$on('touchEnd', function (event, data) {
                if (!data) {
                    return;
                }
                $timeout(function () {
                    dataAll.letter = '';
                }, 300);
            });
            // 接收click广播
            $scope.$on('touchBarClick', function (event, data) {
                getScrollData(data);
            });

            // 通用获取滚动事件
            function getScrollData(data) {
                var distance = data.distance;
                if (!localStorage.distance || Number(localStorage.distance) !== distance) {
                    localStorage.distance = distance;
                } else {
                    return; // 不满足条件直接 return
                }
                var unit = data.boxUnit;
                var num = Math.ceil(distance / unit) - 1;
                num = num < 0 ? 0 : num; // 对num进行过滤处理
                dataAll.letter = dataAll.abc[num];
                getScrollDistanceByLetter(dataAll.letter); // 根据字母开始滚动
                $scope.$apply();
            }

            // 根据字母计算滚动的距离
            function getScrollDistanceByLetter(letter) {
                // 特殊情况 A
                if (letter === 'A') {
                    return $ionicScrollDelegate.$getByHandle('cateContScroll').scrollTo(0, 0, false); // 滚动特效
                }

                var initHeight = 0; // 初始高度
                // 循环累加，算出距离
                for (var k in dataAll.abc) {
                    var item = dataAll.abc[k]; // 单项
                    // 直到和字母相同跳出循环
                    if (item === letter) {
                        break;
                    }
                    var count = dataAll.mapContainer[item];
                    initHeight += (22 + 61 * count);
                }
                $ionicScrollDelegate.$getByHandle('cateContScroll').scrollTo(0, initHeight, false); // 滚动特效
            }





    	}]);
