angular.module("providerApp")

.controller("userHomeCtrl", function($scope, providerService, userService){

  $('#profileSetup').modal('show')

  let fbData = {}
  function getFbData(){
    providerService.FBinfo().then( (response)=> {
      fbData = response.data;
      console.log(fbData);
    })
  }

  getFbData();
  console.log(user);

  $scope.addNewUser = () => {
    const newUser =   {
          facebookName: fbData.facebookName
        , firstName: ""
        , userType: $scope.userType
        , bio: $scope.bio
        , imageUrl: $scope.imgUrl
        , facebookID: fbData.id
        , facebookName: fbData.facebookName
        , zipCode: $scope.zip
        , servicesOffered: {}
      }
      return userService.addUser(newUser);
  }



})
