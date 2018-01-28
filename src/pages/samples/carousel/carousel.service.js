(function (angular) {
  // 提供数据支持
  angular.module('ionic-samples')
    .factory('CarouselData', [
      function () {
        return {
          // 杂志列表
          magList: [
            {
              "magName": "经济学",
              "magCode": "ECON"
            },
            {
              "magName": "生物技术",
              "magCode": "BIOL"
            },
            {
              "magName": "计算机科技",
              "magCode": "COMP"
            }
          ],
          // 最新杂志
          latest: [
            {
              "coverimg": "images/carousel/latest01.jpg",
              "title": "民间文学",
              "magCode": "LITE",
            },
            {
              "coverimg": "images/carousel/latest02.jpg",
              "title": "视觉传播",
              "magCode": "COAR"
            },
            {
              "coverimg": "images/carousel/latest03.jpg",
              "title": "光量子器件及通信",
              "magCode": "COMM"
            },
            {
              "coverimg": "images/carousel/latest04.jpg",
              "title": "营养管理",
              "magCode": "FOOD"
            },
            {
              "coverimg": "images/carousel/latest05.jpg",
              "title": "晶体材料",
              "magCode": "MATE"
            }
          ],
          // 经济学杂志
          ecoList:[
            {
              "coverimg": "images/carousel/econ01.jpg",
              "title": "经济增长",
              "magCode": "ECON"
            },
            {
              "coverimg": "images/carousel/econ02.jpg",
              "title": "绿色经济",
              "magCode": "ECON"
            },
            {
              "coverimg": "images/carousel/econ03.jpg",
              "title": "网络经济",
              "magCode": "ECON"
            },
            {
              "coverimg": "images/carousel/econ04.jpg",
              "title": "蓝海战略",
              "magCode": "ECON"
            },
            {
              "coverimg": "images/carousel/econ05.jpg",
              "title": "电子商务市场",
              "magCode": "ECON"
            }
          ],
          // 生物技术
          bioList:[
            {
              "coverimg": "images/carousel/biol01.jpg",
              "title": "农业生物技术",
              "magCode": "BIOL"
            },
            {
              "coverimg": "images/carousel/biol02.jpg",
              "title": "生物能源技术",
              "magCode": "BIOL"
            },
            {
              "coverimg": "images/carousel/biol03.jpg",
              "title": "特色农业生物技术",
              "magCode": "BIOL"
            },
            {
              "coverimg": "images/carousel/biol04.jpg",
              "title": "基因组育种",
              "magCode": "BIOL"
            },
            {
              "coverimg": "images/carousel/biol05.jpg",
              "title": "食品生物技术",
              "magCode": "BIOL"
            }
          ],
          // 计算机
          comList:[
            {
              "coverimg": "images/carousel/comp01.jpg",
              "title": "计算语言学",
              "magCode": "COMP"
            },
            {
              "coverimg": "images/carousel/comp02.jpg",
              "title": "机器学习",
              "magCode": "COMP"
            },
            {
              "coverimg": "images/carousel/comp03.jpg",
              "title": "云计算",
              "magCode": "COMP"
            },
            {
              "coverimg": "images/carousel/comp04.jpg",
              "title": "互联网创新应用",
              "magCode": "COMP"
            },
            {
              "coverimg": "images/carousel/comp05.jpg",
              "title": "移动计算",
              "magCode": "COMP"
            }
          ]
        }
      }
    ]);
})(angular);
