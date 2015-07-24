'use strict';

var eventify = angular.module('eventify');



var TokenConfig = function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
}


eventify.config(["authProvider", "$routeProvider", "$httpProvider", "jwtInterceptorProvider", TokenConfig]);

var TokenValidation = function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    console.log(token);

    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show Login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
}

eventify.run(["$rootScope","auth","store","jwtHelper","$location", TokenValidation]);
