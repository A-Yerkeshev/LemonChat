angular.module('LemonChat')
  .directive('altImgSrc', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if(attrs.src != attrs.altImgSrc) {
            attrs.$set('src', attrs.altImgSrc);
          }
        });
      }
    }
  })
