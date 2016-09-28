(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('AnchorSmoothScroll', AnchorSmoothScroll);

    AnchorSmoothScroll.$inject = [];

    function AnchorSmoothScroll() {
        this.scrollTo = scrollTo;

        function scrollTo(eID, yOffset) {
            var startY = window.pageYOffset || 0;
            var stopY = elmYPosition(eID) || 0;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            var speed = 15;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            stopY = stopY - yOffset;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
            } else {

                for (var j = startY; j > stopY; j -= step) {
                    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                    leapY -= step;
                    if (leapY < stopY) leapY = stopY;
                    timer++;
                }
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent !== document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }

        }
    }

})();
