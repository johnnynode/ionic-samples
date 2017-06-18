(function(angular) {
    // 配置模块，控制不同平台的兼容性
    angular.module('config', [])
        .config(function($urlRouterProvider, $httpProvider, $ionicConfigProvider) {
            $urlRouterProvider.otherwise('/tab/dash'); // 默认路由
            // $httpProvider.interceptors.push('authInterceptor'); // 设置拦截器
            ionic.Platform.isFullScreen = false; // 禁止全屏显示

            $ionicConfigProvider.views.maxCache(15);
            $ionicConfigProvider.views.transition('platform');
            $ionicConfigProvider.views.forwardCache(true); // 缓存下一页
            $ionicConfigProvider.views.swipeBackEnabled(ionic.Platform.isIOS());
            $ionicConfigProvider.spinner.icon('ios');

            // 通用样式的兼容
            $ionicConfigProvider.platform.android.tabs.position("bottom");
            $ionicConfigProvider.platform.ios.tabs.position("bottom");
            $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');
            $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
            $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');
            $ionicConfigProvider.tabs.style('standard');
            // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
            $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid());
        })
})(angular);
