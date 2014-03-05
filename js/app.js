'use strict';

var k97App = angular.module('k97App', ['ngRoute', 'angular-carousel','angularShamSpinner']);
k97App.config(function ($routeProvider, $locationProvider) {
$locationProvider.html5Mode(false);
$routeProvider
    .when('/home', 
        {   
            templateUrl: 'template/home.html',
            controller: "HomeCtrl"
        })
    .when('/about', 
        {
            templateUrl: 'template/about.html',
            controller: "AbtCtrl"
        })
    .when('/work', 
        {
            templateUrl: 'template/work.html',
            controller: "ListPortfolio"
        })
    .when('/project/:id',
        {
            templateUrl: 'template/detail.html',
            controller: "DetailWorkInfo"
        })
    .when('/blog',
        {
            templateUrl: 'blog/blog.html',
            controller: "BlogCtrl"
        })
    .otherwise( {redirectTo: '/home'});

}).factory('PageBG', function($rootScope){
            var showFxBG = "show";
            return {
                action:function(){
                    return showFxBG;
                },
                setBg:function(newPageBG){
                    showFxBG = newPageBG;
                }
            }
}).factory ('WorkInfo', function($http) {
   return {
        PRThumbs: function(callback) {
           $http.get('js/portfolioData.json').success(callback);
        }
   }
});


// Controllers 

function MainCtrl($scope, PageBG, WorkInfo) {
    $scope.fxBg= PageBG;
    WorkInfo.PRThumbs(function(data) {
        localStorage.setItem('prKey',JSON.stringify(data));
    });
}

function HomeCtrl($scope, PageBG) {
    PageBG.setBg("show");
}

function AbtCtrl($scope, PageBG) {
    PageBG.setBg("hide");
}

function ListPortfolio($scope, PageBG, WorkInfo, $routeParams) {
    PageBG.setBg("hide");
    if(localStorage.getItem('prKey')!=null){
        var data = eval(localStorage.getItem('prKey')); 

    }
    else{
        WorkInfo.PRThumbs(function(data) {
            localStorage.setItem('prKey',JSON.stringify(data));
        });
    }
    
    $scope.projects = data;

    
/*
    //Background Color Change
    $scope.hoverIn = function(e) {
    angular.element(e.srcElement).removeClass('tileBG')
    }
    $scope.hoverOut = function(e) {
    angular.element(e.srcElement).addClass('tileBG')
    }
*/
}

function DetailWorkInfo($scope, PageBG, WorkInfo, $routeParams) {
    PageBG.setBg("hide");
    $scope.searchToggle = true;
    $scope.currentSlide = 1;
    
    var id = $scope.id = $routeParams.id;
    if(localStorage.getItem('prKey')!=null){
        var data = eval(localStorage.getItem('prKey'));    
    }
    else{
        WorkInfo.PRThumbs(function(data) {
            localStorage.setItem('prKey',JSON.stringify(data));
        });
    }
    $scope.project = data[id];
    return data[id];
    
	//var id = $scope.prID = $routeParams.prID;
	//$scope.project = WorkInfo.get(id);
	//$scope.project = WorkInfo.get(projectID);
}//DetailWorkInfo



function BlogCtrl($scope, PageBG) {
    PageBG.setBg("hide");
}




