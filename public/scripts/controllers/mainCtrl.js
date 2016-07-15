var rootApp = angular.module('ui-creator', ['ui.router']);

rootApp.controller('mainCtrl', ['$scope', function($scope){
    $('#main-div').text("Jquery, Angular , UI Router, Bootstrap Libraries loaded");    
}]);