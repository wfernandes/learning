var app = app || {}

app.RecordView = Backbone.View.extend({

	tagName: 'li',
	
	oldName: '',
	oldScore: '',
	
	template: _.template($("#row-template").html()),
	
	events: {
		'click .remove': 'removeResult',
		'dblclick .row': 'enableEditing',
		'keypress .row': 'updateModel',
		'keydown .row': 'revertModel',
		'focusout input.name': 'disableEditing',
		'focusout input.score': 'disableEditing'
		
	},
	
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		_.bindAll(this, 'updateModel');
		console.log("RecordView initialized");
		
	},
	
	render: function(){
		console.log("rendering a record view....");
		this.$el.html(this.template(this.model.toJSON()));
		
		this.highlightIfFailed();
		
		return this;
	},
	
	highlightIfFailed: function(){
		if(this.model.get('score') < 65){
			this.$el.find('.row').addClass("fail")
		}else{
			this.$el.find('.row').removeClass("fail")
		}
	},
	
	removeResult: function(){
		console.log("before coll length...", app.StudentResultCollection.length)
		this.model.destroy();
		console.log("after coll length...", app.StudentResultCollection.length)
		
	},
	
	enableEditing: function(e){
		console.log("Editing the model....", this.$el.find("input"));
		
		this.getOldValues();
		
		this.$el.find('.row').addClass('editing');
		var inputs = this.$el.find("input");
		
		for(var i = 0; i<inputs.length; i++){
				inputs[i].disabled = false;
		}
	},
	
	disableEditing: function(e){
		console.log("***Disable editing.....",e);
		this.$el.find('.row').removeClass('editing');
		var inputs = this.$el.find("input");
		
		for(var i = 0; i<inputs.length; i++){
				inputs[i].disabled = true;
		}
		
		this.clearOldValues();
	},
	
	updateModel: function(e){
		if(e.which == ENTER_KEY){
			var name = this.$el.find('input.name')[0].value.trim();
			var score = this.$el.find('input.score')[0].value.trim();
			var res = this.model.save({name: name, score: score});
			
			if(!res){
				this.$el.find('#row-msg').text(this.model.validationError);
			}else{
				this.$el.find('#row-msg').text('');
			}
		}
		
	},
	
	revertModel: function(e){
		if(e.which == ESC_KEY){
			this.model.set('name', this.oldName);
			this.model.set('score', this.oldScore);
		}
	},
	
	getOldValues: function(){
		this.oldName = this.$el.find('input.name')[0].value;
		this.oldScore = this.$el.find('input.score')[0].value;		
	},
	
	clearOldValues: function(){
		this.oldName = "";
		this.oldScore = "";
	}
});