angular.module('ionic-samples')
    .config(function($stateProvider) {
        $stateProvider
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'pages/dash/dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
    });
