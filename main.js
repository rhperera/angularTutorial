var app = angular.module('app',['ngRoute']);

app.service('getListFromAPI',['$http','$q', function($http,$q) {
    this.getList = function () {
      var deferred = $q.defer();
      $http.get("http://www.json-generator.com/api/json/get/cjyTgvelWq?indent=2")
        .success(function(r) {
          //$scope.list = JSON.parse(r.countries);
          deferred.resolve(r);
        });
        return deferred.promise;
    }
}]);

app.controller('HomeCtrl',['$scope',function($scope) {
  $scope.name = "Raveen";
}]);

app.controller('ListCtrl',['$scope','getListFromAPI',function($scope,getListFromAPI) {
  $scope.generateList = function() {
      getListFromAPI.getList().then(function(s) {
        $scope.list = s.countries;
      });
    }

}]);

app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl'
  }).
  when('/getList', {
    templateUrl: 'list.html',
    controller: 'ListCtrl'
  }).
  otherwise({
    redirectTo: '/'
  })
}]);
