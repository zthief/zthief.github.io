(function(){
    'use strict';

    angular
        .module('app.page')
        .controller('ResumeController', ResumeController);

    ResumeController.$inject = ['JsonService'];

    function ResumeController(JsonService){
        var vm = this;

        activate();

        function activate(){
            vm.data = {};

            JsonService
                .getJSON('config/resume.json')
                .success(function(data){
                    vm.data = data;
                });
        }
    }
})();
