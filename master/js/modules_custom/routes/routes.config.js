
(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(lazyloadConfig)
        .config(routesConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];

    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });
    }

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.when('','/page/resume');
        $urlRouterProvider.otherwise('/page/resume');
        $stateProvider
            .state('page', {
                url: '/page',
                abstract: true,
                templateUrl: helper.basepath('singlepage.html'),
                resolve: helper.resolveFor('icons', 'animo', 'animate'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.horizontal = true;
                }]
            })
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: helper.basepath('frontend.html'),
                resolve: helper.resolveFor('modernizr', 'fastclick', 'icons', 'animo', 'animate','hSweetAlert', 'screenfull'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.horizontal = true;
                    $rootScope.app.layout.isCollapsed = false;
                }]
            })
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: helper.basepath('backend.html'),
                resolve: helper.resolveFor('modernizr', 'fastclick', 'icons', 'animo', 'animate','hSweetAlert', 'screenfull'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.horizontal = false;
                    $rootScope.app.layout.isCollapsed = false;
                }]
            })
            .state('page.notfound', {
                url: '/notfound',
                templateUrl: helper.basepath('singlepage/404.html')
            })
            // .state('home.welcome', {
            //     url: '/welcome',
            //     templateUrl: helper.basepath('frontend/welcome.html'),
            //     controller: 'WelcomeController',
            //     controllerAs: 'welcome',
            //     resolve: helper.resolveFor('weather-icons')
            // })
            // .state('admin.dashboard', {
            //     url: '/dashboard',
            //     templateUrl: helper.basepath('frontend/welcome.html'),
            //     controller: 'WelcomeController',
            //     controllerAs: 'welcome',
            //     resolve: helper.resolveFor('weather-icons')
            // })
            .state('page.resume', {
                url: '/resume',
                templateUrl: helper.basepath('singlepage/resume.html'),
                controller: 'ResumeController',
                controllerAs: 'resume'
            })
            .state('page.browser', {
                url: '/browser',
                templateUrl: helper.basepath('singlepage/browser.html')
            });
    }
})();
