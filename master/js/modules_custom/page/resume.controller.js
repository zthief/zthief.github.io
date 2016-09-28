(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('ResumeController', ResumeController);

    ResumeController.$inject = ['$uibModal', 'JsonService'];

    function ResumeController($uibModal, JsonService) {
        var vm = this;

        activate();

        function activate() {
            vm.data = {};

            vm.refreshResume = refreshResume;
            vm.openWeixinCode = openWeixinCode;
            vm.randomAnimate = randomAnimate;

            var animates = [
                'tada',
                'bounceInRight',
                // 'pulse',
                // 'rubberBand',
                'tada',
                // 'jello',
                // 'bounceInRight',
                'flip',
                'flipInY',
                'lightSpeedIn'
            ];


            refreshResume();

            function refreshResume() {
                JsonService
                    .getJSON('config/resume.json')
                    .success(function(data) {
                        vm.data = data;
                    });
            }

            function openWeixinCode() {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'mmqrcode.html',
                    size: 'sm'
                });
            }

            function randomAnimate(){
                var animate = animates[Math.ceil(Math.random()*(animates.length-1))];
                if(vm.animate!==animate){
                    vm.animate = animate;
                }else{
                    randomAnimate();
                }
            }

        }
    }
})();
