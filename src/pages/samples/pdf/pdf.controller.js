angular.module('ionic-samples')
    .controller('PdfCtrl', [
        '$scope',
        '$sce',
        'appUtils',
        function($scope, $sce, appUtils) {
            $scope.pdfSrc = $sce.trustAsResourceUrl('https://mozilla.github.io/pdf.js/web/viewer.html');
            $scope.back = appUtils.back;
        }
    ]);
