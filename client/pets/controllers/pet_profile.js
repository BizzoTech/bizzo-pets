angular.module("pets").controller("PetProfileCtrl", ['$scope', '$meteor', '$state','$rootScope', '$stateParams',
  function ($scope, $meteor, $state, $rootScope, $stateParams) {
  	var self = this;
  	self.pet = $meteor.object(Pets, $stateParams.petId);
  	$rootScope.pet = self.pet;

    self.isOwner = function(){
      return self.pet.owner == $rootScope.currentUser._id;
    }
    self.isFamilyMember = function(){
      return self.pet.famiy = $rootScope.currentUser.profile.family;
    }


  	self.image = {
  		src : ''
  	},

  	self.addImage = function(){
  		self.pet.profile.photos.push({
  			src : self.image.src,
  			comments : [],
  			id : Math.random().toString(36).substr(2, 9)
  		});
  		self.pet.save();

  		self.image.src = "";
  	}

  	var rate = false;

  	self.pet.profile.rates.forEach(function(r){
  		if(r.userId == $rootScope.currentUser._id){
  			rate = r;
  			$scope.userRate = r.score;
  		}
  	})

  	
  	$scope.$watch('userRate', function(newValue, oldValue) {
  	  if (newValue !== null && newValue !== undefined) {
        if(rate){
        	rate.score = newValue;
        }else{
        	rate = {
        		userId : $rootScope.currentUser._id,
        		score : newValue
        	}
        	self.pet.profile.rates.push(rate);
        }
        self.pet.save().then(function(){
        	self.pet.profile.rates.forEach(function(r){
			  		if(r.userId == $rootScope.currentUser._id){
			  			rate = r;
			  			
			  		}
			  	})
        })
        
      }
    });

    
  }
]);