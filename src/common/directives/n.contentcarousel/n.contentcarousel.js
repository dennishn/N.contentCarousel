angular.module('N.contentCarousel', ['ngTouch'])
.controller('contentCarouselCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$document', '$parse', '$compile', '$swipe', function($rootScope, $scope, $timeout, $window, $document, $parse, $compile, $swipe) {
    var self = this;

    var slides = self.slides = $scope.slides = [];

    var currentIndex = -1;

    var currentTimeout, isPlaying;

    var destroyed = false;

    var carouselId = 0;

    var timeConstant = 75;

    var moveTreshold = 0.05;

    var rubberTreshold = 3;

    var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;

    self.currentSlide = null;

    $scope.$on('$destroy', function () {
        destroyed = true;
    });


    self.selectSlide = $scope.selectSlide = function(nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);

        console.log(slides, nextIndex)

        if(direction === undefined) {
            direction = nextIndex > currentIndex ? 'next' : 'prev';
        }

        function goToNext() {
            if (destroyed) {
                return;
            }

            if(self.currentSlide && angular.isString(direction) && nextSlide.$element) {

            }

            self.currentSlide = nextSlide;
            currentIndex = nextIndex;
        }
    }

    self.swipeStart = function(coords, event) {

    }

    self.swipeMove = function(coords, event) {

    }

    self.swipeEnd = function(coords, event, forceAnimation) {

    }


    // next

    // prev

    // touch
    $swipe.bind(this, {
        start: self.swipeStart,
        move: self.swipeMove,
        end: self.swipeEnd,
        cancel: function(event) {
            swipeEnd({}, event);
        }
    });

    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        //if this is the first slide or the slide is set to active, select it
        if(slides.length === 1 || slide.active) {
            self.selectSlide(slides[slides.length-1]);
            if (slides.length == 1) {
                // $scope.play();
            }
        } else {
            slide.active = false;
        }
    };

}])
.directive('contentCarousel', [function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'contentCarouselCtrl',
        require: 'contentCarousel',
        templateUrl: 'common/directives/n.contentcarousel/n.contentcarousel.tpl.html',
        scope: {
            interval: '=',
            noLoop: '=',
            noAuto: '='

        }
    };
}])
.directive('slide', [function() {
    return {
        require: '^contentCarousel',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'common/directives/n.contentcarousel/n.contentcarouselslide.tpl.html',
        scope: {
            active: '=?'
        },
        link: function(scope, element, attrs, contentCarouselCtrl) {

            contentCarouselCtrl.addSlide(scope, element);

            scope.$on('$destroy', function() {
                contentCarouselCtrl.removeSlide(scope);
            });

            scope.$watch('active', function(active) {
                if (active) {
                    contentCarouselCtrl.select(scope);
                }
            });

        }
    };
}]);
