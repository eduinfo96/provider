angular.module("providerApp")

.controller("providerHomeCtrl", function($scope, $rootScope, providerService, userService, appService) {
  $scope.currentUser = $rootScope.currentUser;
  console.log("current user is ", $scope.currentUser);
  $scope.userServices = $scope.currentUser.servicesOffered


  //THIS FUNCTION GETS ALL SERVICES
  // function getServices() {
  //   return providerService.getServices().then( (response) => {
  //     $scope.allServices = response.data;
  //     console.log($scope.allServices);
  //   })
  // }
  // getServices();

//This function submits a new service and then gets the user object with the services on it.
  $scope.submitNewService = () => {
    const Service= {
        serviceType: $scope.serviceType
      , specialties: $scope.specialties
      , skillLevel: $scope.skillLevel
      , description: $scope.description
      , flatRate: {metric: $scope.metric, cost: $scope.cost}
      , hrlyRate: { hrly: $scope.hrly, minHrs: $scope.minHrs}
      , user: $scope.currentUser._id
      , travelDistance: $scope.miles
    }
    return providerService.submitNewService(Service).then( (response) => {
        appService.getThisUser($scope.currentUser._id).then( (user) => {
          $scope.currentUser= user.data;
          $rootScope.currentUser= user.data;
          $scope.userServices = $scope.currentUser.servicesOffered;
        })
    })
  }

//This function deletes the servicesOffered and then updates the user
  $scope.deleteService= (id) => {
    providerService.deleteService(id).then( (response) => {
      appService.getThisUser($scope.currentUser._id).then( (user) => {
        $scope.currentUser= user.data;
        $rootScope.currentUser= user.data;
        $scope.userServices = $scope.currentUser.servicesOffered;
      })
    })
  }

})
