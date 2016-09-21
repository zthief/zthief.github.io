(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('uiPagination', uiPagination);

    function uiPagination() {
        var directive = {
            restrict: 'EA',
            template: '<div class="page-list"><ul class="pagination" ng-show="pageConf.itemsCount > 0"><li ng-class="{disabled: pageConf.isFirst(pageConf.currentPage)}" ng-click="pageConf.setCurrent(pageConf.startPage)"><a href>首页</a></li><li ng-class="{disabled: !pageConf.inRange(pageConf.currentPage - 1)}" ng-click="pageConf.setCurrent(pageConf.currentPage - 1)"><a>上一页</a></li><li ng-show="pageConf.inRange(pageConf.pages[0] - 1)" ng-click="pageConf.setCurrent(pageConf.currentPage - pageConf.maxNumbers)"><a>&hellip;</a></li><li ng-repeat="page in pageConf.pages track by $index" ng-class="{active: pageConf.isCurrent(page)}" ng-click="pageConf.setCurrent(page)"><a>{{page}}</a></li><li ng-show="pageConf.inRange(pageConf.pages[pageConf.pages.length - 1] + 1)" ng-click="pageConf.setCurrent(pageConf.currentPage + pageConf.maxNumbers)"><a>&hellip;</a></li><li ng-class="{disabled: !pageConf.inRange(pageConf.currentPage + 1)}" ng-click="pageConf.setCurrent(pageConf.currentPage + 1)"><a>下一页</a></li><li ng-class="{disabled: pageConf.isLast(pageConf.currentPage)}" ng-click="pageConf.setCurrent(pageConf.endPage)"><a>尾页</a></li></ul><div class="page-total" ng-show="pageConf.itemsCount > 0">第<input type="text" ng-model="pageConf.currentPage" ng-keyup="pageConf.setCurrent(pageConf.currentPage)">页 每页<select ng-model="pageConf.itemsPerPage" ng-options="option for option in pageConf.perPageOptions " ng-change="pageConf.setCurrent(pageConf.currentPage)"></select>/共<strong>{{ pageConf.itemsCount }}</strong>条</div><div class="no-items" ng-show="pageConf.itemsCount <= 0">暂无数据</div></div>',
            replace: true,
            scope: {
                pageConf: '=pageConf'
            },
            link: function (scope) {
                var conf = scope.pageConf;
                conf.startPage = 1;
                conf.isFirst = isFirst;
                conf.isLast = isLast;
                conf.isCurrent = isCurrent;
                conf.setCurrent = setCurrent;
                conf.inRange = inRange;

                function setCurrent(page) {
                    refreshPages();
                    conf.currentPage = fixPage(Math.floor(page));
                    refreshPages();
                    if (conf.onChange) {
                        conf.onChange(conf.currentPage);
                    }
                }

                function isCurrent(page) {
                    return conf.currentPage === page;
                }

                function inRange(page) {
                    return conf.startPage <= page && conf.endPage >= page;
                }

                function isFirst(page) {
                    return conf.startPage === page;
                }

                function isLast(page) {
                    return conf.endPage === page;
                }

                function fixPage(page) {
                    page = Math.min(page, conf.endPage);
                    page = Math.max(page, conf.startPage);
                    return page;
                }

                function refreshPages() {
                    if (conf.itemsCount > 0) {
                        conf.endPage = Math.ceil(conf.itemsCount / conf.itemsPerPage);

                        var delta = Math.floor(conf.maxNumbers / 2);
                        var start = Math.max(conf.currentPage - delta, conf.startPage);
                        var end = Math.min(start + conf.maxNumbers - 1, conf.endPage);


                        start = conf.endPage === end ? end - (conf.maxNumbers - 1) : start;
                        start = Math.max(start, conf.startPage);
                        conf.pages = [];

                        for (var i = start; i <= end; i++) {
                            conf.pages.push(i);
                        }
                    }
                }

                scope.$watch('pageConf', refreshPages, true);
            }
        };
        return directive;
    }
})();
