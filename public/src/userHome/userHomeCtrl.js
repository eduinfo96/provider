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



  function checkIfUser() {
    providerService.FBinfo().then( (response) => {
      var fb = response.data;
      userService.getUsers().then( (users) => {
        for (let i=0; i < users.length; i++) {
          //CHECKS TO SEE IF A USER EXSIST, RETURNS PARAM.ID
          if (users[i].facebookID == fbData.id) {
            $scope.user = users[i];
            console.log("user exsist", users[i]._id);
            return users[i]._id;
          } //IF USER DOESN'T EXSIST, CREATES A NEW USER WITH THE AVAILABLE DATA
          else {
            const newUser =   {
                  facebookName: fb.facebookName
                , facebookID: fb.id
                , firstName: fb.firstName
                , lastName: fb.lastName
                , photos: fb.picture
                , email: fb.email
                , gender: fb.gender
                , birthday: fb.birthday
                , location: fb.location
              }
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
