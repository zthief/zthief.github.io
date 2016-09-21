(function() {
    'use strict';

    angular
        .module('app.config')
        .service('ConfigLoader', ConfigLoader);

    ConfigLoader.$inject = ['$http'];

    function ConfigLoader($http) {
        this.getConfig = getConfig;

        function getConfig(onReady, onError) {
            var configJson = 'config/config.json',
                configURL = configJson + '?v=' + (new Date().getTime());

            onError = onError || function() {
                alert('配置文件加载失败！' +
                    '\n请检查' + configJson + '文件是否存在。' +
                    '\n请检查服务端是否支持json的MIME文件类型。');
            };

            $http
                .get(configURL)
                .success(onReady)
                .error(onError);
        }
    }
})();
