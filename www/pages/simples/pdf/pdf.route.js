angular.module('simples.pdf.route', ['simples.pdf.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('pdf', {
                url: '/simples/pdf',
                templateUrl: 'pages/simples/pdf/pdf.html',
                controller: 'PdfCtrl'
            })
    });
