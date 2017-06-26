angular.module('simples.video.route', ['simples.video.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('video', {
                url: '/simples/video',
                templateUrl: 'pages/simples/video/video.html',
                controller: 'VideoCtrl'
            })
    });
