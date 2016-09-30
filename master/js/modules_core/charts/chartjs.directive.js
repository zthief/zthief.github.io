(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('linechart', chartJS('line'))
        .directive('barchart', chartJS('bar'))
        .directive('radarchart', chartJS('radar'))
        .directive('polarchart', chartJS('polarArea'))
        .directive('piechart', chartJS('pie'))
        .directive('doughnutchart', chartJS('doughnut'))
        .directive('donutchart', chartJS('doughnut'));

    function chartJS(type) {
        return function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    options: '=',
                    width: '=',
                    height: '='
                },
                link: function($scope, $elem) {
                    var ctx = $elem[0].getContext('2d');

                    $scope.size = function() {
                        ctx.canvas.width = $elem.parent().width();
                        ctx.canvas.height = $elem.parent().height();
                        $scope.options = $scope.options || {};
                        $scope.options.responsive = true;
                        $scope.options.maintainAspectRatio = false;
                    };

                    $scope.$watch('data', function() {
                        if (chartCreated)
                            chartCreated.destroy();

                        $scope.size();
                        chartCreated = new Chart(ctx, {
                            type: type,
                            data: $scope.data,
                            options: $scope.options
                        });
                        chartCreated.update();
                    });

                    $scope.size();
                    var chartCreated;

                    $scope.$on('$destroy', function() {
                        if (chartCreated)
                            chartCreated.destroy();
                    });
                }
            };
        };
    }
})();
