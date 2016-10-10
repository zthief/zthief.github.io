
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

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider', 'VERSION_STAMP'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper, VERSION_STAMP) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.when('', '/page/resume');
        $urlRouterProvider.otherwise('/page/notfound');
        helper.setVersionStamp(VERSION_STAMP.versionStamp);
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
                resolve: helper.resolveFor('modernizr', 'fastclick', 'icons', 'animo', 'animate', 'hSweetAlert', 'screenfull'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.horizontal = true;
                    $rootScope.app.layout.isCollapsed = false;
                }]
            })
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: helper.basepath('backend.html'),
                resolve: helper.resolveFor('modernizr', 'fastclick', 'icons', 'animo', 'animate', 'hSweetAlert', 'screenfull', 'angular-md5'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.horizontal = false;
                    $rootScope.app.layout.isCollapsed = false;
                }]
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: helper.basepath('backend/dashboard.html'),
                controller: 'DashboardController',
                controllerAs: 'dash',
                resolve: helper.resolveFor('slimscroll', 'weather-icons', 'chart.js')
            })
            .state('admin.form', {
                url: '/form',
                templateUrl: helper.basepath('backend/form.html'),
                controller: 'FormController',
                controllerAs: 'formDemo',
                resolve: helper.resolveFor('ui.select')
            })
            .state('admin.table', {
                url: '/table',
                templateUrl: helper.basepath('backend/table.html'),
                controller: 'TableController',
                controllerAs: 'table'
            })
            .state('page.resume', {
                url: '/resume',
                templateUrl: helper.basepath('singlepage/resume.html'),
                controller: 'ResumeController',
                controllerAs: 'resume'
            })
            .state('page.login', {
                url: '/login',
                templateUrl: helper.basepath('singlepage/login.html'),
                controller: 'AccountController',
                controllerAs: 'login',
                resolve: helper.resolveFor('angular-md5')
            })
            .state('page.notfound', {
                url: '/notfound',
                templateUrl: helper.basepath('singlepage/404.html')
            })
            .state('page.browser', {
                url: '/browser',
                templateUrl: helper.basepath('singlepage/browser.html')
            });
    }
})();
