(function() {
    'use strict';

    angular
        .module('app.dataservice')
        .factory('WeatherService', WeatherService);

    WeatherService.$injector = ['$rootScope', '$http'];

    function WeatherService($rootScope, $http) {

        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather() {
            var appkey = $rootScope.APP_CONFIG.weatherAppKey; //d59e054cbbe55560cbd021b8cd5907b7
            var city = $rootScope.APP_CONFIG.city; //Guangzhou, CN
            return $http.jsonp('//api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK', {
                params: {
                    q: city,
                    units: 'metric',
                    lang: 'zh_cn',
                    APPID: appkey
                }
            });
        }
    }
})();
