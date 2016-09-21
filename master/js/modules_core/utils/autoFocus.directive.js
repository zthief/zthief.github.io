(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('autoFocus', autoFocus);

    autoFocus.$inject = ['$timeout'];
    function autoFocus($timeout) {
        var directive = {
          restrict: 'A',
          scope: {
              autoFocus: '='
          },
          link: link
      };

        return directive;

        function link(scope, element) {
          scope.$watch('autoFocus', function(newValue) {
              if (newValue) {
                  $timeout(function(){
                      element[0].focus();
                  }, 100);
              }
          });

          element.on('blur', function() {
              scope.$apply(function() {
                  scope.autoFocus = false;
              });
          });
        }
    }

})();
