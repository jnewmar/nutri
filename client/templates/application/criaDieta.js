var options = {
		  keepHistory: 1000 * 60 * 5,
		  localSearch: true
		};
var fields = ['descricao'];

AlimentosSearch = new SearchSource('alimentos', fields, options);	




Template.criaDieta.helpers({
	getAlimentos: function() {
		return tmp =AlimentosSearch.getData({
			transform: function(matchText, regExp) {
			return matchText;
			},
			sort: {data_cadastro: -1}
		});		

	},
	isLoading: function() {
		return AlimentosSearch.getStatus().loading;
	},
	alimentosel : undefined,
	getDietaAlimentos: function(tp) {
		
		limite=45;
		var d = Dieta.find( 
			 { $and:[  
				{ id_paciente : Router.current().params._id },
				{tipo : tp }
			]}).fetch();	
        d.forEach(function (row) {
			desc=Alimentos.findOne({_id : row.id_alimento}).descricao;
			if(desc.length>limite){
				row.alimento = desc.substring(0,limite)+"...";
			}else{
				row.alimento = desc ;
			}
			
            //console.log(row.alimento);            
        }); 		
		//console.log("DIETA "+d);		
		return d;
	},	
 }); 

Template.criaDieta.rendered = function(){
	this.autorun(function () {
	AlimentosSearch.search("a");	
	}.bind(this));

	

    $(".dieta").on('dragout', function(e) {
		console.log("NA DIETA "+this.id);
	}),
	
	
	$(".dieta").on('drop', function(e) {
  
		if(e.target.id == "dieta-1" || e.target.id == "dieta-2" || e.target.id == "dieta-3" || e.target.id == "dieta-4"){
			e.preventDefault();
			var dt =  e.originalEvent.dataTransfer;		
			var data = dt.getData("text");
			var sel= document.getElementById(data) ;
			
			/*
			var div = document.createElement('button');
			
			console.log("id sel "+data);
			
			//div.style.border = '1px solid black';
			//div.style.background = 'gray';
			//div.style.padding= '5px';
			div.style['margin'] = '2px';
			div.classList.add("button");
			div.classList.add("button-small");
			div.classList.add("button-positive");
			div.classList.add("alimento");			
			div.innerHTML = sel.textContent;
			
			e.target.appendChild(div);
			*/
			console.log("DROP "+data+" ("+sel.textContent+") em "+ e.target.id);

			ja_tem= Dieta.find( 
			 { $and:[  
				{ id_paciente : Router.current().params._id },
				{tipo : e.target.id } ,
				{id_alimento : data      }
			]}).count();

			if(ja_tem){
				console.log("Ja tem "+data);
			}else{				
				console.log("Não tem , insere"+data);
				 Dieta.insert({
					id_paciente : Router.current().params._id ,
					id_nutricionista : Meteor.userId() ,
					tipo : e.target.id , 
					id_alimento : data     
				});

			}
			
		}	

	}),
  
    $(".dieta").on('dragover', function(e) {
		e.preventDefault();
		//	console.log("ondragover ");
	})  
};




Template.alimentoItem.rendered = function(){
	$(".alimento").on('dragstart', function(e) {

		var dt =  e.originalEvent.dataTransfer;
		//dt.effectAllowed = "copyMove";
		dt.setData("text/plain", e.target.id);
		console.log("selecionado"+e.target.id);		
	}),
	$(".alimento").on('dragout', function(e) {
		//alert('dragout');
			// .. 
		// It could be a good idea to add {{_id}} to your template, this way out can call:
		console.log(this.id);
	})
};
Template.dietaItem.events({
	'click .del-alimento' : function(e) {

		console.log("selecionado par del "+e.target.id);
		r=Dieta.remove({_id: e.target.id});
		console.log("Res remiove "+JSON.stringify(r));


	}
});
Template.alimentoItem.events({
	'click .alimento' : function(e) {
		var tipo;
		console.log("selecionado"+e.target.id);
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');
		if(tab1.classList.contains('tab-sel')){
			tipo="dieta-1"
		}
		if(tab2.classList.contains('tab-sel')){
			tipo="dieta-2"
		}
		if(tab3.classList.contains('tab-sel')){
			tipo="dieta-3"
		}
		if(tab4.classList.contains('tab-sel')){
			tipo="dieta-4"
		}				

		if( ! Meteor.Device.isDesktop() ){

			ja_tem= Dieta.find( 
			 { $and:[  
				{ id_paciente : Router.current().params._id },
				{tipo : tipo } ,
				{id_alimento :e.target.id }
			]}).count();

			if(ja_tem){
				console.log("Ja tem "+e.target.id   );
			}else{	
				
				console.log("add alimento "+e.target.id+" em "+ tipo);
				
				 Dieta.insert({
					id_paciente : Router.current().params._id ,
					id_nutricionista : Meteor.userId() ,
					tipo : tipo , 
					id_alimento : e.target.id     
				});
			}	 
		}	 

	}	

});

Template.criaDieta.events({
	"keyup #busca-alimento": _.throttle(function(e) {
		var text = $(e.target).val().trim();
		AlimentosSearch.search(text);
	}, 200),
	'ondragstart .alimento': function(e) {
	   var dt =  e.originalEvent.dataTransfer;
		//dt.effectAllowed = "copyMove";
		dt.setData("text/plain", e.target.id);
		console.log("selecionado"+e.target.id);
		alert("selecionado"+e.target.id);
	},
	'ondrop .alimento': function(e) {
		//alert('ondrop');
		e.preventDefault();
		var data = e.dataTransfer.getData("text");
		e.target.appendChild(document.getElementById(data));
	},
	'ondragover .card': function(e) {
		alert('ondragover');
		e.preventDefault();
	},	
	'click #tab-1' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		

		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
		
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");
		
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab1.classList.add("tab-sel");
		tab1.classList.remove("tab");
		box1.classList.add("ativo");
		box1.classList.remove("escondido");		
		
	},
	'click #tab-2' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		
		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");
		
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");
		
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab2.classList.add("tab-sel");
		tab2.classList.remove("tab");
		box2.classList.remove("escondido");
		box2.classList.add("ativo");
		
		
	},
	'click #tab-3' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		

		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");

		
		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
	
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab3.classList.add("tab-sel");
		tab3.classList.remove("tab");
		box3.classList.remove("escondido");
		box3.classList.add("ativo");	
	},
	'click #tab-4' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		
		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");

		
		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
	
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");

		tab4.classList.add("tab-sel");
		tab4.classList.remove("tab");
		box4.classList.remove("escondido");
		box4.classList.add("ativo");		
		
		
	},	
});