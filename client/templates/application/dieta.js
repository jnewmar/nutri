
Template.dieta.helpers({
	getDietaAlimentos: function(tp) {
		
		var d = Dieta.find( 
			 { $and:[  
				{ id_paciente : Meteor.userId() } ,
				{tipo : tp }
			]}).fetch();	
        d.forEach(function (row) {
			row.alimento = Alimentos.findOne({_id : row.id_alimento}).descricao;
            console.log(row.alimento);            
        }); 		
		console.log("DIETA "+d);		
		return d;
	},	
 }); 