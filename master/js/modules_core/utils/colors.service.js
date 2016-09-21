(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];

    function Colors(APP_COLORS) {
        this.byName = byName;

        function byName(name) {
            return (APP_COLORS[name] || '#fff');
        }
    }

})();
