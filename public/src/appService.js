angular.module('providerApp')

.factory('appService', function( $http, ref, $cookies ) {
  return {
    FBinfo: function() {
      return $http.get(`${ref.url}/FBuser`);
    },
    getThisUser(userID) {
      return $http.get(`${ref.url}/api/users/${userID}`);
    }




  }
})
