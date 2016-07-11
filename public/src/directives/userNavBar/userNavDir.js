angular.module('providerApp')

.directive('userNav', function() {
  return {
      templateUrl: 'src/directives/userNavBar/userNavBar.html'
      , link: function (scope,cookies) {
        
      }
  };
})
