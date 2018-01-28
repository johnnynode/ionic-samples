angular.module('ionic-samples')
    .config(function($stateProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'pages/tab/tab.html',
                controller: 'TabCtrl'
            })
    });
