angular.module('providerApp')

.directive('userNav', function($location) {
  return {
      templateUrl: 'src/directives/userNavBar/userNavBar.html'
      , link: function (scope) {
  
      }
  };
})
