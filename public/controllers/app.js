var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
$scope.p = "";


var refresh = function() {
  $http.get('/playerList').success(function(response) {
    console.log("I got the data I requested");
    $scope.playerList = response;
    $scope.player = "";
  });
};

refresh();
$scope.clearFilter = function(){
	$scope.p = "";
	refresh();
};
$scope.position = function(x){
	$scope.p = x;
	refresh();
};
 
$scope.addplayer = function() {
	$http.post('/playerList', $scope.player).success(function(response) {
		console.log(response);
		refresh();
	});
};
$scope.onTeam = false;
$scope.onTeam = function(id) {
	$scope.player.onTeam = true;
};

$scope.offTeam = function(id) {
	$scope.player.onTeam = false;
};  

}]);﻿