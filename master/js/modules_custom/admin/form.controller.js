(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$filter', 'JsonService', 'MessageService'];

    function FormController($scope, $filter, JsonService, MessageService) {
        var vm = this;

        activate();

        function activate() {
            vm.user = {};
            vm.image = '';

            vm.init = init;
            vm.submitForm = submitForm;
            vm.getProvinceList = getProvinceList;
            vm.getCityList = getCityList;
            vm.getDistrictList = getDistrictList;

            getProvinceList();
            init();

            function getProvinceList() {
                JsonService
                    .getJSON('config/provinces.json')
                    .success(function(data) {
                        vm.provinceList = data;
                    });
            }

            function getCityList() {
                vm.user.cityID = '';
                vm.user.districtID = '';
                JsonService
                    .getJSON('config/citys.json')
                    .success(function(data) {
                        vm.cityList = $filter('filter')(data, {ProID: vm.user.proID}, true);
                    });
            }

            function getDistrictList() {
                vm.user.districtID = '';
                JsonService
                    .getJSON('config/districts.json')
                    .success(function(data) {
                        vm.districtList = $filter('filter')(data, {CityID: vm.user.cityID}, true);
                    });
            }

            function init() {
                vm.user = {
                    name: '',
                    password: '',
                    email: '',
                    salary: 0,
                    sex: 'male',
                    status: 'enabled',
                    proID: '',
                    cityID: '',
                    districtID: ''
                };

                if (vm.form) {
                    vm.form.$setPristine();
                }
            }

            function submitForm() {
                MessageService.showSuccess('提交成功!');
            }
        }
    }
})();
