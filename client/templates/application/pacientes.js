
Template.pacientes.helpers({
  lista: function() {
	  
	  pac=Roles.getUsersInRole(undefined).fetch();
	//  console.log("id_nutricionista  "+Meteor.userId);
	  console.log(" pac "+JSON.stringify(pac));
	//  console.log('{"profile.id_nutricionista" :'+Meteor.userId()+' }');
	//return Users.find().fetch();//Users.find({"profile.id_nutricionista" : Meteor.userId() });
	
	var retObj =[];
	var c=0;
	
	pac.forEach( function (element, index, array) {
		//console.log(JSON.stringify(element)+" "+index+" "+JSON.stringify(array));
		if(element.profile != undefined){
			console.log(index+" ID NUT "+element.profile.id_nutricionista+" U "+Meteor.userId());
			if (element.profile.id_nutricionista == Meteor.userId()) { 

				retObj[c] = element;
				c++;            
			}
		}
    });
	
	console.log(" retObj "+JSON.stringify(retObj));
	return retObj;
	
    //return Roles.getUsersInRole(undefined).find({"profile.id_nutricionista" : Meteor.userId() });
  }
});