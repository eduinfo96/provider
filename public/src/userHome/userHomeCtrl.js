angular.module("providerApp")

.controller("userHomeCtrl", function($scope, $rootScope, appService, userService, $cookies, $location, providerService, messageService){

//Set the profile Setup Modal to hide, if the user does not have type, than the modal is shown in a later function
  $('#profileSetup').modal('hide')
  $('#composeMessage').modal('hide')



// This function checks if the fb data is already associated with a user, if not, it creates a user.
// Both return a user object
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
            return userService.addUser(newUser).then( (user) => {
              $rootScope.currentUser =user.data;
              $scope.currentUser = user.data;
              $scope.user = user.data;
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
//this is the functions that is called when you want to go to a location on the Map
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
//
// pushes any location to the recent locations array, where you can then decide to save the location
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
              "placeID": results[0].place_id,
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
                  "placeID": results[0].place_id,
                }
                $scope.locations.push(newLocation)
                $scope.gotoLocation(loc.lat(), loc.lng());
            } else {
                alert("Sorry, this search produced no results.");
            }
        });
    }
};

//Takes in a starting object and ending object and calculates the distance btwn {lat: ,lng:}
//not currently being used
function getDistance(starting, ending) {
  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [starting],
    destinations: [ending],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== "OK") {
      console.log(status);
    }
    else {
      var distance =response.rows[0].elements[0].distance.value;
      var miles = insertDecimalandConvert(distance);
      return miles;
    }
    })
};

//This function takes in the kilometers value given by Google Maps and converts it to miles
function insertDecimalandConvert(num) {
  let kilos= Number((num/1000).toFixed(2));
  console.log(kilos)
  let miles = kilos*0.621371;
  return miles;
}

$scope.locations = [
  {}
];

//pushes the location to the user object into the array
$scope.saveLocation = (newLocation) => {
  userService.addLocation($scope.currentUser._id, newLocation).then( (user) => {
    $rootScope.currentUser = user.data;
    $scope.currentUser = user.data
  })
}


//if the user is new it will show the profileSetup Modal
setTimeout(function(){
  if (!$scope.currentUser.userType) {
    $('#profileSetup').modal('show')
  }
},500)

// the function that is used on the profileSetup modal, to edit the user and add the fields below
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


//this function set's the users Current Location, so that distance can be calculated between the user and the provider
$scope.setLocation=(lat, lon)=>{
  const setLocation= {
    currentLocation: {
      lat: lat,
      lng: lon,
    }
  }
  userService.editUser(setLocation, $scope.currentUser._id).then( (user) => {
    $scope.currentUser = user.data;
    $rootScope.currentUser = user.data;
  })
}

// Gets all services currently, want to make it so that only servives in the distance travled are available to view
// $scope.allServices= []
function getServices() {
  return providerService.getServices().then( (response) => {
    $scope.allServices = response.data;
    // console.log(allServices);
    // for (var i = 0; i < allServices.length; i++) {
    //   var distanceBtwn= getDistance(allServices[i].user.currentLocation, $scope.currentUser.currentLocation)
    //   if (distanceBtwn <= allServices[i].travelDistance) {
    //     $scope.allServices.push(allServices[i]);
    //   }
    // }
    // console.log($scope.allServices);
  })
}
// setTimeout(getServices(), 500);
getServices();


//allows the user to send a request to the provider.
$scope.sendMessage=()=>{
  const message= {
     messageType: $scope.tempService.request,
     requestDate: new Date(),
     sentTime: new Date(),
     content: $scope.tempService.messageContent,
     subject: $scope.tempService.subject,
     serviceRef: $scope.tempService._id,
     to: $scope.tempService.user._id,
     from: $scope.currentUser._id
  }
  // console.log(message);
  messageService.sendMessage(message).then((response) => {
    // console.log(response);
    $scope.tempService = {}
  });
}

$scope.writeMessage = (service) => {
  $('#composeMessage').modal('show');
  $scope.tempService= service;
}



})
