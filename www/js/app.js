angular.module('ionic-samples', [
        'ionic',
        'route',
        'config',
        'utils',
        'directives',
        'ionic-native-transitions',
        'ngCordova',
        'ngCookies'
    ])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });
