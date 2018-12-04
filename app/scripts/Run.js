angular.module('LemonChat')
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function() {
      console.log('123')
    })
  })
