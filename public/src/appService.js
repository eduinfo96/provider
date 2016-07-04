angular.module('providerApp')

.factory('providerService', function( $http, ref ) {
  return {
    FBinfo: function() {
      return $http.get(`${ref.url}/FBuser`);
    }



  }
})
