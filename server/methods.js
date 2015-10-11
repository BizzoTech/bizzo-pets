Meteor.startup(function(){
	Meteor.methods({
	  joinFamily : function(user_id, family_id){
	  	//var user = Meteor.users.findOne(user_id);
	  	Meteor.users.update(user_id, {$set : {'profile.family' : family_id}});
	  },
	  removeFromFamily : function(user_id){
	  	//var user = Meteor.users.findOne(user_id);
	  	Meteor.users.update(user_id, {$set : {'profile.family' : false}});
	  },
	  calcDistance : function(origin, destination){
	  	console.log(destination);
	  	var response = HTTP.get('http://maps.googleapis.com/maps/api/distancematrix/json', {
	      params: {
	        origins: origin,
	        destinations : destination
	      }
	    });
	    return response.data.rows[0].elements[0].distance;
	  }
	});
})