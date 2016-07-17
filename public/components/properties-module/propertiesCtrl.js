var propertiesModule = angular.module('properties-module', []);

propertiesModule.controller('propertiesCtrl', ['$scope', function ($scope) {
    $scope.data = {
        availableGraphs: [
        {id: '1', name: 'Line'},
        {id: '2', name: 'Bar'},
        {id: '3', name: 'Pie'}
        ],
        selectedOption: null //Will be using this later for getting the type of graph selected`
    };
    $scope.data.selectedOption = $scope.data.availableGraphs[0]; //This sets the default value of the select in the ui

    $scope.graphOptionChanged = function(elem) {
        console.log("Graph select box has been changed");
    }
}]);