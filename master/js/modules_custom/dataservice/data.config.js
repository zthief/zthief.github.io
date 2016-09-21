
(function () {
    'use strict';

    angular
        .module('app.dataservice')
        .factory('DataServiceInterceptor', DataServiceInterceptor)
        .config(dataServiceInterceptorConfig);

    DataServiceInterceptor.$inject = ['$q', '$localStorage', '$injector'];

    function DataServiceInterceptor($q, $localStorage, $injector) {
        var interceptor = {
            request: function (request) {
                request.url = encodeURI(request.url);
                return request;
            },

            response: function (response) {
                return response;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            responseError: function (rejection) {
                var MessageService = $injector.get('MessageService');
                var $state = $injector.get('$state');
                switch (rejection.status) {
                    case -1:
                        MessageService.showError('服务端连接失败!');
                        break;
                    case 400:
                        MessageService.showError('请求信息有误!');
                        break;
                    case 401:
                        MessageService.showError('登录超时，请重新登录！', function () {
                            $state.go('page.login');
                        });
                        break;
                    case 403:
                        MessageService.showError('服务端禁止访问！');
                        break;
                    case 404:
                        MessageService.showError('请求的接口不存在！');
                        break;
                    case 405:
                        MessageService.showError('IIS不允许PUT,DELETE方法！');
                        break;
                    case 500:
                        if (rejection.data.exceptionType) {
                            MessageService.showError('服务端内部服务异常!\n请将以下信息截图以便进行反馈：\n' + rejection.data.exceptionMessage, function(){});
                            console.log(rejection.data);
                        }
                        break;
                    default:
                        console.log(rejection.data);
                }
                return $q.reject(rejection);
            }
        };

        return interceptor;
    }

    dataServiceInterceptorConfig.$inject = ['$httpProvider'];

    function dataServiceInterceptorConfig($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push('DataServiceInterceptor');
    }
})();
