(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$injector = ['$uibModal', '$interval', 'WeatherService'];

    function WelcomeController($uibModal, $interval, WeatherService) {
        var vm = this;

        activate();

        function activate() {
            vm.weather = {};
            vm.refreshWeather = refreshWeather;

            refreshWeather();
            $interval(function() {
                refreshWeather();
            }, 3600000);

            function refreshWeather() {
                WeatherService
                    .getWeather()
                    .success(function(response) {
                        vm.weather = response;
                    });
            }

            vm.openWeixinCode = function() {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'mmqrcode.html',
                    size: 'sm'
                });
            };
        }
    }
})();
