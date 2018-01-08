angular.module('account.route', ['account.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'pages/account/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });
    });
