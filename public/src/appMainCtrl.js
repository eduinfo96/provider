angular.module('providerApp')

  .controller('mainCtrl', function($scope, $state, appService, $http, $cookies) {

    let getCurrentUser = () => {
      appService.getCurrentUser()
        .then((user) => {
          $scope.currentUser = $cookies.getObject('currentUser');
          console.log('Success');
          console.log($scope.currentUser);
        });
    };

  });
