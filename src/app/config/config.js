var app = angular.module('h5_angularjs', ['ngRoute']);
app.config(["$routeProvider",function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view/homepage.html',
      controller: 'homepage'
    })
    .when('/next', {
      templateUrl: 'view/next.html',
      controller: 'next'
    })
    .when('/form', {
      templateUrl: 'view/form.html',
      controller: 'form'
    })
    .when('/day/:id', {
      templateUrl: 'view/day.html',
      controller: 'DayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);