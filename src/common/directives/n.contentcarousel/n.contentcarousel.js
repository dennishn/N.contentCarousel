angular.module('N.contentCarousel', ['ngTouch'])
.controller('contentCarouselCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$document', '$parse', '$compile', function($rootScope, $scope, $timeout, $window, $document, $parse, $compile) {
    var self = this;

    var carouselId = 0;

    var timeConstant = 75;

    var moveTreshold = 0.05;

    var rubberTreshold = 3;

    var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
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
