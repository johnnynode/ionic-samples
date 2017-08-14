angular.module('category.route', ['category.controller', 'starter.services.category'])
    .config(function($stateProvider) {
        $stateProvider
            .state('tab.category', {
                url: '/category',
                views: {
                    'tab-category': {
                        templateUrl: 'pages/category/category.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })
    });
