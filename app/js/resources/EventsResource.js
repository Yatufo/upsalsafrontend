

/* Service */

eventify.factory('EventsResource', ['$resource', function($resource) {
  return $resource('/api/events/:id', {
    'id': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
