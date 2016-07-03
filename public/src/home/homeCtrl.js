angular.module("providerApp")

.controller("homeCtrl", function($scope, $state) {
  $scope.loginFB = function () {
        $state.go("http://localhost:3000/auth/facebook/auth");
  }
})
