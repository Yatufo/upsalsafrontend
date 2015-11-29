var EditableEventCardController = function($scope, service, CONFIG) {

    $scope.pickerOptions = {
      minView: 'minutes',
      dropdownSelector: '#startDateSelector'
    }

    function toLocation(location) {
      return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates')
    }

    function init(argument) {
      var start = moment().startOf('hour').add(1, 'hours');
      var end = new moment(start).add(1, 'hours');

      $scope.event = {
        location : toLocation($scope.location),
        categories: [],
        images : [],
        detailsUrl: CONFIG.EVENT_DEFAULT_IMAGE,
        start: {
          dateTime: start.toDate()
        },
        end: {
          dateTime: end.toDate()
        }
      };
    };

    $scope.save =  function() {
      service.saveOrUpdate($scope.event)
        .then(function(saved) {
          $scope.onSave({event : saved});
        });
    }

    $scope.cancel = function () {
      $scope.onCancel();
    }
    $scope.getDuration = function() {
      return moment($scope.event.end.dateTime).diff($scope.event.start.dateTime, 'hours');
    }

    init();
  }
  /* App Module */

eventify.directive('editableeventcard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      location: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', 'EventService', 'CONFIG', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
