AutoForm.hooks({
  'alimento-novo-form': {
	formToDoc: function(doc) {
		doc.data_cadastro= new Date().getTime() ;
		//alert(doc);
		console.log("Postado", doc);		
		if(document.getElementById('inputBusca')){
			console.log("Alterando campos com"+doc.descricao);
			document.getElementById('inputBusca').value=doc.descricao;
			
		}
		return doc;	
	},	
    onSuccess: function (operation, result, template) {		

		if(document.getElementById('inputBusca')){
			console.log("Buscando com "+document.getElementById('inputBusca').value);			
			AlimentosSearch.search(document.getElementById('inputBusca').value);
		}
		IonModal.close();	  
      //Router.go('alimentos', {_id: result});
    },


    onError: function(operation, error, template) {
      alert(error);
    }
  }
});