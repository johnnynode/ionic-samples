angular.module('samples.carousel.route', ['samples.carousel.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('carousel', {
                url: '/samples/carousel',
                templateUrl: 'pages/samples/carousel/carousel.html',
                controller: 'MarouselCtrl'
            })
    });
