angular.module('chatDetail.controller', [])
    .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }]);
