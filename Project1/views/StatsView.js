var app = app || {}

app.StatsView = Backbone.View.extend({

	el: '#footer',

	template: _.template($("#stats-template").html()),

	initialize: function(){
		console.log("*********INITIALIZING STATS VIEW....")
		this.listenTo(app.StudentResultCollection, 'add', this.calculateStats);
		this.listenTo(app.StudentResultCollection, 'remove', this.calculateStats);
		this.listenTo(app.StudentResultCollection, 'change', this.calculateStats);
		// run this the first time
		this.calculateStats();
	},
	
	calculateStats: function(){
		console.log("********CALCULATING STATS.....")
		
		var firstScore;
		
		if(app.StudentResultCollection.at(0)){
			firstScore = parseFloat(app.StudentResultCollection.at(0).get('score'));
		}
		
		var sum = 0;
		var min = firstScore, max = firstScore;
	
		// Doing it this way so that the collection is traversed only once to calculate all stats.
		// Can be refactored later if other stats need to be calculated
		app.StudentResultCollection.each(function(result){
			
			if(!isNaN(parseFloat(result.get('score')))){
				var score = parseFloat(result.get('score'));
				
				if(score <= min){
					min = score;
				}
				if(score >= max){
					max = score;
				}
				
				sum += score;				
			}
		});
	
		// TODO: Check output value for edge cases
		var avg = sum/app.StudentResultCollection.length;;
		
		this.model.set('min', min);
		this.model.set('max', max);
		this.model.set('avg', avg.toFixed(2)); // Just want 2 decimal places at most
		
		this.render();
	},
	
	render: function(){
		console.log("******RENDERING STATS")
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}
});