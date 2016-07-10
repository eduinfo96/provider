angular.module("providerApp")

.controller("homeCtrl", function($scope, $location, $cookies) {

  // $scope.loginFB = function () {
  //   providerService.FBinfo().then(function(response){console.log(response)});
  //   // providerService.loginFB().then( ()=> {console.log(response.data)});
  // }
  console.log($cookies.getObject('currentUser'));
})
