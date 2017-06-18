(function (angular) {
  // 配置模块，控制不同平台的兼容性
  angular.module('config', [])
    .config(function ($ionicConfigProvider) {
      $ionicConfigProvider.platform.android.tabs.position("bottom");
      $ionicConfigProvider.platform.ios.tabs.position("bottom");

      //$ionicConfigProvider.platform.ios.tabs.style('standard');
      //$ionicConfigProvider.platform.ios.tabs.position('bottom');
      //$ionicConfigProvider.platform.android.tabs.style('standard');
      //$ionicConfigProvider.platform.android.tabs.position('bottom');
      //
      //$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      //$ionicConfigProvider.platform.android.navBar.alignTitle('center');
      //
      //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      //$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
      //
      //$ionicConfigProvider.platform.ios.views.transition('ios');
      //$ionicConfigProvider.platform.android.views.transition('android');
    })
})(angular);
