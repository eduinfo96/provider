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

  function getUsersInboxImmeadiatePending() {
    messageService.getUsersInboxQuery($scope.currentUser._id, 'Immeadiate', 'Pending' ).then( (response) => {
      $scope.ImmeadiatePendingMessages = response.data;
    })
  }
  getUsersInboxImmeadiatePending();

  function getUsersInboxFuturePending() {
    messageService.getUsersInboxQuery($scope.currentUser._id, 'Future', 'Pending' ).then( (response) => {
      $scope.FuturePendingMessages = response.data;
    })
  }

  function getUsersInboxImmeadiateApproved(){
    messageService.getUsersInboxQuery($scope.currentUser._id, 'Immeadiate', 'Approved' ).then( (response) => {
      $scope.ImmeadiateApprovedMessages = response.data;
    })
  }

  function getUsersInboxFutureApproved(){
    messageService.getUsersInboxQuery($scope.currentUser._id, 'Future', 'Approved' ).then( (response) => {
      $scope.FutureApprovedMessages = response.data;
    })
  }

//calls all the inbox queries at once/ and redefines the scope
function getAllInbox() {
  getUsersInboxFuturePending();
  getUsersInboxImmeadiatePending();
  getUsersInboxImmeadiateApproved();
  getSent();
}

getAllInbox()

$scope.deleteMessage=(id)=>{
  messageService.deleteMessage(id).then((response)=>{
    getAllInbox();
  })
}

$scope.editRequest=(newStatus, id)=> {
  const updateStatus = {
    status: newStatus,
  }
  messageService.editMessage(updateStatus,id).then( (message) => {
    getAllInbox();
  })
}

$scope.markAsRead=(id)=>{
  const read ={
    read: true,
  }
  messageService.editMessage(read, id).then((message)=>{
    getAllInbox();
  })
}

$scope.reply=(fromID, serviceID)=> {
  const message= {
     messageType: "Message",
     sentTime: new Date(),
     content: $scope.reply,
     subject: "Message from Provider",
     serviceRef: serviceID,
     to: fromID,
     from: $scope.currentUser._id
  }
  messageService.sendMessage(message).then( (response) =>{
    getAllInbox();
  })
}



})
