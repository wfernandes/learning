var app = app || {}

app.AppView = Backbone.View.extend({

	el: "#content",
	
	events: {
		'click .btn.btn-default.add-result': 'addNewResult',
		'keypress #new-name': 'addNewResult',
		'keypress #new-score': 'addNewResult'
	},
	
	initialize: function(){
		_.bindAll(this, 'render');
		
		this.listenTo(app.StudentResultCollection, 'add', this.addStudentResult)
		app.StudentResultCollection.fetch();		
		this.render();
	},
	
	render: function(){
		new app.StatsView( {model: new app.TestStats()});
        
        return this;
	},
	
	addNewResult: function(e){
		
		// Only listen to the keypress event from enter to add new result
		if(e.type == "keypress" && e.which != ENTER_KEY){
			return;
		}
		
		var studentName = $("#new-name").val();
		var studentScore = $("#new-score").val();
		
		// Add record straight to the collection
		// wait: true because we want confirmation that model was added to collection then we can render it.
		// model may fail to be added if validation fails.
		var rec = app.StudentResultCollection.create({name: studentName, score: studentScore}, {wait:true});
		
		if(rec.validationError){
			this.$("#msg").text(rec.validationError);
		}else{
			this.$("#msg").text('');
            this.clearAddInputs();
		}	
	},
	
	addStudentResult: function(result){
		if(!result.validationError){
			var studentRecordView = new app.RecordView({model: result});
			this.$("#results").append(studentRecordView.render().el);
		}
	},
	
	clearAddInputs: function(){
		$("#new-name").val("");
		$("#new-score").val("");
	}
});


