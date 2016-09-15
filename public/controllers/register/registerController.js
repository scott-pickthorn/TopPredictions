  var register = angular.module('register',[]);
  
  register.controller('registerController', ['$scope','$http', function($scope, $http){
      $scope.user = "";
      $scope.getUser = function(){
        console.log($scope.user);
        $http.post('/register/user',$scope.user).success(function(response) {
      console.log(response);
    });
       };
  }]);