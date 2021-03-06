(function() {
    'use strict';

    angular
        .module('app.routes')
        .run(routesRun);

    routesRun.$inject = ['$rootScope', '$localStorage', '$state', '$stateParams', '$templateCache', '$window', '$location', '$timeout', 'cfpLoadingBar'];

    function routesRun($rootScope, $localStorage, $state, $stateParams, $templateCache, $window, $location, $timeout, cfpLoadingBar) {
        var thBar;
        $rootScope.$on('$stateChangeStart', function(event, toState /*, toParams, fromState, fromParams*/ ) {
            if (toState.name !== 'page.browser') {
                if (navigator.userAgent.indexOf('MSIE') > 0) {
                    if ((navigator.userAgent.indexOf('MSIE 6.0') > 0) ||
                        (navigator.userAgent.indexOf('MSIE 7.0') > 0)) {
                        $state.go('page.browser');
                        event.preventDefault();
                    }
                }
            } else {
                if (navigator.userAgent.indexOf('MSIE') <= 0) {
                    $state.go('page.resume');
                    event.preventDefault();
                }
            }

            // if (typeof(toState) !== 'undefined') {
            //     $templateCache.remove(toState.templateUrl);
            // }

            /*解除以下注释可以使用登录验证*/
            var currentUser = $localStorage.currentUser;
            if (currentUser || toState.name === 'page.resume') {
                if ($('.wrapper > section').length) {
                    thBar = $timeout(function() {
                        cfpLoadingBar.start();
                    }, 0);
                }
            } else if (toState.name !== 'page.login') {
                $state.go('page.login');
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event) {
            $window.scrollTo(0, 0);
            $rootScope.currTitle = $state.current.title;

            event.targetScope.$watch('$viewContentLoaded', function() {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
            });
    }
})();
