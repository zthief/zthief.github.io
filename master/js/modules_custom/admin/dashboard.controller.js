(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [];

    function DashboardController() {
        var vm = this;

        activate();

        function activate() {

            vm.refresh = refresh;

            refresh();

            function refresh() {
                vm.uploadFilesCount = randomBy(2000, 10000);
                vm.emptySpace = randomBy(500, 2000);
                vm.usersCount = randomBy(100, 500);
                vm.complaints = randomBy(0, 100);

                vm.line = {
                    data: {
                        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                        datasets: [{
                            yAxisID: 'y-axis-hits',
                            label: '访问量',
                            data: [randomBy(100, 200), randomBy(100, 200), randomBy(100, 200), randomBy(100, 200), randomBy(100, 200), randomBy(100, 200)],
                            backgroundColor: 'rgba(114,102,186,0.2)',
                            borderColor: 'rgba(114,102,186,1)',
                            pointBackgroundColor: 'rgba(114,102,186,1)',
                            lineTension: 0,
                            pointRadius: 5
                        }, {
                            yAxisID: 'y-axis-comments',
                            label: '回复量',
                            data: [randomBy(100), randomBy(100), randomBy(100), randomBy(100), randomBy(100), randomBy(100)],
                            backgroundColor: 'rgba(35,183,229,0.2)',
                            borderColor: 'rgba(35,183,229,1)'
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                id: 'y-axis-hits'
                            }, {
                                id: 'y-axis-comments',
                                position: 'right'
                            }]
                        }
                    }
                };

                vm.radar = {
                    data: {
                        labels: ['动画', '漫画', '音乐', '游戏', '小说'],
                        datasets: [{
                            label: '10-20岁',
                            data: [randomBy(5), randomBy(5), randomBy(5), randomBy(5), randomBy(5)],
                            backgroundColor: 'rgba(114,102,186,0.2)',
                            borderColor: 'rgba(114,102,186,1)',
                        }, {
                            label: '20-30岁',
                            data: [randomBy(5), randomBy(5), randomBy(5), randomBy(5), randomBy(5)],
                            backgroundColor: 'rgba(35,183,229,0.2)',
                            borderColor: 'rgba(35,183,229,1)'
                        }]
                    },
                    options: {
                        scale:{
                            ticks: {
                                min: 0,
                                max: 5
                            }
                        }
                    }
                };
            }

            function randomBy(under, over) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * under + 1);
                    case 2:
                        return parseInt(Math.random() * (over - under + 1) + under);
                    default:
                        return 0;
                }
            }
        }
    }
})();
