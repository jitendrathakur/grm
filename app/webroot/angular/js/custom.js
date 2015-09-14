var myApp = angular.module('grm', ['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/", {
			controller:"company",
			//templateUrl:"views/companies/list.html"
		})
		.when("/add", {
			controller:"companyadd"
		});
}]);


myApp.controller('company', function($scope, $http) {

	var url = "http://localhost/grm/companies/";
	
	$http.get(url).success(function(response) {
		$scope.result = response;
		$scope.jitz = "jitendra";
	})
	// $http.get('http://localhost/grm/companies/getlist')
	// 	.then(function(response) {
	// 		console.log(response);
	// 	}, function(response) {
	// 		console.log("error");
	// 	});
	// $scope.submitForm = function() {
	// 	var data = {
	// 		name : $scope.name,
	// 		tag : $scope.tag,
	// 		description : $scope.description,
	// 		city : $scope.city,
	// 		state : $scope.state,
	// 		country : $scope.country
	// 	};
	// 	$http.post('add.json', data).success(function(data, status, header, config) {
	// 		console.log(data);
	// 		//$location.path('companies');
	// 	}).error(function(data, status, header, config) {

	// 	});	
	// }
});

myApp.controller('companyadd', function($scope, $http) {
alert("sdfsdf");
	console.log("add");
	// var url = "http://localhost/grm/companies/";
	
	// $http.get(url).success(function(response) {
	// 	$scope.result = response;
	// 	$scope.jitz = "jitendra";
	// });
	// $http.get('http://localhost/grm/companies/getlist')
	// 	.then(function(response) {
	// 		console.log(response);
	// 	}, function(response) {
	// 		console.log("error");
	// 	});
	// $scope.submitForm = function() {
	// 	var data = {
	// 		name : $scope.name,
	// 		tag : $scope.tag,
	// 		description : $scope.description,
	// 		city : $scope.city,
	// 		state : $scope.state,
	// 		country : $scope.country
	// 	};
	// 	$http.post('add.json', data).success(function(data, status, header, config) {
	// 		console.log(data);
	// 		//$location.path('companies');
	// 	}).error(function(data, status, header, config) {

	// 	});	
	// }
});