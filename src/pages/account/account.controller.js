angular.module('account.controller', [])
    .controller('AccountCtrl', ['$scope', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }]);
