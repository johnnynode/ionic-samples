angular.module('ionic-samples')
    .config(function($stateProvider) {
        $stateProvider
            .state('pdf', {
                url: '/samples/pdf',
                templateUrl: 'pages/samples/pdf/pdf.html',
                controller: 'PdfCtrl'
            })
    });
