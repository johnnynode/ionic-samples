angular.module('ionic-samples')
  .controller('MarouselCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'appUtils',
    'global',
    function ($scope, $http, $timeout, appUtils, global) {
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
      
      // 页面初始化
      pageInit();

      /* 页面初始化 */
      function pageInit() {
        loadingHide(); // loading 效果
        getMagList(); // 获取杂志列表
        getLatest(); // 获取最新杂志
      }

      /* 封装通用获取数据的方法 */
      function getData(url, callback) {
        $http.get(url)
          .success(function (data) {
            callback && callback(data);
          })
          .error(function () {
            callback && callback(null);
          });
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
        getData(global.dataUrl + '/mag-list.json',function (data) {
          if(!data) {
            return;
          }
          $scope.magList = $scope.magList.concat(data);
        });
      }

      /* 获取最新期 */
      function getLatest() {
        getData(global.dataUrl + '/latest.json',function (data) {
          if(!data) {
            return;
          }
          $scope.volList = data;
        });
      }

      /* 根据杂志code获取该杂志的期 */
      function getVolByMagCode(magCode) {
        switch (magCode) {
          case "ECON":
            getData(global.dataUrl + '/eco-list.json',function (data) {
              if(!data) {
                return;
              }
              $scope.volList = data;
            });
            break;
          case "BIOL":
            getData(global.dataUrl + '/bio-list.json',function (data) {
              if(!data) {
                return;
              }
              $scope.volList = data;
            });
            break;
          case "COMP":
            getData(global.dataUrl + '/com-list.json',function (data) {
              if(!data) {
                return;
              }
              $scope.volList = data;
            });
            break;
          default:
            // 分配给最新期
            getData(global.dataUrl + '/latest.json',function (data) {
              if(!data) {
                return;
              }
              $scope.volList = data;
            });
        }
      }

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
