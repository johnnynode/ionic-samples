angular.module('samples.video.route', ['samples.video.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('video', {
                url: '/samples/video',
                templateUrl: 'pages/samples/video/video.html',
                controller: 'VideoCtrl'
            })
    });
