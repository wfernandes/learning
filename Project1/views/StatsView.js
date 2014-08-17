var app = app || {}

app.StatsView = Backbone.View.extend({

	el: '#sidebar',

	template: _.template($("#stats-template").html()),

	initialize: function(){
		this.listenTo(app.StudentResultCollection, 'add', this.calculateStats);
		this.listenTo(app.StudentResultCollection, 'remove', this.calculateStats);
		this.listenTo(app.StudentResultCollection, 'change', this.calculateStats);
		// run this the first time
		this.calculateStats();
	},
	
	calculateStats: function(){		
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
					minName = result.get('name');
				}
				if(score >= max){
					max = score;
					maxName = result.get('name');
				}
				
				sum += score;				
			}
		});
	
		// TODO: Check output value for edge cases
		var avg = sum/app.StudentResultCollection.length;
		
		this.model.set('minName', minName);
		this.model.set('min', min);
		this.model.set('maxName', maxName);
		this.model.set('max', max);
		this.model.set('avg', avg.toFixed(2)); // Just want 2 decimal places at most
		this.model.set('count', app.StudentResultCollection.length);
		this.render();
	},
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});