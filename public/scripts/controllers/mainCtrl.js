var rootApp = angular.module('ui-creator', ['ui.router', 'nvd3', 'properties-module']);

rootApp.controller('mainCtrl', ['$scope', '$q', '$compile', '$rootScope', function ($scope, $q, $compile, $rootScope) {
    $('#main-div').text("Jquery, Angular , UI Router, Bootstrap Libraries loaded");

    // The heart of the application is here
    //We open up the model and ask for the properties to be entered here
    $scope.openSettings = function (elem) {
        //Getting the modal and opening it explicity
        $('#properties-modal').modal();
    }

    $scope.changeLineData = function () {
        $scope.data = [{
            key: 'Test',
            values: [{
                x: 12,
                y: 10
            }, {
                    x: 13,
                    y: 3
                }, {
                    x: 14,
                    y: 16
                }]
        }];
    }
    //Chart data and config that will be binded to the ui fo the chart
    $scope.chartConfigArr = [];
    $scope.chartDataArr = [];

    //listening to the events for the chart added function
    $rootScope.$on('chartAdded', function (event, data) {
        var _chartConfigObj = data;
        var _chartOptions = createLineChart({
            xAxisLabel: _chartConfigObj.chartXAxis,
            yAxisLabel: _chartConfigObj.chartYAxis,
            chartHeight: _chartConfigObj.chartHeight,
            chartTitle: _chartConfigObj.chartTitle,
            chartSubTitle: _chartConfigObj.chartSubTitle,
            chartCaption: _chartConfigObj.chartCaption,
        });
        $scope.chartConfigArr.push(_chartOptions);

        $scope.chartDataArr.push(sinAndCos());
        //<nvd3 options="chartConfigArr[0]" data="chartDataArr[0]" class="with-3d-shadow with-transitions"></nvd3>

        var elementHTML = '<div class="col-sm-6 dashboard-elem">' +
                            '<div>'+
                                '<div class="elem-settings" ng-click="openSettings(this)">' +
                                    '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>' +
                                '</div>' +
                                '<div>'+
                                    '<nvd3 options="chartConfigArr[0]" data="chartDataArr[0]" class="with-3d-shadow with-transitions"></nvd3>'+
                                '</div>' +
                            '</div>' +
                            /*'<div class="col-sm-6 dashboard-elem">' +
                                '<div class="elem-settings" ng-click="openSettings(this)">' +
                                    '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>' +
                                '</div>' +
                                '<div>Sample content</div>' +
                            '</div>'+ */
                          '</div>';
        var elementCreated = createElement(elementHTML);
        elementCreated.then(function successCallback(successObj) {
            console.log(successObj);
            $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });

            //Now hiding the modal, after the graph has been created
            $('#properties-modal').modal('hide');

        }, function errorCallback(errorObj) {
            console.log(errorObj);
        }, function notifyCallback(notifObj) {
            console.log(notifObj);
        });
    });
    $scope.addNewRow = function () {
        $scope.openSettings(this);

        /*
        var elementHTML = '<div class="row">' +
            '<div class="col-sm-6 dashboard-elem">' +
            '<div class="elem-settings" ng-click="openSettings(this)">' +
            '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>' +
            '</div>' +
            '<div>Sample content</div>' +
            '</div>' +
            '<div class="col-sm-6 dashboard-elem">' +
            '<div class="elem-settings" ng-click="openSettings(this)">' +
            '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>' +
            '</div>' +
            '<div>Sample content</div>' +
            '</div>' +
            '</div>';
        var elementCreated = createElement(elementHTML);
        elementCreated.then(function successCallback(successObj) {
            console.log(successObj);
            $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
        }, function errorCallback(errorObj) {
            console.log(errorObj);
        }, function notifyCallback(notifObj) {
            console.log(notifObj);
        });*/
    }
    function createElement(elementText) {
        var deferred = $q.defer();

        try {
            //Notifying the start
            deferred.notify("Started the element creation");

            //Creating the sample row element
            var sampleRowEl = angular.element(elementText);

            //Compiling the element
            $compile(sampleRowEl)($scope);

            //Appending it to the container
            $('#dashboard-container').append(sampleRowEl);

            deferred.resolve("Success");

        } catch (exeption) {
            deferred.reject("Fail");
        }
        return deferred.promise;
    }

    //Testing the new method created
    $scope.options = createLineChart({
        xAxisLabel: 'Time(ms)',
        yAxisLabel: 'Voltage(V)',
        chartHeight: 300,
        chartTitle: 'Test Title',
        chartSubTitle: 'Test subtile lorem ipsum dolarset el.',
        chartCaption: 'This is a sample caption to set up the chart object for the '
    });

    $scope.data = sinAndCos();

    /*Random Data Generator */
    function sinAndCos() {
        var sin = [], sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: Math.sin(i / 10) });
            sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
            cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e',  //color - optional: choose your own line color.
                strokeWidth: 2,
                classed: 'dashed'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            },
            {
                values: sin2,
                key: 'Another sine wave',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };

    function createLineChart(options) {
        //Creating the required attributes for the chart
        var xAxisLabel = null;
        var yAxisLabel = null;
        var chartHeight = null;
        var chartTitle = null;
        var chartSubTitle = null;
        var chartCaption = null;
        //Checking the conditions for the object to create a line chart
        if (options.xAxisLabel === null || options.xAxisLabel === undefined) {
            xAxisLabel = "x-axis";
        } else {
            xAxisLabel = options.xAxisLabel;
        }
        if (options.yAxisLabel === null || options.yAxisLabel === undefined) {
            yAxisLabel = "y-axis";
        } else {
            yAxisLabel = options.yAxisLabel;
        }
        if (options.chartHeight === null || options.chartHeight === undefined) {
            chartHeight = 300;
        } else {
            chartHeight = options.chartHeight;
        }
        if (options.chartTitle === null || options.chartTitle === undefined) {
            chartTitle = '';
        } else {
            chartTitle = options.chartTitle;
        }
        if (options.chartSubTitle === null || options.chartSubTitle === undefined) {
            chartSubTitle = '';
        } else {
            chartSubTitle = options.chartSubTitle;
        }
        if (options.chartCaption === null || options.chartCaption === undefined) {
            chartCaption = '';
        } else {
            chartCaption = options.chartCaption;
        }
        var _chartObj = {
            type: 'lineChart',
            height: chartHeight,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function (d) { return d.x; },
            y: function (d) { return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function (e) { console.log("stateChange"); },
                changeState: function (e) { console.log("changeState"); },
                tooltipShow: function (e) { console.log("tooltipShow"); },
                tooltipHide: function (e) { console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: xAxisLabel
            },
            yAxis: {
                axisLabel: yAxisLabel,
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        };
        var _title = {
            enable: chartTitle == '' ? false : true,
            text: chartTitle
        };
        var _subtitle = {
            enable: chartSubTitle == '' ? false : true,
            text: chartSubTitle,
        };
        var _caption = {
            enable: chartCaption == '' ? false : true,
            text: chartCaption,
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        };

        return {
            chart: _chartObj,
            title: _title,
            subtitle: _subtitle,
            caption: _caption
        };
    }
}]);
/*$scope.options = {
    chart: {
        type: 'lineChart',
        height: 450,
        margin: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 55
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
            stateChange: function (e) { console.log("stateChange"); },
            changeState: function (e) { console.log("changeState"); },
            tooltipShow: function (e) { console.log("tooltipShow"); },
            tooltipHide: function (e) { console.log("tooltipHide"); }
        },
        xAxis: {
            axisLabel: 'Time (ms)'
        },
        yAxis: {
            axisLabel: 'Voltage (v)',
            tickFormat: function (d) {
                return d3.format('.02f')(d);
            },
            axisLabelDistance: -10
        },
        callback: function (chart) {
            console.log("!!! lineChart callback !!!");
        }
    },
    title: {
        enable: true,
        text: 'Title for Line Chart'
    },
    subtitle: {
        enable: true,
        text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        css: {
            'text-align': 'center',
            'margin': '10px 13px 0px 7px'
        }
    },
    caption: {
        enable: true,
        html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        css: {
            'text-align': 'justify',
            'margin': '10px 13px 0px 7px'
        }
    }
};*/