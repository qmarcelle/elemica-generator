/**
 * Created by qmarcelle on 2/3/2016.
 */
'use strict';

angular.module('elemica-webapp')
  .config(function($stateProvider){
    $stateProvider
      .state('mainPage', {
        url:'/main_page',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true
      })
  })
  .controller('MainCtrl',function($scope,$timeout,$log) {


    $scope.toggleSideNav = buildToggler('right');
    $scope.toggleDispOpt = buildDelayedToggler('left');
    $scope.isOpenDispOpt = function(){
      return $mdSidenav('left').isOpen();
    };


    $scope.showListBottomSheet = function($event) {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'app/supply-chain-overview/components/bottomsheet/shipment-list.html',
        controller: 'ShipListCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        /* $scope.alert = clickedItem['name'] + ' clicked!';*/
      });
    };


    function debounce(func, wait, context){
      var timer;
      return function debounced(){
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function(){
          timer = undefined;
          func.apply(context,args);
        },wait||10);
      };
    }


    /*toggler functions*/

    function buildToggler(navID){
      //$mdSidenav(navID).then(function(sidenav){
      return function(){
        $mdSidenav(navID)
          .toggle()
          .then(function(){
            $log.debug("toggle" + navID + " is done");
          });
        //}
      }
    }

    function buildDelayedToggler(navID){
      return debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function(){
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
  });
