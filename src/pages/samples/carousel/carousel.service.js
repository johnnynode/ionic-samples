(function (angular) {
  // 提供数据支持
  angular.module('ionic-samples')
    .factory('CarouselData', [
      function () {
        return {
          // 杂志列表
          magList: [],
          // 最新杂志
          latest: [],
          // 经济学杂志
          ecoList:[],
          // 生物技术
          bioList:[],
          // 计算机
          comList:[]
        }
      }
    ]);
})(angular);
