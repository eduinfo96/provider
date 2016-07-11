angular.module('providerApp', ['ui.router', 'ngCookies'])

.config( function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: "src/home/home.html",
      controller: "homeCtrl"
    })
    .state('userHome', {
      url:'/profile',
      templateUrl: "src/userHome/userHome.html",
      controller: "userHomeCtrl",
    })
    .state('providerHome', {
      url:'/provider',
      templateUrl: "src/providerHome/providerHome.html",
      controller: "providerHomeCtrl"
    })

    $urlRouterProvider.otherwise("/home");
})


.constant('ref', {
  // url: "http://harrypotterbookclub.xyz"  unblock when you want to host again
  url: "http://localhost:3000"
})

// formats a number as a latitude (e.g. 40.46... => "40°27'44"N")
.filter('lat', function () {
return function (input, decimals) {
    if (!decimals) decimals = 0;
    input = input * 1;
    var ns = input > 0 ? "N" : "S";
    input = Math.abs(input);
    var deg = Math.floor(input);
    var min = Math.floor((input - deg) * 60);
    var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
    return deg + "°" + min + "'" + sec + '"' + ns;
}
})

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
.filter('lon', function () {
return function (input, decimals) {
    if (!decimals) decimals = 0;
    input = input * 1;
    var ew = input > 0 ? "E" : "W";
    input = Math.abs(input);
    var deg = Math.floor(input);
    var min = Math.floor((input - deg) * 60);
    var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
    return deg + "°" + min + "'" + sec + '"' + ew;
}
})
