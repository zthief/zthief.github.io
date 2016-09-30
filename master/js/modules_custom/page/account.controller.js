(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['JsonService','MessageService','$state', '$localStorage', 'md5'];

    function AccountController(JsonService,MessageService, $state, $localStorage, md5) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.login = login;

            vm.logout = logout;

            function login() {
                vm.authMsg = '';

                if (vm.loginForm.$valid) {
                    JsonService
                        .getJSON('config/account.json')
                        .success(function(data) {
                            var loginAccount = data;
                            if (loginAccount.username !== vm.account.username) {
                                vm.authMsg = '用户名错误';
                                return;
                            }
                            if (loginAccount.password !== md5.createHash(vm.account.password)) {
                                vm.authMsg = '密码错误';
                                return;
                            } else {
                                $localStorage.currentUser = loginAccount;
                                $state.go('admin.dashboard');
                            }
                        })
                        .error(function(err){
                            vm.authMsg = err;
                        });
                } else {
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            }

            function logout(){
                MessageService.showConfirm('确认退出？', function(isConfirm){
                    if(isConfirm){
                        $localStorage.currentUser = null;
                        $state.go('page.login');
                    }
                });
            }
        }
    }
})();
