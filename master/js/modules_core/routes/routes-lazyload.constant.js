(function() {
    'use strict';

    angular
        .module('app.routes')
        .constant('APP_REQUIRES', {
            scripts: {
                // 图标
                'icons': ['//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.css'
                ],
                'weather-icons': ['//cdn.bootcss.com/weather-icons/2.0.10/css/weather-icons.min.css',
                    '//cdn.bootcss.com/weather-icons/2.0.10/css/weather-icons-wind.min.css'
                ],
                // 图表
                'flot-chart': ['//cdn.bootcss.com/flot/0.8.3/jquery.flot.min.js'],
                'flot-chart-plugins': ['//cdn.bootcss.com/flot.tooltip/0.8.7/jquery.flot.tooltip.min.js',
                    '//cdn.bootcss.com/flot/0.8.3/jquery.flot.resize.min.js',
                    '//cdn.bootcss.com/flot/0.8.3/jquery.flot.pie.min.js',
                    '//cdn.bootcss.com/flot/0.8.3/jquery.flot.time.min.js',
                    '//cdn.bootcss.com/flot/0.8.3/jquery.flot.categories.min.js'
                ],
                //表单控件
                'filestyle': ['//cdn.bootcss.com/bootstrap-filestyle/1.2.1/bootstrap-filestyle.min.js'],
                'inputmask': ['//cdn.bootcss.com/jquery.inputmask/3.3.1/jquery.inputmask.bundle.min.js'],
                'taginput': ['//cdn.bootcss.com/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css',
                    '//cdn.bootcss.com/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.min.js'
                ],
                //动画
                'animo': ['//cdn.bootcss.com/animo.js/1.0.3/animo.min.js'],
                'animate': ['//cdn.bootcss.com/animate.css/3.5.1/animate.min.css'],
                //等待样式
                //'whirl': ['vendor/whirl/dist/whirl.css'],
                'loaders.css': ['//cdn.bootcss.com/loaders.css/0.1.2/loaders.min.css'],
                //全屏
                'screenfull': ['//cdn.bootcss.com/screenfull.js/3.0.0/screenfull.min.js'],
                //辅助类
                'fastclick': ['//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js'],
                'modernizr': ['//cdn.bootcss.com/modernizr/2.8.3/modernizr.min.js'],
                //虚拟滚动条
                'slimscroll': ['//cdn.bootcss.com/jQuery-slimScroll/1.3.7/jquery.slimscroll.min.js'],

                'hSweetAlert': ['//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.css',
                    '//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js'
                ]
            },
            modules: [{
                //md5加密
                name: 'angular-md5',
                files: ['//cdn.bootcss.com/angular-md5/0.1.10/angular-md5.min.js']
            }, {
                // UISelect
                name: 'ui.select',
                files: ['//cdn.bootcss.com/angular-ui-select/0.17.1/select.min.js',
                    '//cdn.bootcss.com/angular-ui-select/0.17.1/select.min.css'
                ]
            }]
        });
})();
