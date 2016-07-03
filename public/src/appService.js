angular.module('providerApp')

.factory('providerService', function( $http ) {
  return {
    loginFB: function() {
      return $http.get('/auth/facebook');
    }


  }
})
