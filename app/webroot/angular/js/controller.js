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


myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, input, uploadUrl){
        
        var data = new FormData();

        data.append('UploadedFile', file);

        for (var key in input) {        	
        	data.append(key, input[key]);
        }

        $http.post(uploadUrl, data, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

myApp.controller('company', function($http, $scope, $location, $routeParams, $route, $resource, CONFIG, fileUpload) {

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

	$scope.setFile = function(element) {
		//readUrl(element);
		$scope.$apply(function($scope) {	
			$scope.file = element.files[0];
		})
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

		var uploadUrl = CONFIG.apiUrl + "companies/add";
        var file = $scope.myFile;
        
        fileUpload.uploadFileToUrl(file, data, uploadUrl);
		
		// $http.post(url, data)
		// 	.success(function(data, status, header, config) {			
		// 	$location.path('/');
		// }).error(function(data, status, header, config) {

		// });	
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
		
});
