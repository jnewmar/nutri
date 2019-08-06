Meteor.publish('alimentos', function(options) {
  return Alimentos.find({}, options);
});

Meteor.publish('dieta', function(id) {
  return Dieta.find({});
});

Meteor.publish("userDieta", function () {
  if (this.userId) {
    return Dieta.find({id_paciente: this.userId} );
  } else {
    this.ready();
  }
});	

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
	{
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
			
	});
  } else {
    this.ready();
  }
});	



Meteor.publish("listaPacientes", function() {
		
    var user = Meteor.users.findOne({
        _id: this.userId
    });


    if (Roles.userIsInRole(user, ["nutri"])) {
        return Meteor.users.find({ "profile.id_nutricionista" : this.userId  }, {
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
    }

    this.stop();
    return;
});


Meteor.publish("listaUsuarios", function() {

    var user = Meteor.users.findOne({
        _id: this.userId
    });


    if (Roles.userIsInRole(user, ["admin","nutri"])) {
        return Meteor.users.find({}, {
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
    }

    this.stop();
    return;
});


SearchSource.defineSource('alimentos', function(searchText, options) {
  var options = {sort: {data_cadastro: -1}, limit: 20};
 //console.log(" st "+searchText);
  if(searchText!="" && searchText!="*" ) {
    var regExp = buildRegExp(searchText);
    var selector = {descricao: regExp};
    
    return Alimentos.find(selector, options).fetch();
  } else {
    return Alimentos.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[\-\:]+/);
  console.log("conso "+parts);
  console.log("reg "+"(" + parts.join('|') + ")");
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
