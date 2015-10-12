angular.module("pets").controller("AddPetCtrl", ['$meteor', '$state','$rootScope',
  function ($meteor, $state,$rootScope) {
  	this.currentUser= $rootScope.currentUser;

  	var pm = this;
 
    pm.credentials = {
      profile : {
        name : '',
        dateOfBirth: '',
        type:'',
        profilePhoto :'',
        about:''
      }
    };
 
    pm.error = '';
    pm.create = function () {
      pm.credentials.owner = $rootScope.currentUser._id;
      pm.credentials.family = $rootScope.currentUser.profile.family;
      pm.credentials.profile.photos = [
        {
          src : pm.credentials.profile.profilePhoto,
          id : Math.random().toString(36).substr(2, 9),
          comments : []
        }
      ];
      pm.credentials.profile.rates = [];
      Pets.insert(pm.credentials, function(error, petId){
        $state.transitionTo("petProfile", { petId: petId });
      });
    };
    
  }
]);