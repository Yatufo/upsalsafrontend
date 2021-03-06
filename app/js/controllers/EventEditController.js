

/* Controllers */

eventify
    .controller('EventEditController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService', '$location',
        function($scope, $routeParams, Event, maps, util, $location) {

          Event.get({
            id: util.stripIdFromURI($routeParams.eventId)
          }, function(event) {

            maps.init(event.location, 14);
            maps.addLocation(event.location);

            _.extend(event, util.getUrls(event, "event"))
            event.end.dateTime = moment(event.end.dateTime).toDate();
            event.start.dateTime = moment(event.start.dateTime).toDate();

            $scope.event = event;

          });

          $scope.$on('eventSaved', function(e, event) {
            $location.path(util.getDetailsPath($scope.event, "event"))
          });

          $scope.$on('eventCancelled', function() {
            $location.path(util.getDetailsPath($scope.event, "event"))
          });

        }
    ]);
