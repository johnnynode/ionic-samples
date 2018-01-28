angular.module('ionic-samples')
    .controller('PdfCtrl', [
        '$scope',
        '$sce',
        'appUtils',
        'global',
        function($scope, $sce, appUtils, global) {
            var pdfUrl = global.apiUrl().pdf + '/pdf.js/web/viewer.html';
            console.log('pdfUrl');
            console.log(pdfUrl);
            $scope.pdfSrc = $sce.trustAsResourceUrl(pdfUrl);
            $scope.back = appUtils.back;
        }
    ]);
