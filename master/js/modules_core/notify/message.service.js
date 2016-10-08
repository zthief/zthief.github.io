(function() {
    'use strict';

    angular
        .module('app.notify')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['Sweet', 'Notify'];

    function MessageService(Sweet, Notify) {
        var service = {
            showSuccess: showSuccess,
            showInfo: showInfo,
            showWarning: showWarning,
            showError: showError,
            showConfirm: showConfirm
        };

        return service;

        function showSuccess(msg, callback) {
            if (callback) {
                Sweet.show({
                    title: '成功',
                    text: msg,
                    type: 'success',
                    confirmButtonText: '确定'
                }, callback);
            } else {
                Notify.alert(msg, {
                    status: 'success',
                    pos: 'top-center'
                });
            }
        }

        function showInfo(msg, callback) {
            if (callback) {
                Sweet.show({
                    title: '提示',
                    text: msg,
                    type: 'info',
                    confirmButtonText: '确定'
                }, callback);
            } else {
                Notify.alert(msg, {
                    status: 'info',
                    pos: 'top-center'
                });
            }
        }

        function showWarning(msg, callback) {
            if (callback) {
                Sweet.show({
                    title: '警告',
                    text: msg,
                    type: 'warning',
                    confirmButtonText: '确定'
                }, callback);
            } else {
                Notify.alert(msg, {
                    status: 'warning',
                    pos: 'top-center'
                });
            }
        }

        function showError(msg, callback) {
            if (callback) {
                Sweet.show({
                    title: '错误',
                    text: msg,
                    type: 'error',
                    confirmButtonText: '确定'
                }, callback);
            } else {
                Notify.alert(msg, {
                    status: 'error',
                    pos: 'top-center'
                });
            }
        }

        function showConfirm(msg, callback) {
            Sweet.show({
                title: '请确认',
                text: msg,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }, callback);
        }
    }
})();
