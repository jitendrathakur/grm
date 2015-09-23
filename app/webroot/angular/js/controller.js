'use strict';

myApp.directive('company', function() {
	var directive = {};

	directive.restrict = 'E';

	directive.template = "Company {{company.name}}";

	directive.scope = {
		company : "=name"
	}

	directive.compile = function(element, attributes) {
		element.css("border", "1px solid #ccc");

		var linkFunction = function($scope, element, attributes) {
			element.html("Company: <b>"+$scope.company.name);
			element.css("background-color", "#ff00ff");
		}
		return linkFunction;
	}

	return directive;
});



myApp.controller('company', function($http, $scope, $location, $routeParams, $route, $resource, CONFIG) {

	$scope.Grm = {};

	$scope.Grm.name = "Jitendra Thakur";

	var cId = $routeParams.cid;	
    
    if (cId) {
    	var url = CONFIG.apiUrl + "companies/edit/" + cId;
        var Company = $resource(url);      
        $scope.company = Company.get();
    } else {
    	var url = CONFIG.apiUrl+"companies/";
    	$http.get(url).success(function(response) {
			$scope.result = response;	
		});
    }

	$scope.deleteData = function(cId) {

		var durl = CONFIG.apiUrl+"companies/delete/"+cId;
		
		$http.delete(durl).success(function(response) {
			 $http.get(url).success(function(response) {
				$scope.result = response;			
			});

		});
	}

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
		var url = CONFIG.apiUrl + "companies/add";
		$http.post(url, data)
			.success(function(data, status, header, config) {			
			$location.path('/');
		}).error(function(data, status, header, config) {

		});	
	}

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
		var url = CONFIG.apiUrl + "companies/edit/" + cId;
		$http.post(url, data)
			.success(function(data, status, header, config) {		
			$location.path('/');
		}).error(function(data, status, header, config) {

		});	
	}

	var url = CONFIG.apiUrl + "companies/add";
	$scope.uploadFile = function(files) {
		//alert("test");
		console.log(files);
		var fd = new FormData();
		//Take the first selected file
		fd.append("file", files[0]);

		$http.post(url, fd, {
			withCredentials : true,
			headers : {'Content-type' : 'undefined'},
			transformRequest : angular.identity
		}).success("ok")
		.error("damn!");
	}
	
});
