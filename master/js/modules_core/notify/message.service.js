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
                    pos: 'bottom-right'
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
                    pos: 'bottom-right'
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
                    pos: 'bottom-right'
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
                    pos: 'bottom-right'
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
