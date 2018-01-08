angular.module('samples.mp3.route', ['samples.mp3.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('mp3', {
                url: '/samples/mp3',
                templateUrl: 'pages/samples/mp3/mp3.html',
                controller: 'Mp3Ctrl'
            })
    });
