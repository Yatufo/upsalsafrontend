var EditableLocationCardController = function($scope, $rootScope, service, categoryService, CONFIG, util) {

  $scope.submitted = false;
  $scope.smartarea = {
    description: {
      autocomplete: []
    }
  };

  categoryService.getCategories().then(function(categories) {
    $scope.smartarea.description.autocomplete = [{
      words: categoryService.getHashTags(categories),
      cssClass: 'hashtags'
    }]
  });


  function init() {
    if ($scope.location) return;

    $scope.location = {
      description: "#school",
      categories: [],
      images: [],
      imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
    };
  };


  $scope.canSave = function() {
    return $scope.locationForm.$valid;
  }

  $scope.isInvalid = function (field) {
      return $scope.submitted && !$scope.locationForm[field].$valid;
  }

  $scope.save = function() {
    $scope.submitted = true;
    if ($scope.canSave()) {
      service.saveOrUpdate($scope.location)
        .then(function(saved) {
          saved.detailsUrl = util.getDetailsUrl(saved, "location");
          $scope.$emit('locationSaved', saved);
        });
    }else {
      console.debug($scope.locationForm);
    }
  }

  $scope.cancel = function() {
    $scope.$emit('locationCancelled');
  }


  $scope.delete = function() {
    if (confirm("Are you sure to remove this location?")) {
      $scope.location.$remove(function(e) {
        alert("The location: " + $scope.location.name + " has been deleted");
      });
    };
  }

  init();
}


eventify.directive('editablelocationcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', '$rootScope', 'LocationService', 'CategoryService', 'CONFIG', 'UtilService', EditableLocationCardController],
    templateUrl: 'views/components/editable-location-card.html'
  };
});
