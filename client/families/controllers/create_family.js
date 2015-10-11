angular.module("pets").controller("FamilyCreateCtrl", ['$meteor', '$state', "$rootScope",
  function ($meteor, $state, $rootScope) {
    var self = this;
    self.family = {
      name : "",
      admin : $rootScope.currentUser._id,
    }
    
    self.create = function () {
      Families.insert(self.family, function(error, familyId){
        var user = $meteor.object(Meteor.users, self.family.admin);
        user.profile.family = familyId;
        user.save().then(function(){
          $state.go('home');
        });
        
      });
    };
  }
]);