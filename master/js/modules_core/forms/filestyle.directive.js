(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('filestyle', filestyle);

    function filestyle () {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              onSelect: '&',
              file: '='
            },
        };
        return directive;

        function link(scope, element) {
          var options = element.data();
          element.filestyle(options);
          element.bind('change', function (event) {
            scope.file = event.target.files[0];
            scope.onSelect({file: scope.file});
            scope.$apply();
          });
        }
    }

})();
