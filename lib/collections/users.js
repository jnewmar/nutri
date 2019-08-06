//Users2 = new Mongo.Collection('users');


Meteor.methods({
  criaPaciente: function(paciente){
    return Accounts.createUser(paciente);
  },
  
  criaNutricionista: function(nutri){
	id_nutri= Accounts.createUser(nutri);
	if(id_nutri){  
		add_role=Roles.addUsersToRoles(id_nutri, ["nutri"]);  
	  	return id_nutri;
	}	
  }  
  
});