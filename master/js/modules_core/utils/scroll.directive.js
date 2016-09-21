(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('scrollable', scrollable);

    function scrollable () {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var defaultHeight = 250;
          element.slimScroll({
              height: (attrs.height || defaultHeight)
          });
        }
    }

})();
