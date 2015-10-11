Pets = new Mongo.Collection('pets');

Pets.helpers({
  rateAVG: function() {
    var total = 0;
	this.profile.rates.forEach(function(r){
		total += r.score;
  	});
  	return total / this.profile.rates.length ;
  },
  zipCode : function(){
  	return Families.findOne(this.family).zipCode;
  }
});

