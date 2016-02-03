/**
 * Created by qmarcelle on 2/3/2016.
 */
angular.module('elemica-webapp')
  .controller('LoginCtrl',[ '$scope','$location','$http','Auth','$log','session','$rootScope', function($scope, $location, $http,Auth,$log,session,$rootScope) {

    $scope.user = {};
    $scope.errors = {};


    $scope.login = function(form){
      $scope.submitted = true;

      //if there are no errors call auth to login
      if(form.$valid){
        Auth.logIn({
            username: $scope.user.username,
            password: $scope.user.password

          })
          .then(function(){
            // logged in, redirect to supply chain overview
            $rootScope.username = $scope.user.username;
            $location.path('/main_page')
          })
          .catch(function(err){
            $scope.errors.other = err.message;
          })
      }
    };

    //function to switch the language
    $scope.switchLanguage = function() {
      $translate.use($scope.selectItem);
    };

    $scope.languages = ['English', 'German', 'Chinese'];
    $scope.selectItem='English';
    $scope.privacy= 'https://network.elemica.com/static/documents/Privacy-Policy-Services.pdf';

  }]);
