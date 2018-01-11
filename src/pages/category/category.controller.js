angular.module('category.controller', ['categoryService'])
    .controller('CategoryCtrl', [
        '$scope',
        '$rootScope',
        '$timeout',
        '$ionicScrollDelegate',
        'appUtils',
        'categoryData',
        function($scope, $rootScope, $timeout, $ionicScrollDelegate, appUtils, categoryData) {
            /* 初始化数据模型 */
            $scope.isLoading = false;
            var fn = $scope.fn = {};
            fn.go = appUtils.go;
            var dataAll = $scope.dataAll = {};


            // 视图事件
            $scope.$on('$ionicView.beforeEnter', function() {
                getAllCategory(); // 获取数据，本地或者从网络获取
            });

            // 得到所有分类信息
            function getAllCategory() {
                dataAll.abc = [];
                dataAll.cate = {};
                dataAll.mapContainer = {}; // 初始化一个盛放各个标签节点个数的对象
                console.log('categoryData');
                console.log(categoryData);
                // 此处只处理假数据，仅仅是个demo
                // 如果是真实数据，那么先判断本地是否存在，如果不存在，那么网络获取，如果存在，直接使用。
                angular.forEach(categoryData, function(item) {
                    if (item.firstletter) {
                        dataAll.cate[item.firstletter] = dataAll.cate[item.firstletter] || []; // 初始化单元
                        dataAll.cate[item.firstletter].push(item);
                    }
                });

                // 下面将是数据的格式转换 将存在的ABC标签存放到 dataAll.abc 中
                for (var k in dataAll.cate) {
                    dataAll.abc.push(k);
                    dataAll.mapContainer[k] = dataAll.cate[k].length; // 存储每个字母结点代表的分类的学科个数。
                }

                // 使用广播方式, 想到以后这些数据有可能动态加载，存在异步性
                $rootScope.$broadcast("cate:boxCount", dataAll.abc.length);
                dataAll.abc.sort(); // 从A到Z排序
            }

            // 接收广播事件
            $scope.$on('cate:touchMove', function(event, data) {
                getScrollData(data);
            });
            // 隐藏悬浮的字母
            $scope.$on('cate:touchEnd', function(event, data) {
                if (!data) {
                    return;
                }
                // 0.3s之后隐藏
                var t = $timeout(function() {
                    dataAll.letter = '';
                    $timeout.cancel(t);
                }, 300);
            });
            // 接收click广播
            $scope.$on('cate:touchBarClick', function(event, data) {
                getScrollData(data);
            });

            // 通用获取滚动事件
            function getScrollData(data) {
                // console.log('data');
                // console.log(data);
                var distance = data.distance;
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

        }
    ])
    .directive('categoryTouchBar', function($rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            link: function(scope, element) {
                var ele = element[0]; // 获取元素
                var eleTop = 0; // touchBar元素距离浏览器顶部位置初始化
                var eleClientRectTop = ele.getBoundingClientRect().top; // touchBar中心位置距离顶部的距离

                var touchEnd = 0; // 移动结束的位置
                var distance = 0; // 移动的距离

                // 初始化其他用到的数据
                var boxUnit = 16; // 此处是固定的单元字母高度
                var boxHeight = 0; // 初始化盒子高度

                /* 接收获取的广播数据 */
                $rootScope.$on("cate:boxCount", function(e, data) {
                    if (!data) {
                        return;
                    }
                    boxHeight = data * boxUnit; // 通过网络获取，计算得出整体高度
                });

                // 滑动开始
                ionic.EventController.on('touchstart', function(e) {
                    e.preventDefault();
                    eleTop = eleClientRectTop - boxHeight / 2; // 计算元素顶部距离浏览器顶部的位置
                    console.log('eleTop');
                    console.log(eleTop);
                }, ele);

                // 滑动中
                ionic.EventController.on('touchmove', function(e) {
                    e.preventDefault();
                    touchEnd = e.touches[0].clientY;
                    distance = touchEnd - eleTop;
                    distance = distance > boxHeight ? boxHeight : (distance < 0 ? 0 : distance); // 超出过滤功能

                    // boxHeight是touchBar的高度, boxUnit是每个字符的高度, distance 是最后在touchBar上的位置距离touchBar顶部的位置。
                    var moveObj = {
                        boxHeight: boxHeight,
                        boxUnit: boxUnit,
                        distance: distance
                    };

                    scope.$emit('cate:touchMove', moveObj); // 发送广播
                }, ele);

                // 滑动结束隐藏
                ionic.EventController.on('touchend', function() {
                    scope.$emit('cate:touchEnd', 1); // 发送广播
                }, ele);

                // 对单纯点击的支持
                ionic.EventController.on('click', function(e) {
                    var moveObj = {
                        boxHeight: boxHeight,
                        boxUnit: boxUnit,
                        distance: (e.pageY || e.y) - eleTop
                    };
                    scope.$emit('cate:touchBarClick', moveObj); // 发送广播
                }, ele);
            }
        };
    });