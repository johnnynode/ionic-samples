angular.module('ionic-samples')
    .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }]);
