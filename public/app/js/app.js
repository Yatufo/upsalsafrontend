'use strict';

/* App Module */

var myApp = angular.module('myApp', [
    'ngRoute',
    'myAppControllers',
    'myAppFilters',
    'myAppConfig',
    'myAppServices',
    'ui.bootstrap'
]);

angular.module('myAppControllers', ['myAppConfig', 'myAppServices']);
angular.module('myAppFilters', ['myAppConfig']);
angular.module('myAppServices', ['myAppConfig']);

myApp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/city/:city/events', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).
        otherwise({
            redirectTo: '/city/montreal/events'
        });
    }
]);