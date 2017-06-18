angular.module('tab.route', ['tab.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'areas/tab/tab.html',
                controller: 'TabCtrl'
            })
    });
