angular.module('studying-node',['ui.router','restangular','satellizer'])

    // Restangular confidurantion
    .config(function(RestangularProvider, $httpProvider, $locationProvider) {

        $httpProvider.interceptors.push('httpErrorResponseInterceptor');
        RestangularProvider.setBaseUrl('http://localhost:3000/');
        RestangularProvider.setFullResponse(true);

        //  RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin' : '*'});
    })

    // run to initial state
    .run(function ($state) {
        $state.transitionTo('index');
    })

    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

            var authorizedResouces = [
                'index',
                'index.login',
                'index.signup',
                'index.teste'
            ];

            if (!AuthService.isAuthenticated()) {
                if (authorizedResouces.indexOf(next.name) < 0) {
                    event.preventDefault();
                    $state.go('index.login');
                }
            }
        });
    })

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        isAuthenticated: 'is-authenticated'
    })

;