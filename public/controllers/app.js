var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	$scope.p = "";
	$scope.top = true;
	$scope.f = '-clf';
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
	$scope.filter = function(c){
		$scope.f = c;
		if($scope.top == true){
			$scope.f = '-' + c;
		}
		else{
			$scope.f.replace('-', '');
		}
	}
	$scope.graph = function(player){
	$(function () {
	console.log(player);
	predAvg = player.clf/16;
	espnAvg = player.espn/16;
	console.log(predAvg);
    $('#graphContainer').highcharts({
        title: {
            text: player.name,
            x: -20 //center
        },
        subtitle: {
            text: 'fantasy points per week',
            x: -20
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']
        },
        yAxis: {
            title: {
                text: 'fantasy points',
				y: -20
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'horizontal',
            align: 'bottom',
            verticalAlign: 'bottom',
			y: 25,
			x: 30,
            borderWidth: 0
        },
        series: [
		{
            name: '2015 points',
            data: [player.week1, player.week2, player.week3, player.week4, player.week5, player.week6, player.week7, player.week8, player.week9, player.week10, player.week11, player.week12, player.week13, player.week14, player.week15, player.week16, player.week17]
        },
		{
			name: 'Decision Tree avg Prediction',
			data: [predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg,predAvg]
		},
		{
			name: 'ESPN avg Prediction',
			data: [espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg,espnAvg]
		}
		]
    });
});
};
}]);﻿