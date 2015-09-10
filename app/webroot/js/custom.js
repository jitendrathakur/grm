var myApp = angular.module('grm', []);


myApp.controller('company', function($scope, $http) {
	$scope.submitForm = function() {
		var data = {
			name : $scope.name,
			tag : $scope.tag,
			description : $scope.description,
			city : $scope.city,
			state : $scope.state,
			country : $scope.country
		};
		$http.post('add.json', data).success(function(data, status, header, config) {
			console.log(data);
			//$location.path('companies');
		}).error(function(data, status, header, config) {

		});	
	}
});