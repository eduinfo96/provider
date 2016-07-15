angular.module("providerApp")

.controller("providerHomeCtrl", function($scope, $rootScope, providerService, userService, appService, $state) {
  $scope.currentUser = $rootScope.currentUser;
  $scope.userServices = $scope.currentUser.servicesOffered
  $('#editService').modal('hide')


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
        serviceType: $scope.tempNewService.serviceType
      , specialties: $scope.tempNewService.specialties
      , skillLevel: $scope.tempNewService.skillLevel
      , description: $scope.tempNewService.description
      , flatRate: {metric: $scope.tempNewService.metric, cost: $scope.tempNewService.cost}
      , hrlyRate: { hrly: $scope.tempNewService.hrly, minHrs: $scope.tempNewService.minHrs}
      , user: $scope.currentUser._id
      , travelDistance: $scope.tempNewService.miles
    }
    return providerService.submitNewService(Service).then( (response) => {
        appService.getThisUser($scope.currentUser._id).then( (user) => {
          $scope.currentUser= user.data;
          $rootScope.currentUser= user.data;
          $scope.userServices = $scope.currentUser.servicesOffered;
          $scope.tempNewService={}
        })
    })
  }

  $scope.changeIsActive=(status)=> {
    const editUser= {
      isActive: status
    }
      userService.editUser(editUser, $scope.currentUser._id).then( (res)=>{
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
$scope.edit={}
  $scope.openEditServiceModal=(editService)=> {
      $scope.edit.serviceType= editService.serviceType;
      $scope.edit.specialties= editService.specialties;
      $scope.edit.skillLevel= editService.skillLevel;
      $scope.edit.description= editService.description;
      $scope.edit.flatRate= {metric: editService.metric, cost: editService.cost};
      $scope.edit.hrlyRate= { hrly: editService.hrly, minHrs: editService.minHrs};
      $scope.edit.travelDistance= editService.miles;
      $scope.edit.id= editService._id;
      $('#editService').modal('show')
  }

$scope.editService=()=>{
  const editedService= {
      serviceType: $scope.edit.serviceType
    , specialties: $scope.edit.specialties
    , skillLevel: $scope.edit.skillLevel
    , description: $scope.edit.description
    , flatRate: {metric: $scope.edit.flatRate.metric, cost: $scope.edit.flatRate.cost}
    , hrlyRate: { hrly: $scope.edit.hrlyRate.hrly, minHrs: $scope.edit.hrlyRate.minHrs}
    , travelDistance: $scope.edit.travelDistance
  }
  providerService.editService(editedService, $scope.edit._id).then( (response) => {
    $scope.edit ={};
    appService.getThisUser($scope.currentUser._id).then( (user) => {
      $scope.currentUser= user.data;
      $rootScope.currentUser= user.data;
      $scope.userServices = $scope.currentUser.servicesOffered;
    })
  })
}



})
