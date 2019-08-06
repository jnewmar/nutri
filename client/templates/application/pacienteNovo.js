Template.pacienteNovo.events({	
  'submit #formCadastraPaciente': function(e,t) {
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
			peso: document.getElementById('peso').value,
			altura: document.getElementById('altura').value,
			data_cadastro:  new Date().getTime(), 
			id_nutricionista: Meteor.userId() 
		}
    };
	
		
	console.log("Cadastrando "+JSON.stringify(paciente));	
	

  Meteor.call("criaPaciente", paciente, function(err,result){
	  	console.log("Resultado "+JSON.stringify(result));
	if(result){
		Router.go('pacientes', {_id: result});
	}else{    
      alert('error');
	}
	
	  /*
    if (typeof result.message !== 'undefined') {
      if (result.message === 'Email already exists. [403]') {
        alert("exists");
      } else {
          console.log(result) //here for example you should get the id
      }
    } else {
      Accounts.sendEnrollmentEmail(result, function(err){
        if (err){
          alert("email didn't get sent");
        } else {
          alert('success');
        }
      });
    }*/
  });

	/*
	id_pac = Accounts.createUser( {
		email: document.getElementById('email').value,
		password: document.getElementById('senha').value,
		profile: { 
			name: document.getElementById('nome').value,
			sexo: document.getElementById('sexo').value,
			data_nascimento: document.getElementById('data_nascimento').value,
			peso: document.getElementById('peso').value,
			altura: document.getElementById('altura').value,
		}
    } );

	console.log("Resultado "+id_pac);
	if(id_pac){
      IonModal.close();
      //Router.go('pacientes', {_id: result});
	}
	else{    
      alert('error');
	}  */
  }
});