angular.module("providerApp")

.controller("homeCtrl", function($scope, providerService) {
  $scope.loginFB = function () {
    providerService.loginFB().then( ()=> {console.log(response.data)});
  }
})
