var myApp = angular.module('grm', ['ngRoute']);

myApp.config(function($locationProvider, $routeProvider) {
	
	$routeProvider
		.when("/", {
			controller:"company",
			templateUrl:"views/companies/list.html",
			title:"Company"
		})
		.when("/add", {
			controller:"companyadd",
			templateUrl:"views/companies/add.html",
		});

	// Removes the # in urls
    $locationProvider.html5Mode({enabled:true,requireBase:false});
});


myApp.controller('company', function($http, $scope, $location) {

	var url = "http://localhost/grm/companies/";
	
	$http.get(url).success(function(response) {
		$scope.result = response;
		$scope.jitz = "jitendra";
	})
	
});

myApp.controller('companyadd', function($scope, $http, $location) {
	
	// var url = "http://localhost/grm/companies/";

	$scope.submitForm = function() {
		var data = {
			name : $scope.name,
			tag : $scope.tag,
			description : $scope.description,
			city : $scope.city,
			state : $scope.state,
			country : $scope.country
		};
		$http.post('http://localhost/grm/companies/add', data)
			.success(function(data, status, header, config) {
			console.log(data);
			$location.path('/');
		}).error(function(data, status, header, config) {

		});	
	}
});