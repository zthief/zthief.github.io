(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('CarouselDemoCtrl', CarouselDemoCtrl);

    function CarouselDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.myInterval = 2000;
          vm.active = 0;
          var slides = vm.slides = [];
          vm.addSlide = function() {
            var newWidth = 1366 + slides.length;
            slides.push({
              image: '//unsplash.it/' + newWidth + '/700',
              text: ['More','Extra','Lots of','Surplus'][slides.length % 2] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
            });
          };

          for (var i=0; i<4; i++) {
            vm.addSlide();
          }

        }
    }
})();
