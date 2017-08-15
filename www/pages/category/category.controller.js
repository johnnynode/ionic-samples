angular.module('category.controller', ['categoryService'])
  .controller('CategoryCtrl', [
    '$scope',
    '$ionicScrollDelegate',
    'appUtils',
    'categoryData',
    function ($scope, $ionicScrollDelegate, appUtils, categoryData) {
      /* 初始化数据模型 */
      $scope.isLoading = false;
      var fn = $scope.fn = {};
      fn.go = appUtils.go;
      var dataAll = $scope.dataAll = {};
      dataAll.abc = [];
      dataAll.cate = {};
      dataAll.mapContainer = {}; // 初始化一个盛放各个标签节点个数的对象

      /* 页面初始化 */
      pageInit();
      function pageInit() {
        getAllCategory();
      }

      // 得到所有分类信息
      function getAllCategory() {
        console.log("dataAll.abc");
        // console.log(dataAll.abc);
        // console.log("....");


        angular.forEach(categoryData, function (item) {
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
        dataAll.abc.sort(); // 从A到Z排序
      }

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
