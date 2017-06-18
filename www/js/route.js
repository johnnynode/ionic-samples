angular.module('route', [
        'tab.route',
        'dash.route',
        'chats.route',
        'chatDetail.route',
        'account.route',
        'simples.pdf.route'
    ])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/tab/dash');
    });
