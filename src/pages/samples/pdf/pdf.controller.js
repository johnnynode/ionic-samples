angular.module('ionic-samples')
    .controller('PdfCtrl', [
        '$scope',
        '$sce',
        'appUtils',
        'global',
        function($scope, $sce, appUtils, global) {
            var pdfUrl = 'https://mozilla.github.io/pdf.js/web/viewer.html';
            $scope.pdfSrc = $sce.trustAsResourceUrl(pdfUrl);
            $scope.back = appUtils.back;
        }
    ]);
