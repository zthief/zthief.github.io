(function(){
    'use strict';

    angular
        .module('app.dataservice')
        .factory('WeatherService', WeatherService);

    WeatherService.$injector = ['$rootScope', '$http'];

    function WeatherService($rootScope, $http){

        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather(){
            var appkey = $rootScope.APP_CONFIG.weatherAppKey;
            var city =  $rootScope.APP_CONFIG.city;
            return $http.jsonp('http://v.juhe.cn/weather/index?callback=JSON_CALLBACK', {params: {
                cityname: city,
                key: appkey
            }});
        }
    }
})();
