angular.module('ionic-samples')
    .config(function($stateProvider) {
        $stateProvider
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'pages/chatDetail/chatDetail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
    });
