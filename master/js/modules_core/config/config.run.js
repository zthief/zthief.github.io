(function() {
    'use strict';

    angular
        .module('app.config')
        .run(configRun);

    configRun.$inject = ['$rootScope', 'ConfigLoader'];

    function configRun($rootScope, ConfigLoader) {
        ConfigLoader.getConfig(configReady);

        function configReady(config) {
            $rootScope.APP_CONFIG = config;
        }
    }


})();
