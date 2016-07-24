var propertiesModule = angular.module('properties-module', []);

propertiesModule.controller('propertiesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //Data initialization
    $scope.chartConfig = {
        chartTitle: "Sample Title",
        chartHeight: 200,
        chartXAxis: "Sample X",
        chartYAxis: "Sample Y",
        chartSubTitle: "Subtitle",
        chartCaption: "Sample Caption",
    }
    /*$scope.chartTitle = "Sample Title";
    $scope.chartHeight = 200;
    $scope.chartXAxis = "Sample X";
    $scope.chartYAxis = "Sample Y";
    $scope.chartSubTitle = "Subtitle";
    $scope.chartCaption = "Sample Caption";*/

    $scope.data = {
        availableGraphs: [
            { id: '1', name: 'Line' },
            { id: '2', name: 'Bar' },
            { id: '3', name: 'Pie' }
        ],
        selectedOption: null //Will be using this later for getting the type of graph selected`
    };
    $scope.data.selectedOption = $scope.data.availableGraphs[0]; //This sets the default value of the select in the ui

    $scope.graphOptionChanged = function (elem) {
        console.log("Graph select box has been changed");
    }

    $scope.saveChanges = function () {
        $rootScope.$emit('chartAdded', $scope.chartConfig);
        //console.log("Event emitted");
    }
}]);