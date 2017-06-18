angular.module('chats.route', ['chats.controller', 'starter.services.chats'])
    .config(function($stateProvider) {
        $stateProvider
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'pages/chats/chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
    });
