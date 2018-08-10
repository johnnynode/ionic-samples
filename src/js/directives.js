/* 此处的指令是通用的指令 */
(function(angular) {
    'use strict';
    angular.module('ionic-samples')
        /* 自动获取焦点 */
        .directive('autoFocus', function($timeout, $cordovaKeyboard) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    $timeout(function() {
                        if (!window.cordova) return;
                        $cordovaKeyboard.show();
                        element[0].focus();
                    }, 600);
                }
            };
        })
        /* 通用iframe 加载进度条 */
        .directive('iframeLoad', function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    var ele = element[0];
                    var theFrame = element.next()[0];
                    ele.style.width = '90%'; // iframe 不提供进度接口, 解决方案: 执行一个动画,首先加载到90%
                    // 定义一个获取dom的方法并隐藏的方法
                    var hide = function(context, obj) {
                        if (Array.isArray(obj)) {
                            obj.forEach(function(item) {
                                context.contentWindow.document.getElementById(item).style.display = 'none'; // 隐藏按钮
                            });
                        } else {
                            context.contentWindow.document.getElementById(obj).style.display = 'none'; // 隐藏按钮
                        }
                    };
                    theFrame.addEventListener('load', function(e) {
                        if (!e) {
                            return ele.style.display = 'none';
                        }
                        // 进度条走完并且消失
                        ele.style.width = '100%';
                        $timeout(function() {
                            ele.style.display = 'none';
                            // 浏览器有跨域问题, 客户端正常
                            if (window.cordova) {
                                var arr = ['secondaryOpenFile', 'secondaryPrint', 'secondaryDownload', 'secondaryViewBookmark', 'toggleHandTool'];
                                hide(theFrame, arr);
                            }
                        }, 600);
                    }, false);
                }
            };
        })
})(angular);
