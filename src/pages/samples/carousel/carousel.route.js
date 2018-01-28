angular.module('ionic-samples')
    .config(function($stateProvider) {
        $stateProvider
            .state('carousel', {
                url: '/samples/carousel',
                templateUrl: 'pages/samples/carousel/carousel.html',
                controller: 'MarouselCtrl'
            })
    });
