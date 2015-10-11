angular.module("pets").controller("PetImageCtrl", ['$meteor', '$state','$rootScope', '$stateParams',
  function ($meteor, $state, $rootScope, $stateParams) {
  	var self = this;
  	self.pet = $meteor.object(Pets, $stateParams.petId);

  	self.pet.profile.photos.forEach(function(image){
  		if(image.id == $stateParams.imageId){
  			self.image = image;
  		}
  	});

  	self.comment = {
  		text : '',
  	}

  	self.comment = function(){
  		self.image.comments.push({
  			text : self.comment.text,
  			userName : $rootScope.currentUser.profile.name,
  			id : Math.random().toString(36).substr(2, 9)
  		});
  		self.pet.save();

  		self.comment.text = "";


  	}

  }
]);