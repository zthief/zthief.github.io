(function() {
    'use strict';

    angular
        .module('app.routes')
        .constant('APP_REQUIRES', {
            scripts: {
                // 图标
                'icons': ['vendor/font-awesome/css/font-awesome.min.css'],
                'weather-icons': ['vendor/weather-icons/css/weather-icons.min.css'],
                // 图表
                'flot-chart': ['vendor/Flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/Flot/jquery.flot.resize.js',
                    'vendor/Flot/jquery.flot.pie.js',
                    'vendor/Flot/jquery.flot.time.js',
                    'vendor/Flot/jquery.flot.categories.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js'
                ],
                //表单控件
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
                'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
                ],
                //动画
                'animo': ['vendor/animo.js/animo.js'],
                'animate': ['vendor/animate.css/animate.min.css'],
                //等待样式
                'whirl': ['vendor/whirl/dist/whirl.css'],
                'loaders.css': ['vendor/loaders.css/loaders.css'],
                //全屏
                'screenfull': ['vendor/screenfull/dist/screenfull.js'],
                //辅助类
                'fastclick': ['vendor/fastclick/lib/fastclick.js'],
                'modernizr': ['vendor/modernizr/modernizr.js'],
                //虚拟滚动条
                'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
                //pdf
                'pdf': ['vendor/pdfjs-dist/build/pdf.js',
                    'vendor/pdfjs-dist/build/pdf.worker.js',
                    'vendor/pdfjs-dist/build/pdf.combined.js'
                ],
                'webUploader': ['ueditor/third-party/webUploader/webUploader.css',
                    'ueditor/third-party/webUploader/webUploader.js'
                ],
                'hSweetAlert': ['vendor/sweetalert/dist/sweetalert.css',
                    'vendor/sweetalert/dist/sweetalert.min.js'
                ]
            },
            modules: [{
                //md5加密
                name: 'angular-md5',
                files: ['vendor/angular-md5/angular-md5.min.js']
            }, {
                //WYSIWYG富文本编辑器
                name: 'textAngular',
                files: ['vendor/textAngular/dist/textAngular.css',
                    'vendor/textAngular/dist/textAngular-rangy.min.js',
                    'vendor/textAngular/dist/textAngular-sanitize.js',
                    'vendor/textAngular/src/globals.js',
                    'vendor/textAngular/src/factories.js',
                    'vendor/textAngular/src/DOM.js',
                    'vendor/textAngular/src/validators.js',
                    'vendor/textAngular/src/taBind.js',
                    'vendor/textAngular/src/main.js',
                    'vendor/textAngular/dist/textAngularSetup.js'
                ],
                serie: true
            }, {
                // UISelect
                name: 'ui.select',
                files: ['vendor/angular-ui-select/dist/select.js',
                    'vendor/angular-ui-select/dist/select.css'
                ]
            }, {
                //非阻式塞提醒
                name: 'toaster',
                files: ['vendor/AngularJS-Toaster/toaster.js',
                    'vendor/AngularJS-Toaster/toaster.css'
                ]
            }, {
                name: 'angularBootstrapNavTree',
                files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            }]
        });
})();
