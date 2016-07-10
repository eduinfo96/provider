angular.module("providerApp")
.controller('userLocationCtrl', function($scope){
  // need to add this to the user and have manual input
    // $scope.geoFindMe = () => {
    //   var output = document.getElementById("out");
    //
    //   if (!navigator.geolocation){
    //     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    //     return;
    //   }
    //   function success(position) {
    //     $scope.latitude  = position.coords.latitude;
    //     $scope.longitude = position.coords.longitude;
    //     var mapCanvas = document.getElementById("map");
    //     var geolocation = {
    //       lat: $scope.latitude,
    //       lng: $scope.longitude
    //     }
    //     var mapOptions = {
    //         center: new google.maps.LatLng($scope.latitude, $scope.longitude),
    //         zoom: 18,
    //         // marker: new google.maps.Marker($scope.latitude, $scope.longitude),
    //     }
    //     var map = new google.maps.Map(mapCanvas, mapOptions);
    //   };
    //
    //   function error() {
    //     output.innerHTML = "Unable to retrieve your location";
    //   };
    //   navigator.geolocation.getCurrentPosition(success, error);
    // }
    // $scope.geoFindMe();
    //
    // $scope.search = "";
    // $scope.geoCode = function () {
    // if ($scope.search && $scope.search.length > 0) {
    //     if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    //     this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             var loc = results[0].geometry.location;
    //             $scope.search = results[0].formatted_address;
    //             $scope.gotoLocation(loc.lat(), loc.lng());
    //         } else {
    //             alert("Sorry, this search produced no results.");
    //         }
    //     });
//     }
// };
// current location

});
