var app = app || {}

app.RecordView = Backbone.View.extend({

	tagName: 'li',
	
	oldName: '',
	oldScore: '',
	
	template: _.template($("#row-template").html()),
	
	events: {
		'click .remove': 'removeResult',
		'dblclick .result': 'enableEditing',
		'keypress .result': 'handleKeyEvent',
		'keydown .result': 'handleKeyEvent',
		'focusout input.name': 'updateModel',
		'focusout input.score': 'updateModel'		
	},
	
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		_.bindAll(this, 'updateModel');		
	},
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		this.highlightIfFailed();
		
		return this;
	},
	
	highlightIfFailed: function(){
		if(this.model.get('score') < 65){
			this.$el.find('.result').addClass("fail")
		}else{
			this.$el.find('.result').removeClass("fail")
		}
	},
	
	removeResult: function(){
		this.model.destroy();		
	},
	
	enableEditing: function(e){		
		this.getOldValues();
		
		this.$el.find('.result').addClass('editing');
		var inputs = this.$el.find("input");
		
		for(var i = 0; i<inputs.length; i++){
				inputs[i].disabled = false;
		}
	},
	
	disableEditing: function(e){
		this.$el.find('.result').removeClass('editing');
		var inputs = this.$el.find("input");
		
		for(var i = 0; i<inputs.length; i++){
				inputs[i].disabled = true;
		}
		
		this.clearOldValues();
	},
	
	handleKeyEvent: function(e){
		if(e.which == ENTER_KEY){
			this.updateModel()
		}else if(e.which == ESC_KEY){
			this.revertModel();
		}
		
	},
	
	updateModel: function(){
		var name = this.$el.find('input.name')[0].value.trim();
		var score = this.$el.find('input.score')[0].value.trim();
		var res = this.model.save({name: name, score: score});
		
		if(!res){
			this.$el.find('#row-msg').text(this.model.validationError);
		}else{
			this.$el.find('#row-msg').text('');
            this.disableEditing();
		}		
	},
	
	revertModel: function(){
		this.model.set('name', this.oldName);
		this.model.set('score', this.oldScore);
		// This will trigger the collection change and re-render
		this.model.trigger('change');
		
		this.disableEditing();
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