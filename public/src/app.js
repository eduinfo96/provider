angular.module('providerApp', ['ui.router'])

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
      controller: "userHomeCtrl"
    })

    $urlRouterProvider.otherwise("/home");
})


.constant('ref', {
  url: "http://localhost:3000"
})
