var app = angular.module('h5_angularjs', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view/homepage.html',
      controller: 'homepage'
    })
    .when('/next', {
      templateUrl: 'view/next.html',
      controller: 'next'
    })
    .when('/day/:id', {
      templateUrl: 'view/day.html',
      controller: 'DayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.controller("homepage", ["$scope",function($scope) {
        $scope.person = {
            firstName: "John",
            lastName: "Doe"
        };
    }
]);
app.controller("next", ["$scope",function($scope) {
        console.log("next")
    }
]);