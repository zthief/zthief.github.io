(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreRun);

    coreRun.$inject = ['$rootScope', '$localStorage', '$state', '$stateParams', '$location', '$anchorScroll', 'Colors', 'AnchorSmoothScroll'];

    function coreRun($rootScope, $localStorage, $state, $stateParams, $location, $anchorScroll, Colors, AnchorSmoothScroll) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$localStorage = $localStorage;

        $rootScope.ScrollToAnchor = function(id) {
            $location.hash(id);
            //$anchorScroll.yOffset = 84;
            //$anchorScroll();
            AnchorSmoothScroll.scrollTo(id, 84);
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
