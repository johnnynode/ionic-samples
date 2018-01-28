angular.module('ionic-samples')
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
