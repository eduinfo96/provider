angular.module("providerApp")

.controller("userHomeCtrl", function($scope, $rootScope, appService, userService, $cookies, $location){
  $('#profileSetup').modal('hide')


  function checkIfUser() {
    appService.FBinfo().then( (response) => {
      if (!response.data._id) {
        var fb= response.data;
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
              $rootScope.currentUser =user;
              $scope.currentUser = user;
              $scope.user = user;
              console.log("new user exist", $scope.currentUser);
              return ;
            });
      }
      $rootScope.currentUser = response.data;
      $scope.currentUser = response.data;
      $scope.user = response.data;
      console.log("userExist", $scope.currentUser);
    })
  }

  checkIfUser();



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

$scope.locations = [
  {}
];

$scope.saveLocation = (newLocation) => {
  userService.addLocation($scope.currentUser._id, newLocation).then( (user) => {
    $rootScope.currentUser = user.data;
    $scope.currentUser = user.data
  })
}

setTimeout(function(){
  if (!$scope.currentUser.userType) {
    $('#profileSetup').modal('show')
  }
},500)

$scope.updateUser= () => {
  const updatedUser= {
    userType: $scope.userType
    , bio: $scope.bio
    , email: $scope.email
    , cellNumber: $scope.phoneNumber
  }
  userService.editUser(updatedUser, $scope.currentUser._id).then( (user) => {
    $rootScope.currentUser = user.data ;
    $scope.currentUser = user.data ;
    $('#profileSetup').modal('hide');
    if ($scope.currentUser.userType === "provider") {
      $location.path('/provider')
    }
  } )
}





})
