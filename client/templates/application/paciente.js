
Template.pacientes.helpers({
  lista: function() {
	  //console.log('{"profile.id_nutricionista" :'+Meteor.userId()+' }');
	  return Meteor.users.find({"profile.id_nutricionista" : Meteor.userId()}).fetch();//Users.find({"profile.id_nutricionista" : Meteor.userId() });
    //return Roles.getUsersInRole(undefined);
  }
});