(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage) {

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'Seed',
            description: 'Seed',
            author: 'Zthief',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: 'app/css/theme-a.css'
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        // Restore layout settings
        if (angular.isDefined($localStorage.layout))
            $rootScope.app.layout = $localStorage.layout;
        else
            $localStorage.layout = $rootScope.app.layout;

        $rootScope.$watch('app.layout', function() {
            $localStorage.layout = $rootScope.app.layout;
        }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            if (newValue === false)
                $rootScope.$broadcast('closeSidebarMenu');
        });
    }
})();
