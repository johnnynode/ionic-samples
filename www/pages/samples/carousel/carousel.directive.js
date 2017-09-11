(function (angular) {
  "use strict";
  // 定义一些通用的指令
  angular.module('samples.carousel.directive', [])
    .directive('carouselSlider', function (appUtils, $compile, $timeout) {
      return {
        restrict: 'A',
        scope: {
          volList: '=',
          charShow: '='
        },
        template: '<div class="slider-wrap"></div>',
        link: function (scope) {
          // 所有设置函数
          function setUp() {
            // 针对宽高比的判断
            // 进行轮播图的 dom 生成操作
            var $ = angular.element; // jqLite 对象
            var slideBox = document.querySelector('.slider-wrap'); // 获取轮播盒子对象
            var sliderInner = document.createElement('ul');
            sliderInner.className = 'slider-wrap-inner';
            slideBox.appendChild(sliderInner);

            // 杂志点击的回调 可用于其他逻辑处理
            scope.magClick = function (title) {
              console.log(title);
            };

            // 缩放的动画
            function scale(obj, rate) {
              if (!obj) return;
              obj.style.transform = "scale(" + rate + ")";
              obj.style.webkitTransform = "scale(" + rate + ")";
            }

            // 获取数据
            function getData(list, callback) {
              // 通过获得的数据,生成节点操作
              for (var i = 0; i < list.length; i++) {
                var li = document.createElement('li');
                var img = document.createElement('img');
                var imgWrap = document.createElement('div');
                imgWrap.className = 'img-wrap';
                img.src = 'images/transparent.gif';
                // 首先先加载前三张图片的地址,其他的作懒加载处理
                if (i < 3) {
                  img.setAttribute('style', 'background-image:url(' + list[i].coverimg + ')');
                }
                imgWrap.appendChild(img);
                li.appendChild(imgWrap);
                li.setAttribute('on-tap', 'magClick("' + list[i].title + '")'); // 绑定事件
                $(sliderInner).append($(li));
              }
              var htmlObj = $compile($(sliderInner).html())(scope); // 对html 进行重新编译
              $(sliderInner).html(''); // 清空
              $(sliderInner).append(htmlObj); // 追加
              var lis = sliderInner.querySelectorAll('li'); // 得到当前的所有li对象
              var imgs = []; // 用于存放图像包裹节点
              // 图像包裹节点数组, 初始化样式
              for (var k = 0; k < lis.length; k++) {
                if (!k) {
                  imgs.push(lis[0].querySelector('.img-wrap')); // 第一个只 push 进去 ,不 设置样式
                  continue;
                }
                var item = lis[k].querySelector('.img-wrap');
                scale(item, 252 / 291); // 样式初始化缩放
                imgs.push(item); // 并push
              }
              callback && angular.isFunction(callback) && callback(imgs, list); // 将数据通过callback带走
            }

            // 针对杂志切换,数据同时切换
            scope.$watch('volList', function (now) {
              if (now && now.length) {
                sliderInner.innerHTML = ''; // 先清空内容
                // 使用$timeout来解决宽度问题,重新渲染dom.
                $timeout(function(){
                  getData(now, function (imgs, now) {
                    var m = new MobileMove(); // 重新new
                    m.setSwipe(slideBox, sliderInner, imgs, now);
                  });
                });
              }
            });
          }

          // 页面加载完成后执行
          var contentLoaded = scope.$watch('$viewContentLoaded', function() {
            setUp(); // 全面设置
            contentLoaded(); // 取消 watch
          });
        }
      };
    })
})(angular);
