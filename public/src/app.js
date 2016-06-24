angular.module('providerApp', ['ui.router'])

.config( function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: "src/home/home.html",
      controller: "homeCtrl"
    })

    $urlRouterProvider.otherwise("/home");
})
