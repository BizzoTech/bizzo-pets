angular.module("pets").controller("FamilyViewCtrl", ['$meteor', '$state', "$rootScope",
  function ($meteor, $state, $rootScope) {
    var self = this;
    self.currentUser = $rootScope.currentUser;
    self.family = $meteor.object(Families, self.currentUser.profile.family)
    var members = $meteor.collection(function(){
      return Meteor.users.find({'profile.family' : self.currentUser.profile.family});
    });
    self.members = members

    self.isAdmin = function(){
      return self.currentUser._id == self.family.admin;
    }
    self.canRemove = function(user_id){
      return self.isAdmin() && self.currentUser._id != user_id;
    }

    self.member = {
      email : ''
    }
    self.add = function(){
      if(self.member.email == undefined){
        return;
      }
      var userToAdd = $meteor.object(Meteor.users, {'profile.email' : self.member.email});
      if(!userToAdd.profile){
        self.error = "No user with email : " + self.member.email;
        return;
      }
      if(userToAdd.profile.family){
        self.error = userToAdd.profile.name + " is a family member";
      }else {
        
        Meteor.call('joinFamily', userToAdd._id, self.family._id);
      }
      
    }

    self.remove = function(user_id){
      if(self.family.admin != user_id)
        Meteor.call('removeFromFamily', user_id);
    }

    self.pets = $meteor.collection(function(){
      return Pets.find({family : self.family._id});
    });

  }
]);