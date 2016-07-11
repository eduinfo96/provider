angular.module("providerApp")

.controller("providerHomeCtrl", function($scope, $rootScope) {
  $scope.currentUser = $rootScope.currentUser;
  console.log("current user is ", $scope.currentUser);



})
