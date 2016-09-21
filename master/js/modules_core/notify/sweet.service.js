(function() {
    'use strict';

    angular
        .module('app.notify')
        .factory('Sweet', Sweet);

    Sweet.$inject = ['$rootScope'];

    function Sweet($rootScope) {
        var swal = window.swal;
        var service = {
            show: show
        };
        return service;

        function show(config, callback) {
            $rootScope.$evalAsync(function() {
                if (typeof(callback) === 'function') {
                    swal(config, function(isConfirm) {
                        $rootScope.$evalAsync(function() {
                            callback(isConfirm);
                        });
                    });
                }
            });
        }
    }
})();
