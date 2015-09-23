'use strict';

var myApp = angular.module('grm', ['ngRoute', 'ngResource']);

myApp.constant('CONFIG', {
	apiUrl : "http://localhost/grm/"
});

myApp.config(function($locationProvider, $routeProvider) {
	
	$routeProvider
		.when("/", {
			controller:"company",
			templateUrl:"views/companies/list.html",
			title:"Company"
		})
		.when("/add", {
			controller:"company",
			templateUrl:"views/companies/add.html",
		})
		.when("/edit/:cid", {
			controller:"company",
			templateUrl:"views/companies/edit.html",
		})
		.otherwise({ redirectTo:'/' });

	// Removes the # in urls
    $locationProvider.html5Mode({enabled:true,requireBase:false});
});
