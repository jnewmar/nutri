Dieta = new Meteor.Collection('dieta');
Alimentos = new Meteor.Collection('alimentos');
Alimentos.attachSchema(new SimpleSchema({
  descricao: {
    type: String,
    label: "Alimento",
    max: 200
  },
  data_cadastro: {
    type: String,
	optional: true    
   }  
}));


