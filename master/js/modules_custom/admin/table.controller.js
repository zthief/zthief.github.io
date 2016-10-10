(function() {
    'use strict';

    angular
        .module('app.admin')
        .filter('sexFilter', sexFilter)
        .filter('provinceFilter', provinceFilter)
        .filter('cityFilter', cityFilter)
        .filter('districtFilter', districtFilter)
        .filter('favorFilter', favorFilter)
        .controller('TableController', TableController);

    function sexFilter() {
        return function(value) {
            switch (value) {
                case 'male':
                    return '男';
                case 'female':
                    return '女';
                default:
                    return '未知';
            }
        };
    }

    provinceFilter.$inject = ['$filter'];

    function provinceFilter($filter) {
        return function(proId, proDict) {
            if (!proDict) return '';
            var provinces = $filter('filter')(proDict, {
                ProID: proId
            }, true);
            if (provinces.length === 1) {
                return provinces[0].name;
            } else {
                return '';
            }
        };
    }

    cityFilter.$inject = ['$filter'];

    function cityFilter($filter) {
        return function(cityId, cityDict) {
            if (!cityDict) return '';
            var citys = $filter('filter')(cityDict, {
                CityID: cityId
            }, true);
            if (citys.length === 1) {
                return citys[0].name;
            } else {
                return '';
            }
        };
    }

    districtFilter.$inject = ['$filter'];

    function districtFilter($filter) {
        return function(districtId, districtDict) {
            if (!districtDict) return '';
            var districts = $filter('filter')(districtDict, {
                Id: districtId
            }, true);
            if (districts.length === 1) {
                return districts[0].DisName;
            } else {
                return '';
            }
        };
    }

    favorFilter.$inject = ['$filter'];

    function favorFilter($filter) {
        return function(favorId, favorDict) {
            if (!favorDict) return '';
            var favors = $filter('filter')(favorDict, {
                Id: favorId
            }, true);
            if (favors.length === 1) {
                return favors[0].favName;
            } else {
                return '';
            }
        };
    }

    TableController.$inject = ['JsonService', 'MessageService'];

    function TableController(JsonService, MessageService) {
        var vm = this;

        activate();

        function activate() {

            vm.getUserList = getUserList;
            vm.search = search;

            vm.pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                maxNumbers: 5,
                perPageOptions: [10, 15, 20],
                itemsCount: 10000,
                onChange: function(pageIndex) {
                    MessageService.showInfo('翻到了第' + pageIndex + '页');
                }
            };

            initDict();
            search();

            function search() {
                getUserList();
            }

            function getUserList() {
                JsonService
                    .getJSON('config/users.json')
                    .success(function(data) {
                        vm.userList = data;
                    });

            }

            function initDict() {
                getProvinceList();
                getCityList();
                getDistrictList();
                getFavorList();
            }

            function getProvinceList() {
                JsonService
                    .getJSON('config/provinces.json')
                    .success(function(data) {
                        vm.provinceDict = data;
                    });
            }

            function getCityList() {
                JsonService
                    .getJSON('config/citys.json')
                    .success(function(data) {
                        vm.cityDict = data;
                    });
            }

            function getDistrictList() {
                JsonService
                    .getJSON('config/districts.json')
                    .success(function(data) {
                        vm.districtDict = data;
                    });
            }

            function getFavorList() {
                JsonService
                    .getJSON('config/favors.json')
                    .success(function(data) {
                        vm.favorDict = data;
                    });
            }
        }
    }
})();
