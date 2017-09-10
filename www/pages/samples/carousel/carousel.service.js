(function (angular) {
  // 提供数据支持
  angular.module('carouselDataSupport', [])
    .factory('CarouselData', [
      function () {
        return {
          // 最新杂志
          latest: [
            {
              "publishTime": 20170901,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/lite/12/WhJatSjE.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/lite/12/Apz_nZat.jpg",
              "title": "民间文学",
              "isShow": 1,
              "magCode": "LITE",
              "id": 587,
              "vol": 12,
              "isPub": 1
            },
            {
              "publishTime": 20170901,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/coar/7/nhlo0lJe.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/coar/7/VWpr2nQn.jpg",
              "title": "视觉传播",
              "isShow": 1,
              "magCode": "COAR",
              "id": 574,
              "vol": 7,
              "isPub": 1
            },
            {
              "publishTime": 20170901,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comm/26/WKMkPaOa.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comm/26/c8AVb33l.jpg",
              "title": "光量子器件及通信",
              "isShow": 1,
              "magCode": "COMM",
              "id": 582,
              "vol": 26,
              "isPub": 1
            },
            {
              "publishTime": 20170901,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/food/35/FXSWoCWC.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/food/35/1bjHZLeN.jpg",
              "title": "营养管理",
              "isShow": 1,
              "magCode": "FOOD",
              "id": 586,
              "vol": 35,
              "isPub": 1
            },
            {
              "publishTime": 20170901,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/mate/29/Eb7C-_2l.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/mate/29/PrsAPFyy.jpg",
              "cbTime": 1432791231000,
              "title": "晶体材料",
              "isShow": 1,
              "magCode": "MATE",
              "id": 408,
              "vol": 29,
              "isPub": 1
            }
          ],
          // 杂志列表
          magList: [
            {
              "magName": "经济学电子杂志",
              "isShow": 1,
              "magCode": "ECON",
              "sn": 0,
              "id": 9
            },
            {
              "magName": "生物技术电子杂志",
              "isShow": 1,
              "magCode": "BIOL",
              "sn": 1,
              "id": 19
            },
            {
              "magName": "计算机科技电子杂志",
              "isShow": 1,
              "magCode": "COMP",
              "sn": 2,
              "id": 18
            }
          ],
          // 经济学杂志
          ecoList:[
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/1/econ_1_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/1/econ_1_banner.jpg",
              "cbTime": 1320455644000,
              "title": "经济增长",
              "isShow": 1,
              "magCode": "ECON",
              "id": 49,
              "vol": 1,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/2/econ_2_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/2/econ_2_banner.jpg",
              "cbTime": 1320455683000,
              "title": "绿色经济",
              "isShow": 1,
              "magCode": "ECON",
              "id": 50,
              "vol": 2,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/3/econ_3_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/3/econ_3_banner.jpg",
              "cbTime": 1356317053000,
              "title": "网络经济",
              "isShow": 1,
              "magCode": "ECON",
              "id": 51,
              "vol": 3,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/4/econ_4_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/4/econ_4_banner.jpg",
              "cbTime": 1356317055000,
              "title": "蓝海战略",
              "isShow": 1,
              "magCode": "ECON",
              "id": 52,
              "vol": 4,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/5/econ_5_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/econ/5/econ_5_banner.jpg",
              "cbTime": 1375409087000,
              "title": "电子商务市场",
              "isShow": 1,
              "magCode": "ECON",
              "id": 164,
              "vol": 5,
              "isPub": 1
            }
          ],
          // 生物技术
          bioList:[
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/1/biol_1_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/1/biol_1_banner.jpg",
              "cbTime": 1306129559000,
              "title": "农业生物技术",
              "isShow": 1,
              "magCode": "BIOL",
              "id": 5,
              "vol": 1,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/2/biol_2_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/2/biol_2_banner.jpg",
              "cbTime": 1306132074000,
              "title": "生物能源技术",
              "isShow": 1,
              "magCode": "BIOL",
              "id": 6,
              "vol": 2,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/3/biol_3_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/3/biol_3_banner.jpg",
              "cbTime": 1321930471000,
              "title": "特色农业生物技术",
              "isShow": 1,
              "magCode": "BIOL",
              "id": 89,
              "vol": 3,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/4/biol_4_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/4/biol_4_banner.jpg",
              "cbTime": 1323063175000,
              "title": "基因组育种",
              "isShow": 1,
              "magCode": "BIOL",
              "id": 90,
              "vol": 4,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/5/biol_5_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/biol/5/biol_5_banner.jpg",
              "cbTime": 1306132096000,
              "title": "食品生物技术",
              "isShow": 1,
              "magCode": "BIOL",
              "id": 7,
              "vol": 5,
              "isPub": 1
            }
          ],
          // 计算机
          comList:[
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/1/comp_1_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/1/comp_1_banner.jpg",
              "cbTime": 1306733022000,
              "title": "计算语言学",
              "isShow": 1,
              "magCode": "COMP",
              "id": 9,
              "vol": 1,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/2/comp_2_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/2/comp_2_banner.jpg",
              "cbTime": 1306825158000,
              "title": "机器学习",
              "isShow": 1,
              "magCode": "COMP",
              "id": 10,
              "vol": 2,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/3/comp_3_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/3/comp_3_banner.jpg",
              "cbTime": 1306825165000,
              "title": "云计算",
              "isShow": 1,
              "magCode": "COMP",
              "id": 11,
              "vol": 3,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/4/comp_4_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/4/comp_4_banner.jpg",
              "cbTime": 1306825173000,
              "title": "互联网创新应用",
              "isShow": 1,
              "magCode": "COMP",
              "id": 12,
              "vol": 4,
              "isPub": 1
            },
            {
              "publishTime": 20000101,
              "coverimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/5/comp_5_cover.jpg",
              "bannerimg": "http://gdfiles.oss-cn-beijing.aliyuncs.com/cloud/emag/img/comp/5/comp_5_banner.jpg",
              "cbTime": 1316076278000,
              "title": "移动计算",
              "isShow": 1,
              "magCode": "COMP",
              "id": 22,
              "vol": 5,
              "isPub": 1
            }
          ]
        }
      }
    ]);
})(angular);
