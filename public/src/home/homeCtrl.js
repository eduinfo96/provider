angular.module("providerApp")

.controller("homeCtrl", function($scope, providerService, $location) {
  $scope.loginFB = function () {
    providerService.FBinfo().then(function(response){console.log(response)});
    // providerService.loginFB().then( ()=> {console.log(response.data)});
  }
})
