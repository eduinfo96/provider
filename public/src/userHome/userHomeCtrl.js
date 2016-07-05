angular.module("providerApp")

.controller("userHomeCtrl", function($scope, providerService, userService){

  $('#profileSetup').modal('show')


  function checkIfUser() {
    providerService.FBinfo().then( (response) => {
      var fb = response.data;
      console.log(fb);
      userService.getUsers().then( (users) => {
        console.log(users)
        for (let i=0; i < users.length; i++) {
          //CHECKS TO SEE IF A USER EXSIST, RETURNS PARAM.ID
          if (users[i].facebookID == fb.facebookID) {
            $scope.user = users[i];
            console.log("user exsist", users[i]);
            return users[i];
          } //IF USER DOESN'T EXSIST, CREATES A NEW USER WITH THE AVAILABLE DATA
          else {
            const newUser =   {
                  facebookName: fb.facebookName
                , facebookID: fb.facebookID
                , firstName: fb.firstName
                , lastName: fb.lastName
                , photos: fb.picture
                , email: fb.email
                , gender: fb.gender
                , birthday: fb.birthday
                , location: fb.location
              }
              console.log("user created!");
              return userService.addUser(newUser);
          }
        } //end of loop
      })
    })

  }


  checkIfUser();

  // needs to go in edit user
  // userType: $scope.userType
  //  , bio: $scope.bio
  // , zipCode: $scope.zip



})
