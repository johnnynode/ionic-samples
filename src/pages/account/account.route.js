angular.module('ionic-samples')
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
