(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreRun);

    coreRun.$inject = ['$rootScope', '$localStorage', '$state', '$stateParams', '$location', '$anchorScroll', 'Colors'];

    function coreRun($rootScope, $localStorage, $state, $stateParams, $location, $anchorScroll, Colors) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$localStorage = $localStorage;

        $rootScope.ScrollToAnchor = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

        $rootScope.currentUser = function() {
            return $localStorage.currentUser ? $localStorage.currentUser : null;
        };

        $rootScope.userBlockcollapse = true;
        $rootScope.toggleUserBlock = function() {
            $rootScope.userBlockcollapse = !$rootScope.userBlockcollapse;
        };

        $rootScope.colorByName = Colors.byName;
    }
})();
