angular.module("pets").controller("ShopCtrl", ['$scope', '$meteor', '$state','$rootScope', '$stateParams',
  function ($scope, $meteor, $state, $rootScope, $stateParams) {
    var sc = this;

    sc.petsForSale = $meteor.collection(function(){
      return Pets.find({forSale : true});
    });

    sc.navigateToPet = function(petId){
      $state.transitionTo("petProfile", { petId: petId });
    }
  }
]);