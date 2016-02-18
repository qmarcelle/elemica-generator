/**
 * Created by qmarcelle on 2/3/2016.
 */
'use strict';

angular.module('elemica-webapp')
  .config( function($stateProvider) {
    $stateProvider
      .state('login', {
        url:'/login/:bup',
        templateUrl: '/public/app/account/login/login.html',
        controller: 'LoginCtrl'
      })
  });
