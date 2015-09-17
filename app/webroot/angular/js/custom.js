'use strict';


var myApp = angular.module('grm', ['ng', 'ngRoute', 'ngResource']);

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
		})
		.when("/edit/:cid", {
			controller:"companyedit",
			templateUrl:"views/companies/edit.html",
		})
		.otherwise({ redirectTo:'/' });

	// Removes the # in urls
    $locationProvider.html5Mode({enabled:true,requireBase:false});
});


myApp.controller('company', function($http, $scope, $location, $route) {

	var url = "http://localhost/grm/companies/";
	
	$http.get(url).success(function(response) {
		$scope.result = response;
		$scope.jitz = "jitendra";
	});

	$scope.deleteData = function(cId) {
		var durl = "http://localhost/grm/companies/delete/"+cId;
		
		//var Company = $resource('/companies/users/:id', { id: cId });    

		$http.delete(durl).success(function(response) {
			 $http.get(url).success(function(response) {
				$scope.result = response;
				$scope.jitz = "jitendra";
			});

		});
	}

	// $scope.editData = function(cId) {
	// 	var eurl = "http://localhost/grm/companies/delete/"+cId;
		
	// 	//var Company = $resource('/companies/users/:id', { id: cId });    

	// 	$http.put(eurl).success(function(response) {
	// 		 $http.get(url).success(function(response) {
	// 			$scope.result = response;
	// 			$scope.jitz = "jitendra";
	// 		});

	// 	});
	// }
	
});

myApp.controller('companyadd', function($scope, $http, $location, $resource) {
	
	
	// var url = "http://localhost/grm/companies/";

	$scope.submitForm = function() {
		var data = {
			name : $scope.name,
			tag : $scope.tag,
			description : $scope.description,
			city : $scope.city,
			state : $scope.state,
			country : $scope.country,
			pincode : $scope.pincode
		};
		$http.post('http://localhost/grm/companies/add', data)
			.success(function(data, status, header, config) {
			console.log(data);
			$location.path('/');
		}).error(function(data, status, header, config) {

		});	
	}


});


myApp.controller('companyedit', function($scope, $http, $location, $routeParams, $resource) {
	//alert("sdfdsf");
	// var paramValue = $location.search().cid; 
	 var cId = $routeParams.cid;
	 console.log(cId);
    
    if (cId) {
        var Company = $resource('http://localhost/grm/companies/edit/'+cId);
        
        // Get User from API
        $scope.company = Company.get();
    } 

	// var url = "http://localhost/grm/companies/";

	$scope.submitEditForm = function() {
		var data = {
			id : $scope.company.id,
			name : $scope.company.name,
			tag : $scope.company.tag,
			description : $scope.company.description,
			city : $scope.company.city,
			state : $scope.company.state,
			country : $scope.company.country,
			pincode : $scope.company.pincode
		};
		$http.post('http://localhost/grm/companies/edit/'+cId, data)
			.success(function(data, status, header, config) {
			console.log(data);
			$location.path('/');
		}).error(function(data, status, header, config) {

		});	
	}


});