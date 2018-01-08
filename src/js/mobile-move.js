(function (window) {
  var MobileMove = function () {
  };
  MobileMove.prototype = {
    addTransition: function (obj, time) {
      obj.style.transition = "all " + time + "s ease";
      obj.style.webkitTransition = "all " + time + "s ease";
    },
    removeTransition: function (obj) {
      obj.style.transition = "none";
      obj.style.webkitTransition = "none";
    },
    changeTranslateX: function (obj, x) {
      obj.style.transform = "translateX(" + x + "px)";
      obj.style.webkitTransform = "translateX(" + x + "px)";
    },
    transitionEnd: function (obj, callback) {
      /*当是对象的时候绑定事件*/
      if (typeof obj === 'object') {
        obj.addEventListener('transitionEnd', function (e) {
          callback && callback(e);
        }, false);
        obj.addEventListener('webkitTransitionEnd', function (e) {
          callback && callback(e);
        }, false);
      }
    },
    /* 模仿的tap事件 */
    tap: function (obj, callback) {
      /* 点击事件 超过200ms */
      if (typeof  obj !== 'object') return false;
      var startTime = 0,
        isMove = false; // 来标记我们是否移动过
      obj.addEventListener('touchstart', function () {
        startTime = Date.now(); // 取当前时间
      }, false);
      obj.addEventListener('touchmove', function () {
        isMove = true;
      }, false);
      window.addEventListener('touchend', function (e) {
        /* 响应时间小于200ms 并且没有滑动过 */
        if (Date.now() - startTime < 200 && !isMove) {
          callback && callback.apply(obj, e);
        }
        startTime = 0;
        isMove = false;
      }, false);
    },
    /* 缩放动画 */
    scale: function (obj, rate) {
      if (!obj) return;
      obj.style.transform = "scale(" + rate + ")";
      obj.style.webkitTransform = "scale(" + rate + ")";
    },
    /* 缩放动画的还原 */
    scaleBack: function (obj,index) {
      var that = this;
      if (!obj) return;
      for(var i=0;i<obj.length;i++){
        if(i === index){
          that.scale(obj[index],1); // 当前缩放为1
          continue;
        }
        that.scale(obj[i],252/291); // 其他缩放回归默认值
      }
    },
    setSwipe: function (obj, obj_move, imgs, list) {
      if (typeof  obj !== 'object') return false;
      var that = this;
      var num = imgs.length; // 获取当前节点数
      var startX = 0; // 开始你的X的位置
      var endX = 0; // 停止滑动的时候的X的位置
      var distanceX = 0; // 是改变的距离
      var _distanceX = 0; // 算比率时用到
      var index = 0; // 滑动到第几张图片
      var super_width = obj.clientWidth; // 最大的盒子 ,相当于最外面的宽度 或者和 window.innerWidth 相同.
      var width = super_width * (291 / 375); // 图片每次移动的宽度 , 临界距离 291 是 img-wrap 所占宽度 (根据设计图来的比例)

      that.removeTransition(obj_move); // 初始去除过度
      that.changeTranslateX(obj_move, 0); // 初始化X距离

      // 针对事件的监听
      obj.addEventListener('touchstart', function (e) {
        e.preventDefault();
        startX = e.touches[0].clientX;
        if(index < imgs.length -2){
          imgs[index+2].querySelector('img').setAttribute('style', 'background-image:url(' + list[index+2].coverimg + ')');
        }
      }, false);

      obj.addEventListener('touchmove', function (e) {
        e.preventDefault();
        endX = e.touches[0].clientX;
        distanceX = startX - endX; // 获取移动距离

        // distanceX > 0 滑动方向 true => 左滑 无需考虑 0
        _distanceX = distanceX > 0 && distanceX > width ? width : distanceX; // 移动距离>宽度时 ? 移动距离=宽度
        _distanceX = !(distanceX > 0) && distanceX < -width ? -width : distanceX; // 移动距离<-宽度时 ? 移动距离=-宽度
        var rate = Math.abs(_distanceX / width); // 缩放比率

        if (!(distanceX > 0) && !index || distanceX > 0 && index === num - 1) {
          // DO NOTHING 此处做过滤
        } else {
          if (distanceX > 0) {
            // 左滑时缩放
            that.scale(imgs[index], 1 - (1 - 252 / 291) * rate); // 当前的缩小  252/291 或者 344/382 这个是缩放比
            that.scale(imgs[index + 1], (252 / 291 + (1 - 252 / 291) * rate) <1 ? (252 / 291 + (1 - 252 / 291) * rate) : 1); // 下一个放大
          } else {
            // 右滑时缩放
            that.scale(imgs[index], 1 - (1 - 252 / 291) * rate); // 当前的缩小
            that.scale(imgs[index - 1], 252 / 291 + (1 - 252 / 291) * rate); // 上一个放大
          }
        }
        that.removeTransition(obj_move); // 去除过渡
        that.changeTranslateX(obj_move, -index * width - distanceX); // 同步盒子移动
      }, false);
      obj.addEventListener('touchend', function (e) {
        e.preventDefault();
        // 移动结束还原缩放
        if (!(distanceX > 0) && !index || distanceX > 0 && index === num - 1) {
          that.scale(imgs[index], 1);
        }
        /* 满足1/3的时候滑动一次 */
        if (Math.abs(distanceX) > 1 / 3 * width && endX) {
          // 进行 index 加工过滤
          index = distanceX > 0 ? ++index : --index; // 根据方向判断中间值
          index = index <= 0 ? 0 : index;  // 判断第一个时
          index = index >= num - 1 ? num - 1 : index;  // 判断最后一个时
          that.addTransition(obj_move, 0.2); // 加上过渡效果
          that.changeTranslateX(obj_move, -index * width); // 滑动
        } else {
          // 当不满足1/3的时候吸附回去
          that.addTransition(obj_move, 0.2); // 加上过渡效果
          that.changeTranslateX(obj_move, -index * width);
        }
        that.scaleBack(imgs,index); // 恢复原始缩放比

        // 每次滑动结束 , 恢复初始值
        startX = 0;
        endX = 0;
        distanceX = 0;
      }, false);
    }
  };
  // 暴露对象
  window.MobileMove = MobileMove;
})(window);
