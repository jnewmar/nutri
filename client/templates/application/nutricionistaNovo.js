Template.nutricionistaNovo.events({	
  'submit #formCadastraNutricionista': function(e,t) {
    e.preventDefault();
	console.log("senha "+document.getElementById('senha').value);
	console.log("email "+document.getElementById('email').value+" "+t.find('#email').value);
	console.log("dt nasc "+document.getElementById('data_nascimento').value+" "+t.find('#data_nascimento').value);
    var paciente = {
		email: document.getElementById('email').value,
		password: document.getElementById('senha').value,
		profile: { 
			name: document.getElementById('nome').value,
			sexo: document.getElementById('sexo').value,
			data_nascimento: document.getElementById('data_nascimento').value,
			data_cadastro: new Date().getTime() 
		}
    };
	
		
	console.log("Cadastrando "+JSON.stringify(paciente));	
	

  Meteor.call("criaNutricionista", paciente, function(err,result){
	  	console.log("Resultado "+JSON.stringify(result));
	if(result){
		Router.go('nutricionistas', {_id: result});
	}else{    
      alert('error');
	}	

  });



  }
});