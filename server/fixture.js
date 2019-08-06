if (Meteor.users.find().count() === 0) {
	var users = [
      {name:"Normal User",email:"normal@example.com",roles:[]},
      {name:"Nutricionista",email:"view@example.com",roles:['nutri']},
      {name:"Admin User",email:"admin@example.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "123456",
	  type: user.type,
      profile: { name: user.name , data_cadastro: new Date().getTime() }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });	
	
	id_nutri = Accounts.createUser({
      email: "nutri@example.com",
      password: "123456",
      profile: { name: "Nutricionista" , data_cadastro: new Date().getTime() }
    });
	Roles.addUsersToRoles(id_nutri, ["nutri"]);
	
	id_pac = Accounts.createUser({
		email: "pac@example.com",
		password: "123456",
		profile: { 
			name: "paciente" ,
			sexo: "M",
			data_nascimento: "1980-04-12",
			peso: 72,
			altura: 1.70,
			data_cadastro: new Date().getTime() ,
			id_nutricionista: id_nutri
		}
    });
	
	
	id_adm = Accounts.createUser({
      email: "admin@example.com",
      password: "123456",
      profile: { name: "Admin User" , data_cadastro: new Date().getTime() }
    });
	Roles.addUsersToRoles(id_adm, ["admin"]);

	
	id_will = Accounts.createUser({
      email: "william.mori@gmail.com",
      password: "123456",
      profile: { name: "William" , data_cadastro: new Date().getTime() }
    });
	Roles.addUsersToRoles(id_will, ["admin"]);

}
if (Alimentos.find().count() === 0) {	
	
	var ali = [
		{descricao:"copo de iogurte light"},
		{descricao:"ameixa"},
		{descricao:"torradas integrais"},
		{descricao:"suco de laranja sem açucar"},		
	  	{descricao:"fatia de pão integral"},
	  	{descricao:"achocolatado diet"},		
	  	{descricao:"maça"},
	  	{descricao:"bolachas integrais de água e sal"},
		{descricao:"cappuccino diet"},
	  	{descricao:"chá de amora gelado"},
	  	{descricao:"brócolis cozido"},
	  	{descricao:"arroz integral"},
		{descricao:"feijão"},
	  	{descricao:"rúcula"}, 
		{descricao:"tomate"},
		{descricao:"azeite"},
		{descricao:"filé frango grelhado"},	  	
		{descricao:"grão-de-bico"},		
	  	{descricao:"filé carne bovina grelhada"},
		{descricao:"espinafre no vapor"},
		{descricao:"salada verde"},
	  	{descricao:"filé de peixe ao molho de maracujá"},		
	  	{descricao:"morangos"},
	  	{descricao:"pera"},
	  	{descricao:"banana"},
	  	{descricao:"alface"},
		{descricao:"pimentão"},
		{descricao:"cenoura"},
		{descricao:"omelete sem óleo com recheio de atum light"},								
		{descricao:"suco de maça"},
		{descricao:"granola light"}			
	];  
	
	
	
	var now = new Date().getTime();
	_.each(ali, function (ali) {
	
	
		Alimentos.insert({
			descricao: ali.descricao,
			data_cadastro: new Date().getTime() 
		});
	});


}

