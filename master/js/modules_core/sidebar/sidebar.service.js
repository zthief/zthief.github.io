(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];

    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
            var menuJson = 'config/sidebar-menu.json',
                menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache

            onError = onError || function() {
                alert('菜单文件加载失败！' +
                    '\n请检查' + menuJson + '文件是否存在。' +
                    '\n请检查服务端是否支持json的MIME文件类型。');
            };

            $http
                .get(menuURL)
                .success(onReady)
                .error(onError);
        }
    }
})();
