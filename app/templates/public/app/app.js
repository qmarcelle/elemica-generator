/**
 * Created by qmarcelle on 2/3/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('elemica-webapp', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngMaterial',
    'md.data.table',
    'uiGmapgoogle-maps'

  ])
  //authentication
  .service("authInterceptor", function($q, $location) {
    var service = this;
    service.request = function(config) {
      var access_token = localStorage.auth_token ? localStorage.auth_token.replace(/"/g,'') : null;
      /*remove leading quotes and ending quotes from auth token*/

      config.headers = config.headers || {};
      if (access_token) {
        config.headers['X-AUTH-TOKEN'] = access_token;
      }
      return config;
    };
    service.response = function(res) {
      //check for errors
      if(res.status === 401){
        //redirect to login
        $location.path('/login');
        //remove any stale tokens
        window.localStorage.removeItem('auth_token');
        return $q.reject(res);
      }
      else if(res.status === 500){
        //redirect to login
        $location.path('/login');
        //remove any stale tokens
        window.localStorage.removeItem('auth_token');
        return $q.reject(res);
      }
      else{
        return res;
      }
    }
  })


  .config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider,$mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    //angular.extend(DSProvider.defaults, {});
    //angular.extend(DSHttpAdapterProvider.defaults, {});

    //themeing

    $mdThemingProvider.definePalette('elemicaColorPalette',{
        '50': '#E0EFFA',
        '100': '#9FCEEF',
        '200': '#2CA7E5',
        '300': '#007BB4', //default blue
        '400': '#CCA528',//accent - warn
        '500': '#D11F2F',//accent - error
        '600': '#149B66',//accent - success
        '700': '#4C4C4C',
        '800': '#A0A0A0',
        '900': '#CBCCCC',
        'A100': '#393939',
        'A200': '#5D5D5D',
        'A400': '#108BC6',
        'A700': '#006A9B',
        'contrastDefaultColor': 'light',

        'contrastDarkColors': ['50','100','200','300','400','A100'],
        'contrastLightColors': undefined
      },
      $httpProvider.interceptors.push('authInterceptor')
    );


    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('indigo');

  })


  //app run state
  .run(function($rootScope, $location, Auth, $state, $injector, session, $http, $window, user){
    //redirect to login if auth token is not valid
    $rootScope.auth = Auth;

    $rootScope.$state = $state;

    if(session.getAccessToken){
      $rootScope.auth_token = session.getAccessToken();
    }

    user.getData(function(data){

      $rootScope.username = data.username;
//if the current user call can be made then return the current user to the main page
      $state.go('mainPage');
      //if there is an error redirect to login
    },function(e){
      $state.go('login');
    });
  });




