angular.module('samples.pdf.route', ['samples.pdf.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('pdf', {
                url: '/samples/pdf',
                templateUrl: 'pages/samples/pdf/pdf.html',
                controller: 'PdfCtrl'
            })
    });
