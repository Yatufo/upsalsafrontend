'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsDetailsCtrl', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.event = {};

            $http.get(CONFIG.EVENTS_ENDPOINT + '/' + $routeParams.eventId).
            success(function(data, status, headers, config) {
                $scope.event = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong");
            });

            MapsService.init();


        }
    ]);
