angular.module("pets").controller("ProfileCtrl", ['$meteor', '$state','$rootScope',
  function ($meteor, $state,$rootScope) {
  	this.currentUser= $rootScope.currentUser;
  	this.userPets = $meteor.collection(function(){
  		return Pets.find({owner : $rootScope.currentUser._id});
  	});

  	this.familyPets = $meteor.collection(function(){
  		return Pets.find({family : $rootScope.currentUser.profile.family});
  	});

    
  }
]);