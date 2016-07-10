angular.module("providerApp")

.controller("userHomeCtrl", function($scope, appService, userService, $cookies, $location){

  $('#profileSetup').modal('show')


  function checkIfUser() {
    appService.FBinfo().then( (response) => {
      var fb = response.data;
      userService.getUsers().then( (res) => {
        var users = res.data;
        for (let i=0; i < users.length; i++) {
          //CHECKS TO SEE IF A USER EXSIST, RETURNS PARAM.ID
          if (users[i].facebookID == fb.facebookID) {
            $cookies.putObject('currentUser', users[i]);
            $scope.currentUser = $cookies.getObject('currentUser');
            $scope.user = users[i];
            console.log("user exsist", $scope.currentUser);
            return ;
          }
        } //end of loop
        //IF USER DOESN'T EXSIST, CREATES A NEW USER WITH THE AVAILABLE DATA
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
          return userService.addUser(newUser).then( (user) => {
            $cookies.putObject('currentUser', user.data);
            $scope.currentUser = $cookies.getObject('currentUser');
            console.log("new user exsist", $scope.currentUser);
            return ;
          });
      })
    })
  }


  checkIfUser();



  //currently not working
  $scope.logout = () => {
    $scope.currentUser={};
    $cookies.remove('currentUser');
    $location.path('/logout')
  };


// // need to add this to the user and have manual input



$scope.loc = { lat: 32.7767, lon: -96.7970};
$scope.gotoCurrentLocation = function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var c = position.coords;
            getReverseGeocodingData(c.latitude, c.longitude);
            $scope.gotoLocation(c.latitude, c.longitude);
        });
        return true;
    }
    return false;
};
function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            var newLocation = {
              "name": "New Location",
              "streetNumber": results[0].address_components[0].long_name,
              "streetName": results[0].address_components[1].long_name,
              "city": results[0].address_components[3].long_name,
              "formattedAddress": results[0].formatted_address,
              "state": results[0].address_components[5].long_name,
              "zip": results[0].address_components[7].long_name,
              "lat": lat,
              "lon": lng,
            }
            $scope.locations.push(newLocation)
            console.log(newLocation);
            $scope.address = (results[0].formatted_address);
        }
    });
};
$scope.gotoLocation = function (lat, lon) {
    if ($scope.lat != lat || $scope.lon != lon) {
        $scope.loc = { lat: lat, lon: lon };
        $scope.zoomControl = 18;
        if (!$scope.$$phase) $scope.$apply("loc");
    }
};

// geo-coding
$scope.search = "";
$scope.geoCode = function () {
    if ($scope.search && $scope.search.length > 0) {
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                $scope.address = results[0].formatted_address;
                var newLocation = {
                  "name": "New Location",
                  "streetNumber": results[0].address_components[0].long_name,
                  "streetName": results[0].address_components[1].long_name,
                  "city": results[0].address_components[3].long_name,
                  "formattedAddress": results[0].formatted_address,
                  "state": results[0].address_components[5].long_name,
                  "zip": results[0].address_components[7].long_name,
                  "lat": loc.lat(),
                  "lon": loc.lng(),
                }
                $scope.locations.push(newLocation)
                $scope.gotoLocation(loc.lat(), loc.lng());
            } else {
                alert("Sorry, this search produced no results.");
            }
        });
    }
};

// some points of interest to show on the map
// to be user as markers, objects should have "lat", "lon", and "name" properties
$scope.locations = [
  {}
];

  // needs to go in edit user
  // userType: $scope.userType
  //  , bio: $scope.bio
  // , zipCode: $scope.zip



})
