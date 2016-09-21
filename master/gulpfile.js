(function() {
    'use strict';

    var gulp = require('gulp'),
        $ = require('gulp-load-plugins')(),
        gulpsync = $.sync(gulp),
        del = require('del');

    // production mode (see build task)
    var isProduction = false;
    // styles sourcemaps
    var useSourceMaps = false;

    // MAIN PATHS
    var paths = {
        app: '../app/',
        markup: 'html/',
        styles: 'less/',
        scripts: 'js/',
        imgs: 'img/',
        rev: '../rev/'
    };

    // VENDOR CONFIG
    var vendor = {
        // vendor scripts required to start the app
        base: {
            source: require('./vendor.base.json'),
            dest: '../app/js',
            name: 'base.js'
        },
        // vendor scripts to make the app work. Usually via lazy loading
        app: {
            source: require('./vendor.json'),
            dest: '../vendor'
        }
    };


    // SOURCES CONFIG
    var source = {
        scripts: [paths.scripts + 'app.module.js',
            // template modules
            paths.scripts + 'modules_core/**/*.module.js',
            paths.scripts + 'modules_core/**/*.js',
            paths.scripts + 'modules_custom/**/*.module.js',
            paths.scripts + 'modules_custom/**/*.js'
        ],
        templates: {
            index: paths.markup + 'index.html',
            views: [paths.markup + '**/*.html', '!' + paths.markup + 'index.html']
        },
        styles: {
            app: [paths.styles + '*.*'],
            themes: [paths.styles + 'themes/*'],
            custom: [paths.styles + 'backend/*',
                paths.styles + 'frontend/*',
                paths.styles + 'singlepage/*'],
            watch: [paths.styles + '**/*', '!' + paths.styles + 'themes/*']
        },
        imgs: paths.imgs + '*.*'
    };

    // BUILD TARGET CONFIG
    var build = {
        scripts: paths.app + 'js',
        styles: paths.app + 'css',
        templates: {
            index: '../',
            views: paths.app,
            cache: paths.app + 'js/' + 'templates.js',
        },
        imgs: paths.app + 'img',
        rev: paths.rev + '*.json'
    };

    // PLUGINS OPTIONS

    var prettifyOpts = {
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
    };

    var vendorUglifyOpts = {
        mangle: {
            except: ['$super'] // rickshaw requires this
        }
    };

    //AUTOPREFIXER OPTIONS
    var autoprefixerOpts = {
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true,
        remove: true
    };

    //---------------
    // TASKS
    //---------------

    // JS APP
    gulp.task('scripts:app', function() {
        log('Building scripts..');
        // Minify and copy all JavaScript (except vendor scripts)
        return gulp.src(source.scripts)
            .pipe($.plumber())
            .pipe($.jsvalidate())
            .pipe($.if(useSourceMaps, $.sourcemaps.init()))
            .pipe($.concat('app.js'))
            .pipe($.rev())
            .pipe($.ngAnnotate())
            .pipe($.if(isProduction, $.uglify({
                preserveComments: 'some'
            })))
            .pipe($.if(useSourceMaps, $.sourcemaps.write()))
            .pipe(gulp.dest(build.scripts))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(paths.rev));
    });


    // VENDOR BUILD
    gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']));

    // Build the base script to start the application from vendor assets
    gulp.task('vendor:base', function() {
        log('Copying base vendor assets..');
        return gulp.src(vendor.base.source)
            .pipe($.expectFile(vendor.base.source))
            .pipe($.if(isProduction, $.uglify()))
            .pipe($.concat(vendor.base.name))
            .pipe(gulp.dest(vendor.base.dest));
    });

    // copy file from bower folder into the app vendor folder
    gulp.task('vendor:app', function() {
        log('Copying vendor assets..');

        var jsFilter = $.filter('**/*.js', {restore: true});
        var cssFilter = $.filter('**/*.css', {restore: true});

        return gulp.src(vendor.app.source, {
                base: 'bower_components'
            })
            .pipe($.expectFile(vendor.app.source))
            .pipe(jsFilter)
            .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe($.if(isProduction, $.minifyCss()))
            .pipe(cssFilter.restore)
            .pipe(gulp.dest(vendor.app.dest));

    });

    // APP LESS
    gulp.task('styles:app', function() {
        log('Building application styles..');
        return gulp.src(source.styles.app)
            .pipe($.plumber())
            .pipe($.if(useSourceMaps, $.sourcemaps.init()))
            .pipe($.less())
            .pipe($.autoprefixer(autoprefixerOpts))
            .pipe($.if(isProduction, $.minifyCss()))
            .pipe($.if(useSourceMaps, $.sourcemaps.write()))
            .pipe(gulp.dest(build.styles));
    });

    gulp.task('styles:custom', function() {
        log('Building custom styles..');
        return gulp.src(source.styles.custom)
            .pipe($.autoprefixer(autoprefixerOpts))
            .pipe($.if(isProduction, $.minifyCss()))
            .pipe(gulp.dest(build.styles));
    });

    // LESS THEMES
    gulp.task('styles:themes', function() {
        log('Building application theme styles..');
        return gulp.src(source.styles.themes)
            .pipe($.plumber())
            .pipe($.less())
            .pipe(gulp.dest(build.styles));
    });

    // html
    gulp.task('templates:index', ['scripts:app'], function() {
        log('Building index..');

        return gulp.src([build.rev, source.templates.index])
            .pipe($.plumber())
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe($.revCollector())
            .pipe(gulp.dest(build.templates.index));
    });

    // html
    gulp.task('templates:views', function() {
        log('Building views..');

        return gulp.src(source.templates.views)
            .pipe($.plumber())
            .pipe($.if(!isProduction, $.changed(build.templates.views, {
                extension: '.html'
            })))
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.views));
    });

    // img
    gulp.task('image', function(){
        log('Building images..');

        return gulp.src(source.imgs)
            .pipe(gulp.dest(build.imgs));
    });

    //---------------
    // WATCH
    //---------------

    // Rerun the task when a file changes
    gulp.task('watch', function() {
        log('Starting watch and LiveReload..');

        $.livereload.listen();

        gulp.watch(source.scripts, ['templates:index']);
        gulp.watch(source.styles.watch, ['styles:app']);
        gulp.watch(source.styles.custom, ['styles:custom']);
        gulp.watch(source.styles.themes, ['styles:themes']);
        gulp.watch(source.templates.views, ['templates:views']);
        gulp.watch(source.templates.index, ['templates:index']);
        gulp.watch(source.imgs, ['image']);

        // a delay before triggering browser reload to ensure everything is compiled
        var livereloadDelay = 1500;
        // list of source file to watch for live reload
        var watchSource = [].concat(
            source.scripts,
            source.styles.watch,
            source.styles.custom,
            source.styles.themes,
            source.templates.views,
            source.templates.index,
            source.imgs
        );

        gulp
            .watch(watchSource)
            .on('change', function(event) {
                setTimeout(function() {
                    $.livereload.changed(event.path);
                }, livereloadDelay);
            });

    });

    // Remove all files from the build paths
    gulp.task('clean', function(done) {
        var delconfig = [].concat(
            build.styles,
            build.scripts,
            build.templates.index + 'index.html',
            build.templates.views + 'views',
            build.templates.views + 'pages',
            vendor.app.dest,
            build.rev,
            build.imgs
        );

        log('Cleaning: ' + $.util.colors.blue(delconfig));
        // force: clean files outside current directory
        del(delconfig, {
            force: true
        }, done);
    });

    //---------------
    // MAIN TASKS
    //---------------

    // build for production (minify)
    gulp.task('build', gulpsync.sync([
        'prod',
        'vendor',
        'assets'
    ]));

    gulp.task('prod', function() {
        log('Starting production build...');
        isProduction = true;
    });

    // build with sourcemaps (no minify)
    gulp.task('sourcemaps', ['usesources', 'default']);
    gulp.task('usesources', function() {
        useSourceMaps = true;
    });

    // default (no minify)
    gulp.task('default', gulpsync.sync([
        'vendor',
        'assets',
        'watch'
    ]), function() {

        log('************');
        log('* All Done * You can start editing your code, LiveReload will update your browser after any change..');
        log('************');

    });

    gulp.task('assets', [
        'scripts:app',
        'styles:app',
        'styles:custom',
        'styles:themes',
        'templates:index',
        'templates:views',
        'image'
    ]);


    /////////////////////

    // log to console using
    function log(msg) {
        $.util.log($.util.colors.blue(msg));
    }

})();
