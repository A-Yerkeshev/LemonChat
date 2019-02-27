angular.module('LemonChat')
  .directive('messageDirective', function(AnimationsService) {
    function appear(scope, element) {
      AnimationsService.animateMessage(element[0]);
    };

    return {
      link: appear
    };
  })
