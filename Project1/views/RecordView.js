var app = app || {}

app.RecordView = Backbone.View.extend({

	tagName: 'li',
	
	template: _.template($("#row-template").html()),
	
	events: {
		'click .remove': 'removeResult'
	},
	
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
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
			this.$el.find('div').addClass("fail")
		}else{
			this.$el.find('div').removeClass("fail")
		}
	},
	
	removeResult: function(){
		console.log("before coll length...", app.StudentResultCollection.length)
		this.model.destroy();
		console.log("after coll length...", app.StudentResultCollection.length)
		
	}
});