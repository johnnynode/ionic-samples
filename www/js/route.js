angular.module('route',[
  'tab.route',
  'dash.route',
  'chats.route',
  'chatDetail.route',
  'account.route'
])
  .config(function($urlRouterProvider) {
    /* route fallback */
    $urlRouterProvider.otherwise('/tab/dash');
  });
