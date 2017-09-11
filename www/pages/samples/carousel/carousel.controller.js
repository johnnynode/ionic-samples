angular.module('samples.carousel.controller', ['samples.carousel.directive', 'carouselDataSupport'])
  .controller('MarouselCtrl', [
    '$scope',
    '$timeout',
    'appUtils',
    'CarouselData',
    function ($scope, $timeout, appUtils, CarouselData) {
      /* 初始化数据模型 */
      $scope.back = appUtils.back;

      $scope.magList = []; // 杂志列表
      $scope.volList = []; // 期列表数据
      $scope.curMag = '最新'; // 默认杂志 : 最新
      $scope.isLoading = true; // loading 默认 true
      var fn = $scope.fn = {};

      /* 进入视图,收起 */
      $scope.$on('$ionicView.beforeEnter', function () {
        $scope.spread = false; // 默认不展开
      });

      pageInit();

      /* 页面初始化 */
      function pageInit() {
        loadingHide(); // loading 效果
        getMagList(); // 获取杂志列表
        getLatest(); // 获取最新杂志
      }

      /* 图片质量较大 添加延迟隐藏方法 */
      function loadingHide() {
        var t = $timeout(function () {
          $scope.isLoading = false;
          $timeout.cancel(t); // 去除延定时器
        }, 300);
      }

      /* 获取杂志列表 */
      function getMagList() {
        var json = {
          "magName": "最新"
        };
        $scope.magList.push(json);
        $scope.magList = $scope.magList.concat(CarouselData.magList);
      }

      /* 获取最新期 */
      function getLatest() {
        $scope.volList = CarouselData.latest; // 最新期数据
      }

      /* 根据杂志code获取该杂志的期 */
      function getVolByMagCode(magCode) {
        switch (magCode) {
          case "ECON":
            $scope.volList = CarouselData.ecoList;
            break;
          case "BIOL":
            $scope.volList = CarouselData.bioList;
            break;
          case "COMP":
            $scope.volList = CarouselData.comList;
            break;
          default:
            console.log("not match");
            $scope.volList = CarouselData.latest; // 分配给最新期
        }
      }

      /* 去除 电子杂志 字样 */
      fn.handleName = function (str) {
        return str.replace(/电子杂志/g, '');
      };

      /* 隐藏灰层 */
      fn.hideGray = function() {
        $scope.spread = false;
      }

      /* 杂志的点击 */
      fn.switchVols = function (index, item) {
        $scope.spread = false; // 默认收起
        $scope.isLoading = $scope.curMag !== item.magName; // 表示切换了
        // 没有loading ,不去请求数据
        if (!$scope.isLoading) return;
        // 有loading, 设置效果
        loadingHide();
        // 点击第一个获取最新数据
        if (!index) {
          $scope.curMag = '最新';
          return getLatest();
        }
        getVolByMagCode(item.magCode);
        $scope.curMag = item.magName;
      }
    }
  ]);
