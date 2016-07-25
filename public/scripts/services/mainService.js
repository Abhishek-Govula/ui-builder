var rootApp = angular.module('ui-creator');

rootApp.service('mainService', [function () {
    var _dataArr = null;
    var _configArr = null;

    this.setDataArray = function (dataArr) {
        _dataArr = dataArr;
    }
    this.getDataArray = function () {
        return _dataArr;
    }
    this.setConfigArray = function (configArr) {
        _configArr = configArr;
    }
    this.getConfigArr = function () {
        return _configArr;
    }
    this.addNewDataObj = function (dataObj) {
        if (_dataArr === null) {
            _dataArr = [];
        }
        _dataArr.push(dataObj);
    }
    this.addNewConfigObj = function (configObj) {
        if (_configArr === null) {
            _configArr = [];
        }
        _configArr.push(configObj);
    }
    this.getRecentConfigObj = function () {
        //Returning the latest value from the chart
        if (_configArr !== null) {
            return _configArr[(_configArr.length) - 1];
        } else {
            return null;
        }
    }
    this.getRecentDataObj = function () {
        //Returning the latest value from the chart
        if (_dataArr !== null) {
            return _dataArr[(_dataArr.length) - 1];
        } else {
            return null;
        }
    }
}]);