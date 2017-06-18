angular.module('chatDetail.route', ['chatDetail.controller'])
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
