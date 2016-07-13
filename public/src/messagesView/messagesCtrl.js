angular.module("providerApp")
.controller("messagesCtrl", function($scope, $rootScope, messageService) {
  $scope.currentUser = $rootScope.currentUser;
  $scope.userServices = $scope.currentUser.servicesOffered;


  function getSent() {
    messageService.getSentMessages($scope.currentUser._id).then( (response) => {
      $scope.sentMessages = response.data;
    })
  }
  getSent();

  function getUsersInbox() {
    messageService.getUsersInbox($scope.currentUser._id).then( (response) => {
      $scope.userInboxMessages = response.data;
    })
  }
  getUsersInbox();

$scope.deleteMessage=(id)=>{
  messageService.deleteMessage(id).then((response)=>{
    getUsersInbox();
    getSent();
  })
}



})
