angular.module('samples.carousel.controller', [])
    .controller('MarouselCtrl', [
        '$scope',
        'appUtils',
        function($scope, appUtils) {
            $scope.back = appUtils.back;

        }
    ]);
