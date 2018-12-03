angular.module('LemonChat')
  .directive('messageDirective', function() {
    function appear(scope, element) {
      scope.animateMessage(element[0]);
    };

    return {
      link: appear
    };
  })
