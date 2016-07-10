angular.module('providerApp')

.factory('appService', function( $http, ref, $cookies ) {
  return {
    FBinfo: function() {
      return $http.get(`${ref.url}/FBuser`);
    },
    getCurrentUser: function() {
      return $http.get(`${ref.url}/api/getCurrentUser`).then( (user) => {
        $cookies.putObject('currentUser', user.data);
      })
    },




  }
})
