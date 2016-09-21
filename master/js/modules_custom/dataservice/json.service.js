(function(){
    'use strict';

    angular
        .module('app.dataservice')
        .factory('JsonService', JsonService);

    JsonService.$injector = ['$http'];

    function JsonService($http){

        var service = {
            getJSON: getJSON
        };

        return service;

        function getJSON(path){
            return $http.get(path);
        }
    }
})();
