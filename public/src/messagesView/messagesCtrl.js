angular.module("providerApp")
.controller("messagesCtrl", function($scope, $rootScope, providerService, userService, appService) {
  $scope.currentUser = $rootScope.currentUser;
  $scope.userServices = $scope.currentUser.servicesOffered



})
